package com.tek.rms.controller;
import java.util.List;

import com.tek.rms.exceptions.InvalidBusinessException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tek.rms.dto.BusinessDto;
import com.tek.rms.service.BusinessService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/businessUnit")
public class BusinessController {
	@Autowired
	BusinessService businessService;
	@PostMapping("/addBusinessUnit")


	public String newBusinessUnit(@RequestBody BusinessDto businessDto) throws InvalidBusinessException{

		return businessService.addBusiness(businessDto);
	}

	@GetMapping("/businessUnits")
	public List<BusinessDto> findBusiness() {
		return businessService.findBusiness();
	}

	@GetMapping("/{id}")
	public BusinessDto findBusinessById(@PathVariable Long id) throws InvalidBusinessException {
		return businessService.findBusinessById(id);
	}

	@DeleteMapping("/deleteBusinessUnit/{id}")
	public String deleteBusinessUnitId(@PathVariable Long id){
		return businessService.deleteBusinessUnit(id);
	}

	@PutMapping("/updateBusinessUnit")
	public String updateBusinessUnit(@RequestBody BusinessDto businessDto)  {
		return businessService.updateBusinessUnit(businessDto);
	}



}

