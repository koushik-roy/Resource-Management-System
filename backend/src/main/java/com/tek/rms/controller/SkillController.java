package com.tek.rms.controller;

import com.tek.rms.dto.SkillDto;
import com.tek.rms.service.SkillService;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/skill")
public class SkillController {
    @Autowired
    SkillService skillService;

    @PostMapping("/addSkill")
    public String addSkill(@RequestBody SkillDto skillDto) {
        return skillService.addSkill(skillDto);

    }

    @GetMapping("/skills")
    public List<SkillDto> findSkill()
    {
        return skillService.findSkill();
    }

    @GetMapping("/{skillId}")
    public SkillDto findSkillById(@PathVariable(RMSConstant.SKILLNAME) int id)
    {
        return skillService.findSkillById(id);
    }
    @DeleteMapping("/deleteSkill/{id}")
    public String deleteSkill(@PathVariable int id){
        return skillService.deleteSkills(id);
    }

    @PutMapping("/updateSkill")
    public String updateSkill(@RequestBody SkillDto skillDto)  {
        return skillService.updateSkill(skillDto);
    }


}

