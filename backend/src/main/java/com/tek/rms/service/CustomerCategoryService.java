package com.tek.rms.service;

import com.tek.rms.dto.CustomerCategoryDto;
import com.tek.rms.mapper.CustomerCategoryMapper;
import com.tek.rms.model.CustomerCategory;
import com.tek.rms.repository.CustomerCategoryRepository;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerCategoryService {
    @Autowired
    CustomerCategoryRepository customerCategoryRepository;
    @Autowired
    CustomerCategoryMapper customerCategoryMapper;

    public List<CustomerCategoryDto> findAll(){
        List<CustomerCategory> findAll=customerCategoryRepository.findAllCustomerCategories();
        return customerCategoryMapper.entityToDto(findAll);
    }

    public String addNew(CustomerCategoryDto customerCategoryDTO){
        CustomerCategory customerCategory= customerCategoryMapper.dtoToEntity(customerCategoryDTO);
        CustomerCategory existingCategory=customerCategoryRepository.findBycode(customerCategory.getCode());
        if(existingCategory == null){
            customerCategoryMapper.entityToDto(customerCategoryRepository.save(customerCategory));
            return RMSConstant.CustomerCategoryAdd;
        }
        else {
            return RMSConstant.FAIL_Category;
        }

    }

    public String deleteCustomerCategory(Long id){
        CustomerCategory result=customerCategoryRepository.findById(id).orElse(null);
        assert result != null;
        customerCategoryRepository.deleteById(result.getId());
        return ("successfully deleted");
    }

    public CustomerCategoryDto findById(Long id){
        CustomerCategory customerCategory=customerCategoryRepository.findById(id).orElse(null);
        assert customerCategory != null;
        return customerCategoryMapper.entityToDto(customerCategory);
    }

    public String updateCustomerCategory(CustomerCategoryDto customerCategoryDto){
        CustomerCategory customerCategory=customerCategoryMapper.dtoToEntity(customerCategoryDto);
        CustomerCategory existingCustomerCategory=customerCategoryRepository.findById(customerCategory.getId()).orElse(null);
        if(customerCategory.getId()!=0)
            existingCustomerCategory.setId(customerCategory.getId());
        if(customerCategory.getCode()!=null)
            existingCustomerCategory.setCode(customerCategory.getCode());
        if(customerCategory.getDescription()!=null)
            existingCustomerCategory.setDescription(customerCategory.getDescription());
        existingCustomerCategory=customerCategoryRepository.save(existingCustomerCategory);
        customerCategoryMapper.entityToDto(existingCustomerCategory);
        return "success";
    }
}