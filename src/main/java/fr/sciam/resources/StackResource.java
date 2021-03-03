package fr.sciam.resources;

import fr.sciam.model.StackEntity;
import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;

import java.util.UUID;

public interface StackResource extends PanacheEntityResource<StackEntity, UUID> {
}
