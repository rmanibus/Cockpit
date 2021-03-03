package fr.sciam.services;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.exception.DockerClientException;
import com.github.dockerjava.api.model.Network;
import com.github.dockerjava.api.model.Secret;
import fr.sciam.model.DockerEntity;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class DockerService {

    @Inject
    DockerClient dockerClient;

    @Transactional
    protected void init(@Observes StartupEvent e){
        if(DockerEntity.listAll().size() == 0){
            DockerEntity entity = new DockerEntity();
            entity.setName("Default");
            entity.setLocation("unix:///var/run/docker.sock");
            entity.persist();
        }
    }

    public List<Secret> getSecrets(){
        return dockerClient.listSecretsCmd().exec();
    }

    public boolean ping(){
        try{
            dockerClient.pingCmd().exec();
            return true;
        }catch (DockerClientException e){
            return false;
        }
    }

    public List<Network> getNetworks(){
        return dockerClient.listNetworksCmd().exec();
    }
}
