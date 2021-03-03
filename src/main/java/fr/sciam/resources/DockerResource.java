package fr.sciam.resources;

import fr.sciam.model.DockerEntity;
import fr.sciam.model.SourceEntity;
import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;

import java.util.UUID;

public interface DockerResource extends PanacheEntityResource<DockerEntity, UUID> {
}
