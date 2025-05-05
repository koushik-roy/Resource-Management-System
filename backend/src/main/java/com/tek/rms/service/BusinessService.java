package com.tek.rms.service;
import java.util.List;
import com.tek.rms.exceptions.InvalidBusinessException;
import com.tek.rms.repository.BusinessRepository;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tek.rms.dto.BusinessDto;
import com.tek.rms.mapper.BusinessMapper;
import com.tek.rms.model.Business;

@Service
public class BusinessService {
	@Autowired
	BusinessRepository businessRepository;
	@Autowired
	BusinessMapper businessMapper;
	public String addBusiness(BusinessDto businessDto) throws InvalidBusinessException {
		Business business = businessMapper.dtoToEntity(businessDto);
		if (!businessRepository.existsByCode(business.getCode())) {
			business = businessRepository.save(business);
		} else {
			throw new InvalidBusinessException("already exists");
		}
		return "Successfully Added";

	}

	public List<BusinessDto> findBusiness() {
		List<Business> results = businessRepository.findAllBusiness();
		return businessMapper.entityToDto(results);
	}

	public BusinessDto findBusinessById(Long id) throws InvalidBusinessException {
		Business result = businessRepository.findById(id).orElse(null);
		if (result == null) {
			throw new InvalidBusinessException("user you have entered is invalid");
		} else {
			return businessMapper.entityToDto(result);
		}
	}

	public String deleteBusinessUnit(Long id){
		Business result=businessRepository.findById(id).orElse(null);
		assert result != null;
		businessRepository.deleteById(result.getId());
		return ("successfully deleted");
	}
	public String updateBusinessUnit(BusinessDto businessDto) {

		Business business=businessMapper.dtoToEntity(businessDto);
		Business existingBusiness=businessRepository.findById(business.getId()).orElse(null);
		if(business.getCode()!=null)
		{
			existingBusiness.setCode(business.getCode());
		}
		if(business.getUnit_description()!=null)
		{
			existingBusiness.setUnit_description(business.getUnit_description());
		}

		existingBusiness=businessRepository.save(existingBusiness);
		businessMapper.entityToDto(existingBusiness);
		return RMSConstant.UPDATEBUSINESS;

	}


}