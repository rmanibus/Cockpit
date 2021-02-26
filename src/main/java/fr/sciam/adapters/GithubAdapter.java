package fr.sciam.adapters;

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
}
