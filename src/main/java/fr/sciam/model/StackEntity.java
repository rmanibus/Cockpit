package fr.sciam.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
@EqualsAndHashCode(of = {}, callSuper = true)
@ToString(of = {}, callSuper=true)
public class StackEntity extends BaseUuidEntity {

    @Column(length = 255)
    String name;
    @ManyToOne
    @JoinColumn(name = "source_id", nullable = false)
    SourceEntity source;

}
