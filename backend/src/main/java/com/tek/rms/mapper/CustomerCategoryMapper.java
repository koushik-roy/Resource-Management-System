package com.tek.rms.mapper;

import com.tek.rms.dto.CustomerCategoryDto;
import com.tek.rms.model.CustomerCategory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomerCategoryMapper {
    public CustomerCategoryDto entityToDto(CustomerCategory customerCategory){
        CustomerCategoryDto dto=new CustomerCategoryDto();
        dto.setId(customerCategory.getId());
        if(customerCategory.getCode()!=null)
            dto.setCode(customerCategory.getCode());
        if(customerCategory.getDescription()!=null)
            dto.setDescription(customerCategory.getDescription());
        if(customerCategory.getIsDeleted()!=0)
            dto.setIsDeleted(customerCategory.getIsDeleted());
        return dto;
    }
    public List<CustomerCategoryDto> entityToDto(List<CustomerCategory> customerCategories){
        return customerCategories.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public CustomerCategory dtoToEntity(CustomerCategoryDto customerCategoryDTO){
        CustomerCategory entity=new CustomerCategory();
        entity.setId(customerCategoryDTO.getId());
        if(customerCategoryDTO.getCode()!=null)
            entity.setCode(customerCategoryDTO.getCode());
        if(customerCategoryDTO.getDescription()!=null)
            entity.setDescription(customerCategoryDTO.getDescription());
        if(customerCategoryDTO.getIsDeleted()!=0)
            entity.setIsDeleted(customerCategoryDTO.getIsDeleted());
        return entity;
    }
    public List<CustomerCategory> dtoToEntity(List<CustomerCategoryDto> customerCategoryDTOS){
        return customerCategoryDTOS.stream().map(this::dtoToEntity).collect(Collectors.toList());
    }
}