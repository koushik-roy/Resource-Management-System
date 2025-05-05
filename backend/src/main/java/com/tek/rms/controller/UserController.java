package com.tek.rms.controller;






import com.tek.rms.dto.UserDto;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.*;



import com.tek.rms.service.UserService;



@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/user")
public class 		UserController {

	@Autowired
	private UserService userService;


	@PostMapping("/register")
	public String addUser(@RequestBody UserDto userDto) {
		return userService.saveUser(userDto);
	}

	@PutMapping("/update")
	public UserDto updateUser(@RequestBody UserDto userDto) {
		return userService.updateUser(userDto);
	}

	@GetMapping(value="/userByUsername/{username}")
	public UserDto findByUsername(@PathVariable(value = RMSConstant.NAME) String username) {

		return userService.findByusername(username);

	}
	@GetMapping("/userById/{id}")
	public UserDto findById(@PathVariable(value =RMSConstant.ID) int id){
		return userService.findById(id);
	}

	@PostMapping("/login")
	public String logIn(@RequestBody UserDto userDto) {
		return userService.login(userDto);
	}
	@GetMapping("/logout")
	public String logout(@RequestBody UserDto userDto) {
		return userService.logout(userDto);
	}





}
