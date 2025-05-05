package com.tek.rms.controller;

import com.tek.rms.dto.CustomerCategoryDto;
import com.tek.rms.model.CustomerCategory;
import com.tek.rms.service.CustomerCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tek.rms.util.RMSConstant;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")

@RequestMapping("/customerCategory")
public class CustomerCategoryController {
    @Autowired
    CustomerCategoryService customerCategoryService;


    @GetMapping("/customerCategories")
    public List<CustomerCategoryDto> loadAll(){
        return customerCategoryService.findAll();
    }
    @PostMapping("/addCustomerCategory")
    public String addNew(@RequestBody CustomerCategoryDto customerCategoryDTO){
        return customerCategoryService.addNew(customerCategoryDTO);
    }
    @GetMapping("/{id}")
    public CustomerCategoryDto findById(@PathVariable (value = RMSConstant.ID) Long id){
        return customerCategoryService.findById(id);
    }

    @PutMapping("/updateCustomerCategory")
    public String updateCustomerCategory(@RequestBody CustomerCategoryDto customerCategoryDto){
        return customerCategoryService.updateCustomerCategory(customerCategoryDto);
    }

    @DeleteMapping("/deleteCustomerCategory/{id}")
    public String deleteCustomerCategory(@PathVariable Long id){
        return customerCategoryService.deleteCustomerCategory(id);
    }

}
