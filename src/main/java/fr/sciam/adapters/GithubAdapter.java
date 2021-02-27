package fr.sciam.adapters;

import fr.sciam.model.GitCommit;
import fr.sciam.model.GitProject;
import fr.sciam.model.SourceEntity;

import java.util.Collections;
import java.util.List;

public class GithubAdapter implements GitAdapter {
    SourceEntity sourceEntity;
    public GithubAdapter(SourceEntity sourceEntity) {
        this.sourceEntity = sourceEntity;
    }

    @Override
    public List<GitProject> listProject() {
        return Collections.emptyList();
    }

    @Override
    public String getFileContent(String project, String fileName) {
        return "";
    }

    @Override
    public List<GitCommit> getHistory(String project) {
        return Collections.emptyList();
    }

    @Override
    public void commit(String project, String branch, String fileName, String content, String message) {

    }

    @Override
    public void pullRequest(String project, String sourceBranch, String targetBranch) {

    }
}
