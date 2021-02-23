package fr.sciam.views;

import com.blazebit.persistence.view.*;
import fr.sciam.model.SourceEntity;
import fr.sciam.model.StackEntity;

import java.util.UUID;

@UpdatableEntityView
@CreatableEntityView
@EntityView(StackEntity.class)
public  interface StackView {
    
    @IdMapping
    UUID getId();
    String getName();
    void setName(String name);
    @Mapping("source")
    SourceView getSourceInternal();
    void setSourceInternal(SourceView source);
    EntityViewManager evm();
    default SourceView getSource(){
        return getSourceInternal();
    }
    default void  setSource(UUID id){
        setSourceInternal(evm().getReference(SourceView.class, id));
    };
}
