package com.tek.rms.mapper;
import com.tek.rms.dto.ResourceDto;
import com.tek.rms.model.Resource;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;
@Component
public class ResourceMapper {
    public ResourceDto entityToDto(Resource resource)
    {
        ResourceDto dto=new ResourceDto();
        if(resource.getEmployee_id()!=0){
            dto.setEmployee_id(resource.getEmployee_id());}
        if(resource.getFirst_name()!=null){
            dto.setFirst_name(resource.getFirst_name());}
        if(resource.getLast_name()!=null){
            dto.setLast_name(resource.getLast_name());}
        if(resource.getPeoplesoft_id()!=0){
            dto.setPeoplesoft_id(resource.getPeoplesoft_id());}
        if(resource.getRole_id()!=0){
            dto.setRole_id(resource.getRole_id());}
        if(resource.getMail_id()!=null){
            dto.setMail_id(resource.getMail_id());}
        if(resource.getBusiness_unit_id()!=0){
            dto.setBusiness_unit_id(resource.getBusiness_unit_id());}

        dto.setCreated_timestamp(resource.getCreated_timestamp());
        dto.setUpdated_timestamp(resource.getUpdated_timestamp());

        if(resource.getEmployee_projects()!=null){
            dto.setEmployee_projects(resource.getEmployee_projects());
        }

        if(resource.getEmployee_skills()!=null){
            dto.setEmployee_skills(resource.getEmployee_skills());
        }
        if(resource.getIsDeleted()!=0){
            dto.setIsDeleted((resource.getIsDeleted()));
        }
        return dto;
    }
    public List<ResourceDto> entityToDto(List<Resource> resource)
    {
        return resource.stream().map(this::entityToDto).collect(Collectors.toList());
    }
    public Resource DtoToEntity(ResourceDto resourceDTO)
    {
        Resource dto=new Resource();
        if(resourceDTO.getEmployee_id()!=0){
            dto.setEmployee_id(resourceDTO.getEmployee_id());}
        if(resourceDTO.getFirst_name()!=null){
            dto.setFirst_name(resourceDTO.getFirst_name());}
        if(resourceDTO.getLast_name()!=null){
            dto.setLast_name(resourceDTO.getLast_name());}
        if(resourceDTO.getPeoplesoft_id()!=0){
            dto.setPeoplesoft_id(resourceDTO.getPeoplesoft_id());}
        if(resourceDTO.getRole_id()!=0){
            dto.setRole_id(resourceDTO.getRole_id());}
        if(resourceDTO.getMail_id()!=null){
            dto.setMail_id(resourceDTO.getMail_id());}
        if(resourceDTO.getBusiness_unit_id()!=0){
            dto.setBusiness_unit_id(resourceDTO.getBusiness_unit_id());}
        dto.setCreated_timestamp(resourceDTO.getCreated_timestamp());
        dto.setUpdated_timestamp(resourceDTO.getUpdated_timestamp());

        if(resourceDTO.getEmployee_projects()!=null){
            dto.setEmployee_projects(resourceDTO.getEmployee_projects());
        }

        if(resourceDTO.getEmployee_skills()!=null){
            dto.setEmployee_skills(resourceDTO.getEmployee_skills());
        }
        if(resourceDTO.getIsDeleted()!=0){
            dto.setIsDeleted(resourceDTO.getIsDeleted());
        }
        return dto;
    }

    public List<Resource> DtoToEntity(List<ResourceDto> resourceDTO)
    {
        return resourceDTO.stream().map(this::DtoToEntity).collect(Collectors.toList());
    }
}