package com.tek.rms.service;
import com.tek.rms.dto.CustomerDto;
import com.tek.rms.exceptions.CustomerApiException;
import com.tek.rms.mapper.CustomerMapper;
import com.tek.rms.model.Business;
import com.tek.rms.model.Customer;
import com.tek.rms.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService  {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    CustomerMapper customerMapper;

    public CustomerDto createCustomer(CustomerDto customerDto){
        Customer customer=customerMapper.dtoToEntity(customerDto);
        return customerMapper.entityToDto(customerRepository.save(customer));
    }
    public List<CustomerDto> findAll(){
        List<Customer> findAll=customerRepository.findAll();
        return customerMapper.entityToDto(findAll);
    }
    public CustomerDto findById(Long id) throws CustomerApiException {
        Customer result=customerRepository.findById(id).orElseThrow(()-> new CustomerApiException("customer id "+id+" not found"));
        return customerMapper.entityToDto(result);
    }

    public List<CustomerDto> findByCategory(int category) throws CustomerApiException{
        List<Customer> existing=customerRepository.findByCategory(category);
        if(!existing.isEmpty()) return customerMapper.entityToDto(existing);
        else
            throw new CustomerApiException("Customers not Found");
    }

    public String update(CustomerDto customerDto){
        Customer customer=customerMapper.dtoToEntity(customerDto);
        Customer existingCustomer= customerRepository.findById(customer.getId()).orElse(null);
        assert existingCustomer != null;
        if(customer.getName()!=null)
            existingCustomer.setName(customer.getName());
        if(customer.getCategory()!=0)
            existingCustomer.setCategory(customer.getCategory());
        if(customer.getDescription()!=null)
            existingCustomer.setDescription(customer.getDescription());
        if(customer.getStatus()!=null)
            existingCustomer.setStatus(customer.getStatus());
        existingCustomer=customerRepository.save(existingCustomer);
        customerMapper.entityToDto(existingCustomer);
        return ("updated successfully");
    }

                                                        public String deleteCustomer(Long id){
                                                            Customer result=customerRepository.findById(id).orElse(null);
                                                            assert result != null;
                                                            customerRepository.deleteById(result.getId());
                                                            return ("successfully deleted");
                                                        }
}