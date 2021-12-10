package com.inqhome.mensagem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inqhome.contato.Contato;
import com.inqhome.inquilino.FiltroUsuariosDTO;
import com.inqhome.inquilino.IdentificarInqDTO;
import com.inqhome.inquilino.InquilinoService;
import com.inqhome.inquilino.LiberaDespesaDTO;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/mobile/mensagem")
public class MensagemResource {

    @Autowired
    private MensagemService mensagemService;

    @GetMapping("/{idUsuario1}/{idUsuario2}")
    private List<Mensagem> listarMensagens(@PathVariable Long idUsuario1, @PathVariable Long idUsuario2){
        return mensagemService.buscarMensagens(idUsuario1, idUsuario2);
    }
    
 //   @GetMapping("/listar")
   // private List<Mensagem> listarContatos(){
    //    return mensagemService.buscarContatos();
    //}
        
    @PostMapping
    private Mensagem criar(@RequestBody CriarMensagemDTO mensagem) {
        System.out.println(mensagem);
        return mensagemService.criar(mensagem);
    }
    
    @DeleteMapping("/{id}")
    private void deletar(@PathVariable Long id){
         mensagemService.deletar(id);
    }
}
