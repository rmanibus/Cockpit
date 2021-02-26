package fr.sciam.controllers;

import fr.sciam.model.SourceEntity;
import fr.sciam.resources.SourceResource;
import fr.sciam.services.GitAdapterFactory;
import lombok.extern.slf4j.Slf4j;
import org.gitlab4j.api.GitLabApiException;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Path("/api/sources")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class SourceController {

    @Inject
    GitAdapterFactory gitAdapterFactory;
    @Inject
    SourceResource sourceResource;

    @POST
    @Transactional
    public Response create(SourceEntity sourceEntity) {
        sourceEntity.persist();
        return Response.ok().build();
    }

    @PUT
    @Transactional
    @Path("{id}")
    public Response update(@PathParam("id") UUID id, SourceEntity sourceEntity) {
        if (sourceResource.get(id) == null) {
            throw new NotFoundException();
        }
        sourceResource.update(id, sourceEntity);
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
    public Response get(@PathParam("id") UUID id) {
        SourceEntity source = sourceResource.get(id);
        if (source == null) {
            throw new NotFoundException();
        }
        return Response.ok(SourceEntity.findById(id)).build();
    }

    @GET
    @Transactional
    @Path("{id}/projects")
    public Response listProjects(@PathParam("id") UUID id) throws GitLabApiException {
        SourceEntity source = sourceResource.get(id);
        if (source == null) {
            throw new NotFoundException();
        }
        return Response.ok(gitAdapterFactory.getSourceAdapter(source).listProject()).build();
    }

    @DELETE
    @Transactional
    @Path("{id}")
    public Response remove(@PathParam("id") UUID id) {
        SourceEntity.deleteById(id);
        return Response.ok().build();
    }
}
