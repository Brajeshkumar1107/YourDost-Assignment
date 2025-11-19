package com.assignment.repository;

import com.assignment.model.Todo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class FileTodoRepository {

    private final ObjectMapper mapper = new ObjectMapper();
    private final File file = new File("todos.json");

    private final AtomicLong idGen = new AtomicLong(1);

    public FileTodoRepository() {
        // Initialize id based on existing items
        List<Todo> todos = readFromFile();
        long maxId = todos.stream().mapToLong(Todo::getId).max().orElse(0);
        idGen.set(maxId + 1);
    }

    private List<Todo> readFromFile() {
        try {
            if (!file.exists()) {
                return new ArrayList<>();
            }
            return mapper.readValue(file, new TypeReference<List<Todo>>() {});
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

    private void writeToFile(List<Todo> todos) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, todos);
        } catch (IOException e) {
            throw new RuntimeException("Failed to write todos to file", e);
        }
    }

    public List<Todo> findAll() {
        return readFromFile();
    }

    public Optional<Todo> findById(Long id) {
        return readFromFile()
                .stream()
                .filter(t -> t.getId().equals(id))
                .findFirst();
    }

    public Todo save(Todo todo) {
        List<Todo> todos = readFromFile();

        if (todo.getId() == null) {
            todo.setId(idGen.getAndIncrement());
            todos.add(todo);
        } else {
            // update existing
            todos.removeIf(t -> t.getId().equals(todo.getId()));
            todos.add(todo);
        }

        writeToFile(todos);
        return todo;
    }

    public void deleteById(Long id) {
        List<Todo> todos = readFromFile();
        todos.removeIf(t -> t.getId().equals(id));
        writeToFile(todos);
    }
}
