package com.inqhome.inquilino;

import com.inqhome.casa.Casa;
import com.inqhome.casa.CasaService;
import com.inqhome.mensagem.Mensagem;
import com.inqhome.mensagem.MensagemService;
import com.inqhome.usuario.Usuario;
import com.inqhome.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InquilinoService {

    @Autowired
    private InquilinoRepository inquilinoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CasaService casaService;

    @Autowired
    private MensagemService mensagemService;

    public List<Inquilino> buscarInquilinos() {
        return inquilinoRepository.findAll();
    }

    public Inquilino buscarInquilinoPeloId(Long id) {
        return inquilinoRepository.findById(id).orElseThrow(() -> new RuntimeException());
    }

    public Inquilino buscarInquilinoPeloUsuario(Usuario usuario) {
        return inquilinoRepository.findInquilinoByUsuarioInquilino(usuario);
    }

    public IdentificarInqDTO verificarInquilino(Long idUsuario1, Long idUsuario2) {
        
        System.out.println("sinal");

        List<Mensagem> mensagens = mensagemService.buscarMensagens(idUsuario1, idUsuario2);

        mensagens = mensagens.stream().filter(m -> m.isMsgProposta()).collect(Collectors.toList());
        Collections.sort(mensagens, Comparator.comparing(Mensagem::getDataHora).reversed());

        IdentificarInqDTO identInqDTO = new IdentificarInqDTO();
        identInqDTO.setSolicitanteInq(mensagens.get(0).getContato().getUsuarioResponsavel());

        Inquilino inquilino = buscarInquilinoPeloUsuario(mensagens.get(0).getContato().getUsuarioResponsavel());
        if (inquilino != null) {
            identInqDTO.setJaInquilino(true);
        } else {
            identInqDTO.setJaInquilino(false);
        }

        return identInqDTO;
    }

    public Inquilino aceitarInquilino(Long idResponsavel, Long idSolicitante) {
        Usuario responsavel = usuarioService.buscarUsuarioPeloId(idResponsavel);
        Usuario solicitante = usuarioService.buscarUsuarioPeloId(idSolicitante);

        List<Casa> casas = casaService.buscarCasas().stream()
                .filter(c -> c.getUsuarioResponsavel().getIdUsuario() == responsavel.getIdUsuario()).collect(Collectors.toList());
        Casa casa = casas.get(0);

        Inquilino inquilino = new Inquilino(solicitante, casa);
        return inquilinoRepository.save(inquilino);
    }

    public LiberaDespesaDTO liberacaoDespesa(Long idUsuario) {

        LiberaDespesaDTO liberaDespesaDTO = new LiberaDespesaDTO();
        Usuario usuario = usuarioService.buscarUsuarioPeloId(idUsuario);

        Inquilino inquilino = buscarInquilinoPeloUsuario(usuario);
        List<Casa> casas = casaService.buscarCasas().stream()
                .filter(c -> c.getUsuarioResponsavel().getIdUsuario() == usuario.getIdUsuario()).collect(Collectors.toList());
        
        Casa casa = null;
        if(casas.size() > 0) {
            casa = casas.get(0);    
        }
        
        if (inquilino != null) {
            liberaDespesaDTO.setDespesasLiberado(true);
            liberaDespesaDTO.setCasa(inquilino.getCasa());
        }   else if (casa != null) {
            liberaDespesaDTO.setDespesasLiberado(true);
            liberaDespesaDTO.setCasa(casa);
        } 
        
        
        if ( inquilino == null && casa == null) {
            liberaDespesaDTO.setDespesasLiberado(false);
        }
        
        return new LiberaDespesaDTO(liberaDespesaDTO.isDespesasLiberado(), liberaDespesaDTO.getCasa());
    }

    public Inquilino salvarInquilino(CriarInquilinoDTO dados) {
        Usuario usuario = usuarioService.buscarUsuarioPeloId(dados.getInquilinoId());
        Casa casa = casaService.buscarCasaPeloId(dados.getCasaId());

        Inquilino inquilino = new Inquilino(usuario, casa);
        return inquilinoRepository.save(inquilino);
    }

    public void deletarInquilinoPeloId(Long id) {
        Inquilino inquilino = buscarInquilinoPeloId(id);
        inquilinoRepository.delete(inquilino);
    }

    public Inquilino atualizarInquilino(Long id, CriarInquilinoDTO dados) {
        Inquilino inquilino = buscarInquilinoPeloId(id);

        inquilino.setContrato(dados.getContrato());
        return inquilinoRepository.save(inquilino);
    }
}
