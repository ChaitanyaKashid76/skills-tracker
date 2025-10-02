package com.example.Skill_backend.service;

import com.example.Skill_backend.model.Skill;
import com.example.Skill_backend.model.User;
import com.example.Skill_backend.repository.SkillRepository;
import com.example.Skill_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    // ➕ Add Skill
    public Skill addSkill(Long userId, Skill skill) throws Exception {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new Exception("User not found with id: " + userId);
        }
        skill.setUser(userOpt.get());
        return skillRepository.save(skill);
    }

    // 📋 Get skills by userId
    public List<Skill> getSkills(Long userId) {
        return skillRepository.findByUserId(userId);
    }

    //update Skill
    public Skill updateSkill(Long skillId, Skill skillDetails) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found with id " + skillId));

        // Update fields
        skill.setSkillName(skillDetails.getSkillName());
        skill.setProficiency(skillDetails.getProficiency());
        skill.setLevel(skillDetails.getLevel());
        skill.setProgress(skillDetails.getProgress());
        skill.setGoal(skillDetails.getGoal());

        return skillRepository.save(skill);
    }

    // ❌ Delete skill
    public void deleteSkill(Long skillId) throws Exception {
        if (!skillRepository.existsById(skillId)) {
            throw new Exception("Skill not found!");
        }
        skillRepository.deleteById(skillId);
    }
}
