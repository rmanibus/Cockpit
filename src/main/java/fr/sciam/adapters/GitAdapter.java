package fr.sciam.adapters;

import fr.sciam.model.GitProject;
import org.gitlab4j.api.GitLabApiException;

import java.util.List;

public interface GitAdapter {

    List<GitProject> listProject() throws GitLabApiException;
    String getFileContent(String project, String fileName);
}
