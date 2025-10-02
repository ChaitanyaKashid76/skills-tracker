package com.example.Skill_backend.controller;

import com.example.Skill_backend.model.Skill;
import com.example.Skill_backend.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addSkill(@PathVariable Long userId, @RequestBody Skill skill) {
        try {
            Skill saved = skillService.addSkill(userId, skill);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Skill>> getSkills(@PathVariable Long userId) {
        return ResponseEntity.ok(skillService.getSkills(userId));
    }

    @PutMapping("/update/{skillId}")
    public ResponseEntity<?> updateSkill(@PathVariable Long skillId, @RequestBody Skill skillDetails) {
        try {
            Skill updated = skillService.updateSkill(skillId, skillDetails);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{skillId}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long skillId) {
        try {
            skillService.deleteSkill(skillId);
            return ResponseEntity.ok("Skill deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
