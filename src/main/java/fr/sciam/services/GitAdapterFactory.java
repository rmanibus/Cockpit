package fr.sciam.services;

import fr.sciam.adapters.GitAdapter;
import fr.sciam.adapters.GithubAdapter;
import fr.sciam.adapters.GitlabAdapter;
import fr.sciam.adapters.LocalAdapter;
import fr.sciam.model.SourceEntity;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GitAdapterFactory {

    public GitAdapter getSourceAdapter(SourceEntity sourceEntity) {
        return switch (sourceEntity.getType()) {
            case GITLAB -> new GitlabAdapter(sourceEntity);
            case GITHUB -> new GithubAdapter(sourceEntity);
            case LOCAL -> new LocalAdapter(sourceEntity);
        };
    }
}
