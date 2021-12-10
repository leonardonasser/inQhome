package com.inqhome.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inqhome.config.SecurityConfig;
import com.inqhome.infra.exceptions.ValidationException;
import com.inqhome.security.JWTUtil;
import com.inqhome.usuario.CriarUsuarioDTO;
import com.inqhome.usuario.Usuario;
import com.inqhome.usuario.UsuarioService;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private SecurityConfig sc;

    @Autowired
    private JWTUtil jwtUtil;
    
    public LoginDTO login(CredenciaisDTO dados) {
        
        Usuario usuario = usuarioService.buscarUsuarioPeloEmail(dados.getEmail());
        
        if (usuario == null || !sc.bCryptPasswordEncoder().matches(dados.getSenha(), usuario.getSenha()))
            throw new ValidationException("Email ou senha invalida");
        
        String token = "Bearer " + jwtUtil.generateToken(usuario.getEmail());

        return new LoginDTO(usuario.getIdUsuario(), token, usuario.getNome(), usuario.getEmail(), usuario.getTelefone());
    }
    
    public Usuario cadastrarUsuario(CriarUsuarioDTO dados) {
        return usuarioService.salvarUsuario(dados);
    }

}
