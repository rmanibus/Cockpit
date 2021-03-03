package fr.sciam.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GitProject {
    String name;
    String path;
}
