package fr.sciam.adapters;

import fr.sciam.model.GitCommit;
import fr.sciam.model.GitCommit.Author;
import fr.sciam.model.GitProject;
import fr.sciam.model.SourceEntity;
import lombok.extern.slf4j.Slf4j;
import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;
import org.gitlab4j.api.models.RepositoryFile;

import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class GitlabAdapter implements GitAdapter {

    SourceEntity sourceEntity;
    GitLabApi api;

    public GitlabAdapter(SourceEntity sourceEntity) {
        this.sourceEntity = sourceEntity;
        api = createApi(sourceEntity);
    }

    @Override
    public List<GitProject> listProject() throws GitLabApiException {
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

    @Override
    public String getFileContent(String project, String fileName) {
        try {
            RepositoryFile repoFile = api.getRepositoryFileApi().getFile(project, fileName, "master", true);
            return new String(Base64.getDecoder().decode(repoFile.getContent()));
        } catch (GitLabApiException | IllegalArgumentException e) {
            log.error("failed to fetch file content: ", e);
        }
        return "";
    }

    public List<GitCommit> getHistory(String project) {
        try {

            return api.getCommitsApi()
                    .getCommits(project)
                    .stream()
                    .map(item -> new GitCommit(item.getId(), item.getMessage(), item.getCommittedDate(),
                            new Author(item.getAuthorName(), item.getAuthorEmail())
                    ))
                    .collect(Collectors.toList());
        } catch (GitLabApiException e) {
            log.error("failed to fetch history: ", e);
        }
        return Collections.emptyList();
    }

    private GitLabApi createApi(SourceEntity source) {
        return new GitLabApi(source.getLocation(), source.getSecret());
    }
}
