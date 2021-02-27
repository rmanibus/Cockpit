package fr.sciam.controllers;

import com.blazebit.persistence.integration.jaxrs.EntityViewId;
import com.blazebit.persistence.view.EntityViewManager;
import fr.sciam.adapters.GitAdapter;
import fr.sciam.model.StackEntity;
import fr.sciam.services.GitAdapterFactory;
import fr.sciam.views.StackCreateView;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Base64;
import java.util.UUID;

@Path("/api/stacks")
public class StackController {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;
    @Inject
    GitAdapterFactory gitAdapterFactory;
    @POST
    @Transactional
    public Response create(StackCreateView stackView) {
        entityViewManager.save(entityManager, stackView);
        return Response.ok().build();
    }
    @PUT
    @Transactional
    @Path("{id}")
    public Response update(@EntityViewId("id") StackCreateView stackView) {
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
    public Response get(@PathParam("id") UUID id) {
        return Response.ok(StackEntity.findById(id)).build();
    }

    @GET
    @Transactional
    @Path("{id}/compose")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getCompose(@PathParam("id") UUID id) {
        StackEntity stack = StackEntity.findById(id);
        if(stack == null){
            throw new NotFoundException();
        }
        GitAdapter gitAdapter = gitAdapterFactory.getSourceAdapter(stack.getSource());
        return Response.ok(gitAdapter.getFileContent(stack.getPath(), "docker-compose.yml")).build();
    }

    @Data
    @AllArgsConstructor
    public static class UpdateCompose{
        String message;
        String content;
    }

    @PUT
    @Transactional
    @Path("{id}/compose")
    public Response updateCompose(@PathParam("id") UUID id, UpdateCompose updateCompose) {
        StackEntity stack = StackEntity.findById(id);
        if(stack == null){
            throw new NotFoundException();
        }
        GitAdapter gitAdapter = gitAdapterFactory.getSourceAdapter(stack.getSource());
        switch (stack.getCommitMode()){
            case GIT_PUSH -> {
                gitAdapter.commit(stack.getPath(), "master" , "docker-compose.yml", new String(Base64.getDecoder().decode(updateCompose.content)), updateCompose.message);
            }
            case PULL_REQUEST -> {
                gitAdapter.commit(stack.getPath(), "cockpit" , "docker-compose.yml", new String(Base64.getDecoder().decode(updateCompose.content)), updateCompose.message);
                gitAdapter.pullRequest(stack.getPath(), "cockpit", "master");
            }
        }

        return Response.ok().build();
    }

    @GET
    @Transactional
    @Path("{id}/history")
    public Response history(@PathParam("id") UUID id) {
        StackEntity stack = StackEntity.findById(id);
        if(stack == null){
            throw new NotFoundException();
        }
        GitAdapter gitAdapter = gitAdapterFactory.getSourceAdapter(stack.getSource());
        return Response.ok(gitAdapter.getHistory(stack.getPath())).build();
    }
    @DELETE
    @Transactional
    @Path("{id}")
    public Response remove(@PathParam("id") UUID id) {
        StackEntity.deleteById(id);
        return Response.ok().build();
    }

}
