package fr.sciam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(of = {}, callSuper=true)
public class SourceEntity extends BaseUuidEntity {

    @Enumerated(EnumType.STRING)
    SourceType type;
    @Column(length = 255)
    String name;
    @Column(length = 255)
    String location;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(length = 255)
    String secret;
    @JsonIgnore()
    @OneToMany(mappedBy = "source", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    Set<StackEntity> stacks;

    public enum SourceType {
        GITLAB,GITHUB,LOCAL
    }

    @JsonIgnore
    public String getSecret() {
        return secret;
    }
    @JsonProperty
    public void setPassword(String secret) {
        this.secret = secret;
    }
}
