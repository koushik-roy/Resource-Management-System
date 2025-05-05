package com.tek.rms.service;

import com.tek.rms.dto.SkillDto;
import com.tek.rms.mapper.SkillMapper;
import com.tek.rms.exceptions.SkillNotFoundException;
import com.tek.rms.model.Business;
import com.tek.rms.model.Skill;
import com.tek.rms.repository.SkillRepository;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SkillService {
    @Autowired
    SkillRepository skillRepository;
    @Autowired
    SkillMapper skillMapper;

    public String addSkill(SkillDto skillDto) {
        Skill skill=skillMapper.dtoToEntity(skillDto);
        Skill existingSkill=skillRepository.findBycode(skill.getCode());
        if(existingSkill==null)
        {
            skillMapper.entityToDto(skillRepository.save(skill));
            return RMSConstant.ADDSKILL;
        }
        else {
            return RMSConstant.FAIL_Skill;
        }
    }

    public List<SkillDto> findSkill()
    {
        List<Skill> results=skillRepository.findAllSkills();
        return skillMapper.entityToDto(results);
    }
    public SkillDto findSkillById(int id)
    {
        Skill result=skillRepository.findById(id).orElseThrow(()-> new SkillNotFoundException(id));
        return skillMapper.entityToDto(result);
    }

    public String deleteSkills(int id){
        Skill result=skillRepository.findById(id).orElse(null);
        assert result != null;
        skillRepository.deleteById(result.getId());
        return ("successfully deleted");
    }
    public String updateSkill(SkillDto skillDto) {

        Skill skill=skillMapper.dtoToEntity(skillDto);
        Skill existingSkill=skillRepository.findById(skill.getId()).orElse(null);
        if(skill.getCode()!=null)
        {
            existingSkill.setCode(skill.getCode());
        }
        if(skill.getDescription()!=null)
        {
            existingSkill.setDescription(skill.getDescription());
        }

        existingSkill=skillRepository.save(existingSkill);
        skillMapper.entityToDto(existingSkill);
        return RMSConstant.UPDATESKILL;

    }

}
