package fr.sciam.adapters;

import fr.sciam.model.GitProject;
import fr.sciam.model.SourceEntity;

import java.util.Collections;
import java.util.List;

public class LocalAdapter implements GitAdapter {

    SourceEntity sourceEntity;

    public LocalAdapter(SourceEntity sourceEntity) {
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
}
