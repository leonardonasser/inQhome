package com.inqhome.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping(value = "/api/web/auth")
public class AuthWebResource {
    
    @Autowired
    AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginDTO> login(@RequestBody CredenciaisDTO dados) {
        System.out.println(dados);
        return ResponseEntity.ok().body(authService.login(dados));
    }

}
