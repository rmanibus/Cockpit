package fr.sciam.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(of = {}, callSuper = true)
@ToString(of = {}, callSuper=true)
public class StackEntity extends BaseUuidEntity {

    @Column(length = 255)
    String name;
    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    StackType type;
    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    CommitMode commitMode;
    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    DeployMode deployMode;
    @ManyToOne
    @JoinColumn(name = "source_id", nullable = false)
    SourceEntity source;

    public enum StackType {
        COMPOSE,SWARM,K8S
    }
    public enum CommitMode {
        GIT_PUSH,PULL_REQUEST
    }
    public enum DeployMode {
        GITLAB_CI,GITHUB_ACTIONS,JENKINS, LOCAL
    }
}
