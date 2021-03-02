package fr.sciam.controllers;

import fr.sciam.model.DockerEntity;
import fr.sciam.resources.DockerResource;
import fr.sciam.services.DockerService;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Path("/api/daemon/{id}")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class DaemonController {

    @Inject
    DockerService dockerService;
    @BeanParam
    DockerParams dockerParams;

    @GET
    @Transactional
    @Path("secrets")
    public Response secrets(@PathParam("id") UUID id) {
        return Response.ok(dockerService.getSecrets()).build();
    }

    @GET
    @Transactional
    @Path("ping")
    public Response available(@PathParam("id") UUID id) {
        return Response.ok(dockerService.ping()).build();
    }

}
