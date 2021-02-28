package fr.sciam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(of = {}, callSuper = true)
@ToString(of = {}, callSuper=true)
public class DockerEntity extends BaseUuidEntity {

    @Column(length = 255)
    String name;
    @Column(length = 255)
    String location;
    @JsonIgnore()
    @OneToMany(mappedBy = "docker", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    Set<StackEntity> stacks;

}
