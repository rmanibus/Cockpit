package fr.sciam.services;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.exception.DockerClientException;
import com.github.dockerjava.api.model.Secret;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientConfig;
import com.github.dockerjava.core.DockerClientImpl;
import com.github.dockerjava.httpclient5.ApacheDockerHttpClient;
import com.github.dockerjava.transport.DockerHttpClient;
import fr.sciam.model.DockerEntity;
import io.quarkus.runtime.StartupEvent;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class DockerService {

    @Transactional
    protected void init(@Observes StartupEvent e){
        if(DockerEntity.listAll().size() == 0){
            DockerEntity entity = new DockerEntity();
            entity.setName("Default");
            entity.setLocation("unix:///var/run/docker.sock");
            entity.persist();
        }
    }

    protected DockerClient createClient(String host){
        DockerClientConfig config = DefaultDockerClientConfig
                .createDefaultConfigBuilder()
                .withDockerTlsVerify(false)
                .withDockerHost(host).build();
        DockerHttpClient client = new ApacheDockerHttpClient.Builder()
                .dockerHost(config.getDockerHost())
                .sslConfig(config.getSSLConfig())
                .build();
        return DockerClientImpl.getInstance(config, client);
    }

    public List<Secret> getSecrets(String host){
        return createClient(host).listSecretsCmd().exec();
    }

    public boolean ping(String host){
        try{
            createClient(host).pingCmd().exec();
            return true;
        }catch (DockerClientException e){
            return false;
        }
    }
}
