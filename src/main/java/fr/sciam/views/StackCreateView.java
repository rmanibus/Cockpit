package fr.sciam.views;

import com.blazebit.persistence.view.*;
import fr.sciam.model.StackEntity;
import fr.sciam.model.StackEntity.CommitMode;
import fr.sciam.model.StackEntity.DeployMode;
import fr.sciam.model.StackEntity.StackType;

import java.util.UUID;

@UpdatableEntityView
@CreatableEntityView
@EntityView(StackEntity.class)
public interface StackCreateView {

    @IdMapping
    UUID getId();

    String getName();

    void setName(String name);

    StackType getType();

    void setType(StackType stackType);

    CommitMode getCommitMode();

    void setCommitMode(CommitMode commitMode);

    DeployMode getDeployMode();

    void setDeployMode(DeployMode deployMode);

    @Mapping("source")
    SourceView getSourceInternal();

    void setSourceInternal(SourceView source);

    EntityViewManager evm();

    default SourceView getSource() {
        return getSourceInternal();
    }

    default void setSource(UUID id) {
        setSourceInternal(evm().getReference(SourceView.class, id));
    }

    ;
}
