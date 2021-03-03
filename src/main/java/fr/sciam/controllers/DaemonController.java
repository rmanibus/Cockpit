package fr.sciam.controllers;

import com.github.dockerjava.api.model.Frame;
import fr.sciam.services.DockerService;
import io.smallrye.mutiny.Multi;
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
    DaemonParams daemonParams;

    @GET
    @Transactional
    @Path("secrets")
    public Response secrets(@PathParam("id") UUID id) {
        return Response.ok(dockerService.getSecrets()).build();
    }

    @GET
    @Transactional
    @Path("networks")
    public Response networks(@PathParam("id") UUID id) {
        return Response.ok(dockerService.getNetworks()).build();
    }

    @GET
    @Transactional
    @Path("tasks")
    public Response tasks(@PathParam("id") UUID id) {
        return Response.ok(dockerService.getTasks()).build();
    }

    @GET
    @Transactional
    @Path("services")
    public Response services(@PathParam("id") UUID id) {
        return Response.ok(dockerService.getServices()).build();
    }

    @GET
    @Transactional
    @Path("containers")
    public Response containers(@PathParam("id") UUID id) {
        return Response.ok(dockerService.getContainers()).build();
    }

    @GET
    @Transactional
    @Path("volumes")
    public Response volumes() {
        return Response.ok(dockerService.getVolumes()).build();
    }

    @GET
    @Transactional
    @Path("ping")
    public Response ping() {
        return Response.ok(dockerService.ping()).build();
    }

    @GET
    @Path("logs/{serviceId}")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Multi<Frame> logs(@PathParam("serviceId") String serviceId) {
        return dockerService.getLogs(serviceId);
    }

}
