package com.tek.rms.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.tek.rms.dto.BusinessDto;
import org.springframework.stereotype.Component;

import com.tek.rms.model.Business;
@Component
public class BusinessMapper {

	public BusinessDto entityToDto(Business business) {
		BusinessDto dto = new BusinessDto();
		if(business.getId()!=0)
			dto.setId(business.getId());
		if (business.getCode() != null)
			dto.setCode(business.getCode());
		if (business.getUnit_description() != null)
			dto.setUnit_description(business.getUnit_description());
		if(business.getIsDeleted()!=0)
			dto.setIsDeleted(business.getIsDeleted());
		return dto;
	}

	public List<BusinessDto> entityToDto(List<Business> business) {
		return business.stream().map(x -> entityToDto(x)).collect(Collectors.toList());
	}

	public Business dtoToEntity(BusinessDto dto) {
		Business b = new Business();
		b.setId(dto.getId());
		if (dto.getCode() != null)
			b.setCode(dto.getCode());
		if (dto.getUnit_description() != null)
			b.setUnit_description(dto.getUnit_description());
		if(dto.getIsDeleted()!=0)
			b.setIsDeleted(dto.getIsDeleted());
		return b;
	}

	public List<Business> dtoToEntity(List<BusinessDto> dto) {
		return dto.stream().map(x -> dtoToEntity(x)).collect(Collectors.toList());
	}
}
