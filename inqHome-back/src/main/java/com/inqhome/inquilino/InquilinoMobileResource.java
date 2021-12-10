package com.inqhome.inquilino;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping(value = "/api/mobile/inquilino")
public class InquilinoMobileResource {

    @Autowired
    private InquilinoService inquilinoService;

    @PostMapping("/liberar")
    private ResponseEntity<LiberaDespesaDTO> liberacaoDespesa(@RequestBody FiltroUsuariosDTO filtro){
        return ResponseEntity.ok().body(inquilinoService.liberacaoDespesa(filtro.getUsuario1()));
    }
    
    @GetMapping("/verificar/{idUsuario1}/{idUsuario2}")
    private ResponseEntity<IdentificarInqDTO> varificarInquilinoMensagem(@PathVariable Long idUsuario1, @PathVariable Long idUsuario2){
        return ResponseEntity.ok().body(inquilinoService.verificarInquilino(idUsuario1, idUsuario2));
    }
    
    @GetMapping("/aceitar/{idResponsavel}/{idSolicitante}")
    private Inquilino aceitarInquilino(@PathVariable Long idResponsavel, @PathVariable Long idSolicitante){
        return inquilinoService.aceitarInquilino(idResponsavel, idSolicitante);
    }



}
