package com.assignment.service;

import com.assignment.dto.CreateTodoRequest;
import com.assignment.dto.UpdateStatus;
import com.assignment.dto.UpdateTodoRequest;
import com.assignment.model.Todo;
import com.assignment.repository.FileTodoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TodoService {

    private final FileTodoRepository repo;

    public TodoService(FileTodoRepository repo) {
        this.repo = repo;
    }

    public List<Todo> getAll() {
        return repo.findAll();
    }

    public Todo getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Todo not found with id: " + id));
    }

    public Todo create(CreateTodoRequest req) {
        Todo t = new Todo();
        t.setTitle(req.getTitle());
        t.setDescription(req.getDescription());
        t.setCompleted(req.getCompleted() != null ? req.getCompleted() : false);
        return repo.save(t);
    }

    public Todo update(Long id, UpdateTodoRequest req) {
        Todo existing = repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Todo not found with id: " + id));

        if (req.getTitle() != null) existing.setTitle(req.getTitle());
        if (req.getDescription() != null) existing.setDescription(req.getDescription());
        if (req.getCompleted() != null) existing.setCompleted(req.getCompleted());

        return repo.save(existing);
    }

    public Todo updateStatus(Long id, UpdateStatus req) {
        Todo existing = repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Todo not found with id: " + id));

        if (req.getCompleted() != null) existing.setCompleted(req.getCompleted());
        return repo.save(existing);
    }

    public void delete(Long id) {
        if (repo.findById(id).isEmpty()) {
            throw new NoSuchElementException("Todo not found with id: " + id);
        }
        repo.deleteById(id);
    }
}
