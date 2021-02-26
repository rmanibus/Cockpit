package fr.sciam.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class GitCommit {
    String id;
    String message;
    Date date;
    Author author;

    @Data
    @AllArgsConstructor
    public static class Author {
        String name;
        String email;
    }
}
