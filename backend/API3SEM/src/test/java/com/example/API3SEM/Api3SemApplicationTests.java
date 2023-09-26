package com.example.API3SEM;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import API3SEM.API3SEM.controllers.ClientController;

@SpringBootTest
class Api3SemApplicationTests {

	@Autowired
	private ClientController controller;

	@Test
	void contextLoads() throws Exception {
		assertThat(controller).isNotNull();
	}

}
