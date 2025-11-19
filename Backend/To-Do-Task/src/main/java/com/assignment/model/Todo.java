package com.assignment.model;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Todo {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
}
