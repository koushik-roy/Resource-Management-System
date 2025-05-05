package com.tek.rms.service;
import ch.qos.logback.core.net.SyslogOutputStream;
import com.tek.rms.dto.ResourceDto;
import com.tek.rms.mapper.Employee_projectMapper;
import com.tek.rms.mapper.ResourceMapper;
import com.tek.rms.model.CustomerCategory;
import com.tek.rms.model.Employee_skills;
import com.tek.rms.model.Resource;

import com.tek.rms.model.User;
import com.tek.rms.repository.Employee_projectRepository;
import com.tek.rms.repository.ResourceRepository;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ResourceService {
    @Autowired
    ResourceRepository resourceRepository;
    @Autowired
    ResourceMapper resourceMapper;

    @Autowired
    Employee_projectRepository employee_projectRepository;

    @Autowired
    Employee_projectMapper employee_projectMapper;

    public String addResource(ResourceDto resourceDTO)
    {
        System.out.println("hello i AM CALLED"+resourceDTO.toString());
        Resource resource=resourceRepository.saveAndFlush(resourceMapper.DtoToEntity(resourceDTO));
        resourceMapper.entityToDto(resource);
        return RMSConstant.ADD;
    }
    public ResourceDto findResourceById(Long employee_id)
    {
        Resource result=resourceRepository.findById(employee_id).orElse(null);
        return resourceMapper.entityToDto(result);
    }
    public String deleteResource(Long employee_id){
        Resource result=resourceRepository.findById(employee_id).orElse(null);
        assert result != null;
        resourceRepository.deleteById(result.getEmployee_id());
        return ("successfully deleted");
    }
    public String updateResource(ResourceDto resourceDTO) {


        Resource resource=resourceRepository.saveAndFlush(resourceMapper.DtoToEntity(resourceDTO));

        resourceMapper.entityToDto(resource);
        return RMSConstant.UPDATE;
    }
    public List<ResourceDto> findResources()
    {
        List<Resource> results=resourceRepository.findAllResources();
        return resourceMapper.entityToDto(results);
    }

    public String updateIsDeleted(Long id) {
        Resource resource=resourceRepository.findById(id).orElse(null);

        resource.setIsDeleted(1);
        resource=resourceRepository.save(resource);
        resourceMapper.entityToDto(resource);
        return ("deleted succesfully");
    }


}