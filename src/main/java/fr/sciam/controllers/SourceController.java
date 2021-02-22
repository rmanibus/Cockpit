package fr.sciam.controllers;

import fr.sciam.model.SourceEntity;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Path("/api/sources")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SourceController {

    @POST
    @Transactional
    public Response create(SourceEntity sourceEntity) {
        sourceEntity.persist();
        return Response.ok().build();
    }

    @GET
    @Transactional
    public Response list() {
        return Response.ok(SourceEntity.listAll()).build();
    }

    @GET
    @Transactional
    @Path("{id}")
    public Response list(@PathParam("id") UUID id) {
        return Response.ok(SourceEntity.findById(id)).build();
    }

    @DELETE
    @Transactional
    @Path("{id}")
    public Response remove(@PathParam("id") UUID id) {
        SourceEntity.deleteById(id);
        return Response.ok().build();
    }
}
