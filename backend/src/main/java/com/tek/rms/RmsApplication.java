package com.tek.rms;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RmsApplication {


	private static final Logger log = LoggerFactory.getLogger(RmsApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(RmsApplication.class, args);
		log.info("Resource Management System is started");
	}

}

