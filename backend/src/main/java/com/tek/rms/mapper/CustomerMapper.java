package com.tek.rms.mapper;

import com.tek.rms.dto.CustomerDto;
import com.tek.rms.model.Customer;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomerMapper {
    public CustomerDto entityToDto(Customer customer){
        CustomerDto dto=new CustomerDto();
        dto.setId(customer.getId());
        if(customer.getName()!=null)
            dto.setName(customer.getName());
        if(customer.getCategory()!=0)
            dto.setCategory(customer.getCategory());
        if(customer.getDescription()!=null)
            dto.setDescription(customer.getDescription());
        if(customer.getStatus()!=null)
            dto.setStatus(customer.getStatus());
        if(customer.getIsDeleted()!=0)
            dto.setIsDeleted(customer.getIsDeleted());
        return dto;
    }

    public List<CustomerDto> entityToDto(List<Customer> customerList){
        return customerList.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public Customer dtoToEntity(CustomerDto customerDTO){
        Customer entity=new Customer();
        entity.setId(customerDTO.getId());
        if(customerDTO.getName()!=null)
            entity.setName(customerDTO.getName());
        if(customerDTO.getCategory()!=0)
            entity.setCategory(customerDTO.getCategory());
        if(customerDTO.getDescription()!=null)
            entity.setDescription(customerDTO.getDescription());
        if(customerDTO.getStatus()!=null)
            entity.setStatus(customerDTO.getStatus());
        if(customerDTO.getIsDeleted()!=0)
            entity.setIsDeleted(customerDTO.getIsDeleted());
        return entity;
    }

    public List<Customer> dtoToEntity(List<CustomerDto> customerDTOList){
        return customerDTOList.stream().map(this::dtoToEntity).collect(Collectors.toList());
    }
}