package fr.sciam.services;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback.Adapter;
import com.github.dockerjava.api.command.InspectVolumeResponse;
import com.github.dockerjava.api.exception.DockerClientException;
import com.github.dockerjava.api.model.*;
import fr.sciam.model.DockerEntity;
import io.quarkus.runtime.StartupEvent;
import io.smallrye.mutiny.Multi;
import lombok.extern.slf4j.Slf4j;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.function.Consumer;

@ApplicationScoped
@Slf4j
public class DockerService {

    @Inject
    DockerClient dockerClient;

    @Transactional
    protected void init(@Observes StartupEvent e) {
        if (DockerEntity.listAll().size() == 0) {
            DockerEntity entity = new DockerEntity();
            entity.setName("Default");
            entity.setLocation("unix:///var/run/docker.sock");
            entity.persist();
        }
    }

    public List<Secret> getSecrets() {
        return dockerClient.listSecretsCmd().exec();
    }

    public List<Network> getNetworks() {
        return dockerClient.listNetworksCmd().exec();
    }

    public List<Task> getTasks() {
        return dockerClient.listTasksCmd().exec();
    }

    public List<Service> getServices() {
        return dockerClient.listServicesCmd().exec();
    }
    public Service getService(String serviceId) {
        return dockerClient.inspectServiceCmd(serviceId).exec();
    }
    public List<Container> getContainers() {
        return dockerClient.listContainersCmd().exec();
    }

    public List<InspectVolumeResponse> getVolumes() {
        return dockerClient.listVolumesCmd().exec().getVolumes();
    }

    public boolean ping() {
        try {
            dockerClient.pingCmd().exec();
            return true;
        } catch (DockerClientException e) {
            return false;
        }
    }

    public Multi<Frame> getLogs(String id) {
        return Multi.createFrom().emitter(em -> {
            dockerClient.logServiceCmd(id)
                    .withFollow(false)
                    .withStdout(true)
                    .withStderr(true)
                    .exec(new LogCallback(em::emit));
        });
    }

    static class LogCallback extends Adapter<Frame> {
        Consumer<Frame> consumer;
        LogCallback(Consumer<Frame> consumer){
            this.consumer = consumer;
        }
        @Override
        public void onNext(Frame frame) {
            log.info("frame: {}", new String(frame.getPayload()));
            consumer.accept(frame);
        }
    }
}
