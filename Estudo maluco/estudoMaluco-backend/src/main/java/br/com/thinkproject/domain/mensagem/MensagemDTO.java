package br.com.thinkproject.domain.mensagem;

import br.com.thinkproject.domain.usuario.Usuario;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class MensagemDTO {

    private Long id;
    private Usuario usuarioCria;
    private Usuario usuarioRecebe;
    private String texto;
    private Date dataHora;

    public MensagemDTO(Mensagem mensagem) {
        this.id = mensagem.getId();
        this.usuarioCria = mensagem.getUsuarioCria();
        this.usuarioRecebe = mensagem.getUsuarioRecebe();
        this.texto = mensagem.getTexto();
        this.dataHora = mensagem.getDataHora();
    }

    public static MensagemDTO ofEntity(Mensagem mensagem) {
        return new MensagemDTO(mensagem);
    }

    public static List<MensagemDTO> ofEntities(List<Mensagem> mensagens) {
        return mensagens.stream().map(MensagemDTO::ofEntity).collect(Collectors.toList());
    }

    public MensagemDTO() {
        super();
        // TODO Auto-generated constructor stub
    }
}
