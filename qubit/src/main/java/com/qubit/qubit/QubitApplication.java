package com.qubit.qubit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication(scanBasePackages = "com.qubit.qubit")
@EnableJpaRepositories("com.qubit.qubit.repository")
@EntityScan("com.qubit.qubit.entity")
@Validated
@CrossOrigin
public class QubitApplication {

	public static void main(String[] args) {
		SpringApplication.run(QubitApplication.class, args);
	}

}
