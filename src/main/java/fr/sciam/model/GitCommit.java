package fr.sciam.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GitCommit {
    String name;
    String id;
}
