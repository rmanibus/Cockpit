package fr.sciam.resources;

import fr.sciam.model.SourceEntity;
import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;

import java.util.UUID;

public interface SourceResource extends PanacheEntityResource<SourceEntity, UUID> {
}
