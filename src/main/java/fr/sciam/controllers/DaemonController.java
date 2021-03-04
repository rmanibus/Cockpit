package fr.sciam.controllers;

import fr.sciam.services.DockerService;
import io.smallrye.mutiny.Multi;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import io.vertx.mutiny.core.Vertx;

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
    @Path("secrets")
    public Response secrets() {
        return Response.ok(dockerService.getSecrets()).build();
    }

    @GET
    @Path("networks")
    public Response networks() {
        return Response.ok(dockerService.getNetworks()).build();
    }

    @GET
    @Path("tasks")
    public Response tasks() {
        return Response.ok(dockerService.getTasks()).build();
    }

    @GET
    @Path("services")
    public Response services() {
        return Response.ok(dockerService.getServices()).build();
    }

    @GET
    @Path("containers")
    public Response containers() {
        return Response.ok(dockerService.getContainers()).build();
    }
    @GET
    @Path("containers/{containerId}")
    public Response container(@PathParam("containerId") String containerId) {
        return Response.ok(dockerService.getContainer(containerId)).build();
    }
    @GET
    @Path("containers/{containerId}/logs")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Multi<String> containerLogs(@PathParam("containerId") String containerId) {
        return dockerService.getContainerLogs(containerId);
    }
    @GET
    @Path("volumes")
    public Response volumes() {
        return Response.ok(dockerService.getVolumes()).build();
    }
    @GET
    @Path("volumes/{volumeName}")
    public Response volume(@PathParam("volumeName") String volumeName) {
        return Response.ok(dockerService.getVolume(volumeName)).build();
    }

    @GET
    @Path("services/{serviceId}")
    public Response service(@PathParam("serviceId") String serviceId) {
        return Response.ok(dockerService.getService(serviceId)).build();
    }

    @GET
    @Path("services/{serviceId}/logs")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Multi<String> serviceLogs(@PathParam("serviceId") String serviceId) {
        return dockerService.getServiceLogs(serviceId);
    }
    @GET
    @Transactional
    @Path("ping")
    public Response ping() {
        return Response.ok(dockerService.ping()).build();
    }
}
