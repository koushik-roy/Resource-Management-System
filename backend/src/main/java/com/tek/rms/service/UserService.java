package com.tek.rms.service;










import com.tek.rms.exceptions.UserNotFoundException;
import com.tek.rms.mapper.UserDtoMapper;
import com.tek.rms.model.UserEnStatus;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Service;

import com.tek.rms.dto.UserDto;
import com.tek.rms.model.User;
import com.tek.rms.repository.UserRepository;



@Service
public class UserService {


	@Autowired
	private  UserRepository userRepository;

	@Autowired
	UserDtoMapper userMapper;

	public String saveUser(UserDto userDto) {
		User user=userMapper.dtoToEntity(userDto);
		User existingUser=userRepository.findByusername(user.getUsername());
		if(existingUser == null) {
			user.setStatus(UserEnStatus.TYPE1);
			user.setLogin_status(0);

			user = userRepository.save(user);
			userMapper.entityToDto(user);
			return RMSConstant.SUCCESS_REGISTER;
		}
		else {
			return RMSConstant.FAIL_REGISTER;
		}
	}





	public UserDto updateUser(UserDto userDto) {

		User user=userMapper.dtoToEntity(userDto);
		User existingUser=userRepository.findById(user.getId()).orElse(null);
		if( user.getUsername()!=null) {
			existingUser.setUsername(user.getUsername());
		}
		if(user.getPassword() !=null) {
			existingUser.setPassword(user.getPassword());
		}
		if(user.getStatus() !=null) {
			existingUser.setStatus(user.getStatus());
		}



		existingUser=userRepository.save(existingUser);

		return userMapper.entityToDto(existingUser);


	}



	public String login(UserDto userDto) {
		User user=userMapper.dtoToEntity(userDto);
		User existingUser=userRepository.findByusername(user.getUsername());
		if(existingUser != null) {
			if ((user.getUsername().equals(existingUser.getUsername()) && (user.getPassword().equals(existingUser.getPassword())))) {
				existingUser.setLogin_status(1);
				userRepository.save(existingUser);
				return RMSConstant.LOGIN;
			} else {
				return RMSConstant.FAIL_PASSWORD;
			}
		}
		else {
			return RMSConstant.FAIL_LOGIN;
		}
	}


	public String logout(UserDto userDto) {
		User user=userMapper.dtoToEntity(userDto);
		User existingUser=userRepository.findByusername(user.getUsername());
		if(existingUser != null && existingUser.getLogin_status() == 1) {
			existingUser.setLogin_status(0);
			userRepository.save(existingUser);
			return RMSConstant.LOGOUT;
		}
		else {
			return RMSConstant.FAIL_LOGOUT;
		}
	}

	public UserDto findByusername(String username)
	{
		User findByUsername= userRepository.findByusername(username);
		return userMapper.entityToDto(findByUsername);
	}
	public UserDto findById(int id){
		User result=userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id :" + id));

		return userMapper.entityToDto(result);
	}








}
