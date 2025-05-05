package com.tek.rms.mapper;


import com.tek.rms.dto.UserDto;
import com.tek.rms.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class UserDtoMapper {
	
	public UserDto entityToDto(User user) {
		UserDto dto=new UserDto();
		if( user.getId()!=0) {
		dto.setId(user.getId());
		}
		if( user.getUsername()!=null) {
		dto.setUsername(user.getUsername());
		}
		if(user.getPassword() !=null) {
		dto.setPassword(user.getPassword());
		}
		if(user.getStatus() !=null) {
		dto.setStatus(user.getStatus());
		}
		dto.setLogin_status(user.getLogin_status());
		
		if(user.getCreated_timestamp()!=null) {
		dto.setCreated_timestamp(user.getCreated_timestamp());
		}
		return dto;
	}
	public List<UserDto> entityToDto(List<User> user){
		return user.stream().map(x-> entityToDto(x)).collect(Collectors.toList());
	}
	public User dtoToEntity(UserDto dto) {
		User user=new User();
		if( dto.getId()!=0) {
		user.setId(dto.getId());}
		if( dto.getUsername()!=null) {
		user.setUsername(dto.getUsername());
		}
		if(dto.getPassword() !=null) {
	    user.setPassword(dto.getPassword());
		}
		if(dto.getStatus() !=null) {
		user.setStatus(dto.getStatus());
		}
		user.setLogin_status(dto.getLogin_status());
		if(dto.getCreated_timestamp()!=null) {
		user.setCreated_timestamp(dto.getCreated_timestamp());
		}
		return user;
	}
	
	public List<User> dtoToEntity(List<UserDto> dto){
		return dto.stream().map(x-> dtoToEntity(x)).collect(Collectors.toList());
	}
}
