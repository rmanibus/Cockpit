package fr.sciam.controllers;

import com.blazebit.persistence.integration.jaxrs.EntityViewId;
import com.blazebit.persistence.view.EntityViewManager;
import fr.sciam.model.StackEntity;
import fr.sciam.views.StackView;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Path("/api/stacks")
public class StackController {

    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    @POST
    @Transactional
    public Response create(StackView stackView) {
        entityViewManager.save(entityManager, stackView);
        return Response.ok().build();
    }
    @PUT
    @Transactional
    @Path("{id}")
    public Response update(@EntityViewId("id") StackView stackView) {
        entityViewManager.save(entityManager, stackView);
        return Response.ok().build();
    }
    @GET
    @Transactional
    public Response list() {
        return Response.ok(StackEntity.listAll()).build();
    }

    @GET
    @Transactional
    @Path("{id}")
    public Response list(@PathParam("id") UUID id) {
        return Response.ok(StackEntity.findById(id)).build();
    }

    @DELETE
    @Transactional
    @Path("{id}")
    public Response remove(@PathParam("id") UUID id) {
        StackEntity.deleteById(id);
        return Response.ok().build();
    }
}
