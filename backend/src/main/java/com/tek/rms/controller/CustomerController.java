package com.tek.rms.controller;

import com.tek.rms.dto.CustomerDto;
import com.tek.rms.exceptions.CustomerApiException;
import com.tek.rms.service.CustomerService;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @PostMapping("/addCustomer")
    public CustomerDto newCustomer(@RequestBody CustomerDto newCustomerDto){
        return customerService.createCustomer(newCustomerDto);
    }
    @GetMapping("/customers")
    public List<CustomerDto> loadAll(){
        return customerService.findAll();
    }
    @GetMapping("/{id}")
    public CustomerDto findById(@PathVariable(value = RMSConstant.ID) Long id) throws CustomerApiException {
        return customerService.findById(id);
    }
    @GetMapping("/findByCategory/{category}")
    public List<CustomerDto> findByCategory(@PathVariable (value = RMSConstant.CATEGORY) int category) throws CustomerApiException{
        return customerService.findByCategory(category);
    }
    @PutMapping("/updateCustomer")
    public String updateCustomer(@RequestBody CustomerDto customerDto){
        return customerService.update(customerDto);
    }

    @DeleteMapping("/deleteCustomer/{id}")
    public String deleteCustomer(@PathVariable Long id){
        return customerService.deleteCustomer(id);
    }
}
