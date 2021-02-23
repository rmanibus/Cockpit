package fr.sciam.views;

import com.blazebit.persistence.view.CreatableEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.UpdatableEntityView;
import fr.sciam.model.SourceEntity;

import java.util.UUID;

@UpdatableEntityView
@CreatableEntityView
@EntityView(SourceEntity.class)
public interface SourceView {
    @IdMapping
    UUID getId();
}
