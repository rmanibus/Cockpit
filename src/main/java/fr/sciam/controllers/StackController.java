package fr.sciam.controllers;

import fr.sciam.adapters.GitAdapter;
import fr.sciam.model.StackEntity;
import fr.sciam.resources.StackResource;
import fr.sciam.services.GitAdapterFactory;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Base64;
import java.util.UUID;

@Path("/api/stacks")
public class StackController {
    @Inject
    GitAdapterFactory gitAdapterFactory;
    @Inject
    StackResource stackResource;

    @POST
    @Transactional
    public Response create(StackEntity entity) {
        stackResource.add(entity);
        return Response.ok().build();
    }

    @PUT
    @Transactional
    @Path("{id}")
    public Response update(@PathParam("id") UUID id, StackEntity entity) {
        if(stackResource.get(id) == null){
            throw new NotFoundException();
        }
        stackResource.update(id, entity);
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
    public Response get(@PathParam("id") UUID id) {
        return Response.ok(StackEntity.findById(id)).build();
    }

    @GET
    @Transactional
    @Path("{id}/compose")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getCompose(@PathParam("id") UUID id) {
        StackEntity stack = stackResource.get(id);
        if (stack == null) {
            throw new NotFoundException();
        }
        GitAdapter gitAdapter = gitAdapterFactory.getSourceAdapter(stack.getSource());
        return Response.ok(gitAdapter.getFileContent(stack.getPath(), "docker-compose.yml")).build();
    }

    @Data
    @AllArgsConstructor
    public static class UpdateCompose {
        String message;
        String content;
    }

    @PUT
    @Transactional
    @Path("{id}/compose")
    public Response updateCompose(@PathParam("id") UUID id, UpdateCompose updateCompose) {
        StackEntity stack = stackResource.get(id);
        if (stack == null) {
            throw new NotFoundException();
        }
        GitAdapter gitAdapter = gitAdapterFactory.getSourceAdapter(stack.getSource());
        switch (stack.getCommitMode()) {
            case GIT_PUSH -> {
                gitAdapter.commit(stack.getPath(), "master", "docker-compose.yml", new String(Base64.getDecoder().decode(updateCompose.content)), updateCompose.message);
            }
            case PULL_REQUEST -> {
                gitAdapter.commit(stack.getPath(), "cockpit", "docker-compose.yml", new String(Base64.getDecoder().decode(updateCompose.content)), updateCompose.message);
                gitAdapter.pullRequest(stack.getPath(), "cockpit", "master");
            }
        }

        return Response.ok().build();
    }

    @GET
    @Transactional
    @Path("{id}/history")
    public Response history(@PathParam("id") UUID id) {
        StackEntity stack = stackResource.get(id);
        if (stack == null) {
            throw new NotFoundException();
        }
        GitAdapter gitAdapter = gitAdapterFactory.getSourceAdapter(stack.getSource());
        return Response.ok(gitAdapter.getHistory(stack.getPath())).build();
    }

    @DELETE
    @Transactional
    @Path("{id}")
    public Response remove(@PathParam("id") UUID id) {
        if(stackResource.get(id) == null){
            throw new NotFoundException();
        }
        stackResource.delete(id);
        return Response.ok().build();
    }

}
