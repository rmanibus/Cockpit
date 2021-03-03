package fr.sciam.controllers;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;
import fr.sciam.model.DockerEntity;
import fr.sciam.resources.DockerResource;
import lombok.extern.slf4j.Slf4j;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import java.util.UUID;

@RequestScoped
@Slf4j
public class DaemonParams {

    @Inject
    DockerResource dockerResource;
    @PathParam("id")
    UUID id;

    @Produces
    @RequestScoped
    protected DockerEntity loadEntity(){
        DockerEntity docker = dockerResource.get(id);
        if (docker == null) {
            throw new NotFoundException();
        }
        return docker;
    }

    @Produces
    @RequestScoped
    protected DockerClient createClient(DockerEntity docker){


        DockerClientConfig config = DefaultDockerClientConfig
                .createDefaultConfigBuilder()
                .withDockerTlsVerify(false)
                .withDockerHost(docker.getLocation()).build();
        DockerHttpClient client = new ApacheDockerHttpClient.Builder()
                .dockerHost(config.getDockerHost())
                .sslConfig(config.getSSLConfig())
                .build();
        return DockerClientImpl.getInstance(config, client);
    }

}
