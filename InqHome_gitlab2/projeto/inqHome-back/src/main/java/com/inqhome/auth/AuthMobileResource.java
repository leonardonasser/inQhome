package com.inqhome.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inqhome.usuario.CriarUsuarioDTO;
import com.inqhome.usuario.Usuario;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping(value = "/api/mobile/auth")
public class AuthMobileResource {
    
    @Autowired
    AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginDTO> login(@RequestBody CredenciaisDTO dados) {
        return ResponseEntity.ok().body(authService.login(dados));
    }
    
    @PostMapping
    public Usuario cadastrarUsuario(@RequestBody CriarUsuarioDTO usuario) {
        return authService.cadastrarUsuario(usuario);
    }

}
