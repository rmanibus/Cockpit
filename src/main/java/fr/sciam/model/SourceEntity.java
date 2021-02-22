package fr.sciam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
@Data
public class SourceEntity extends BaseUuidEntity {

    @Enumerated(EnumType.STRING)
    SourceType type;
    @Column(length = 255)
    String name;
    @Column(length = 255)
    String location;
    @JsonIgnore()
    @Column(length = 255)
    String secret;

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
