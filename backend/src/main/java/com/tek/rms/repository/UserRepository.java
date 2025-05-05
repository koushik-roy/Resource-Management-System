package com.tek.rms.repository;




import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.tek.rms.model.User;




@Repository
public interface UserRepository extends JpaRepository<User,Integer>{
	

	 User findByusername(String username);


}
