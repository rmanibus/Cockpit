package fr.sciam.controllers;

import fr.sciam.model.DockerEntity;
import fr.sciam.model.SourceEntity;
import fr.sciam.resources.DockerResource;
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

@Path("/api/dockers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class DockerController {

    @Inject
    GitAdapterFactory gitAdapterFactory;
    @Inject
    DockerResource dockerResource;

    @POST
    @Transactional
    public Response create(DockerEntity dockerEntity) {
        dockerEntity.persist();
        return Response.ok().build();
    }

    @PUT
    @Transactional
    @Path("{id}")
    public Response update(@PathParam("id") UUID id, DockerEntity updatedDockerEntity) {

        DockerEntity sourceEntity = dockerResource.get(id);
        if (sourceEntity == null) {
            throw new NotFoundException();
        }
        dockerResource.update(id, updatedDockerEntity);
        return Response.ok().build();
    }

    @GET
    @Transactional
    public Response list() {
        return Response.ok(DockerEntity.listAll()).build();
    }

    @GET
    @Transactional
    @Path("{id}")
    public Response get(@PathParam("id") UUID id) {
        DockerEntity docker = dockerResource.get(id);
        if (docker == null) {
            throw new NotFoundException();
        }
        return Response.ok(docker).build();
    }


    @DELETE
    @Transactional
    @Path("{id}")
    public Response remove(@PathParam("id") UUID id) {
        dockerResource.delete(id);
        return Response.ok().build();
    }
}
