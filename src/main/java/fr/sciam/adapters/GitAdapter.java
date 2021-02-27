package fr.sciam.adapters;

import fr.sciam.model.GitCommit;
import fr.sciam.model.GitProject;
import org.gitlab4j.api.GitLabApiException;

import java.util.List;

public interface GitAdapter {

    List<GitProject> listProject() throws GitLabApiException;
    String getFileContent(String project, String fileName);
    List<GitCommit> getHistory(String project);
    void commit(String project, String branch, String fileName, String content, String message);
    void pullRequest(String project, String sourceBranch, String targetBranch);

}
