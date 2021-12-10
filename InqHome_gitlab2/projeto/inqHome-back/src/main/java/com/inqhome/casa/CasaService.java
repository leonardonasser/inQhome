package com.inqhome.casa;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.inqhome.usuario.Usuario;
import com.inqhome.usuario.UsuarioService;

@Service
public class CasaService {

    @Autowired
    private CasaRepository casaRepository;

    @Autowired
    private UsuarioService usuarioService;

    public List<Casa> buscarCasas() {
        return casaRepository.findAll();
    }

    public Casa buscarCasaPeloUsuario(Usuario usuario) {
        return casaRepository.findCasaByUsuarioResponsavel(usuario);
    }
    
    public Casa buscarCasaPeloId(Long id) {
        return casaRepository.findById(id).orElseThrow(() -> new RuntimeException());
    }

    public Casa salvarCasa(CriarCasaDTO dados) {

        Usuario usuario = usuarioService.buscarUsuarioPeloId(dados.getUsuarioResponsavelId());
        Casa casa = new Casa(usuario, dados.getValorAluguel());
        
        
        return casaRepository.save(casa);
    }
    
    public Casa salvarCasaMobile(CriarCasaDTO dados) {

        Usuario usuario = usuarioService.buscarUsuarioPeloId(dados.getUsuarioResponsavelId());
        
        System.out.println(dados);
        
        Casa casa = new Casa(usuario, dados.getValorAluguel(), dados.getCep(), dados.getEndereco(), dados.getNumero(),
                dados.getLat(), dados.getLng(), dados.getCidade(), dados.getEstado());
        return casaRepository.save(casa);
    }

    public void deletarCasaPeloId(Long id) {
        Casa casa = buscarCasaPeloId(id);
        casaRepository.delete(casa);
    }

    public Casa atualizarCasa(Long id, CriarCasaDTO dados) {
        Casa casa = buscarCasaPeloId(id);
        
        casa.setValorAluguel(dados.getValorAluguel());
        return casaRepository.save(casa);
    }
}
