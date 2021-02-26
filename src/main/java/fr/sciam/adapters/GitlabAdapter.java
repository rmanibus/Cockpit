package fr.sciam.adapters;

import fr.sciam.model.GitProject;
import fr.sciam.model.SourceEntity;
import lombok.extern.slf4j.Slf4j;
import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class GitlabAdapter implements GitAdapter{

    SourceEntity sourceEntity;
    GitLabApi api;
    public GitlabAdapter(SourceEntity sourceEntity) {
        this.sourceEntity = sourceEntity;
        api = createApi(sourceEntity);
    }

    @Override
    public List<GitProject> listProject() throws GitLabApiException {
        log.info("{}", api.getProjectApi().getProjects().get(0).toString());
        try {
            return api.getProjectApi()
                    .getProjects()
                    .stream()
                    .map(project -> new GitProject(project.getName(), project.getPathWithNamespace()))
                    .collect(Collectors.toList());
        } catch (GitLabApiException e) {
            log.error("failed to fetch projects: ", e);
        }
        return Collections.emptyList();
    }

    private GitLabApi createApi(SourceEntity source){
        return new GitLabApi(source.getLocation(), source.getSecret());
    }
}
