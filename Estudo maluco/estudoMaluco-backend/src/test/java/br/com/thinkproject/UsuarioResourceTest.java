package br.com.thinkproject;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import br.com.thinkproject.domain.usuario.AtualizarUsuarioDTO;
import br.com.thinkproject.domain.usuario.CriarUsuarioDTO;
import br.com.thinkproject.domain.usuario.Role;
import br.com.thinkproject.domain.usuario.StatusUsuario;
import br.com.thinkproject.domain.usuario.UsuarioDTO;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UsuarioResourceTest extends BaseResourceTest {

    private static Long idUsuario = -1L;
    
    @Test
    @DisplayName("Recuperar a lista e verificar se tem 1:")
    @Order(1)
    public void testRecuperar() throws JsonMappingException, JsonProcessingException {
        String token = loginComAdmin();
        
        String resultado = 
                given()
                .header("Authorization", "Bearer " + token)
                .when()
                .contentType(ContentType.JSON)
                .get("/api/painel/usuarios")
                .then()
                    .statusCode(200)
                    .extract()
                        .asString();
        
        ObjectMapper oM = new ObjectMapper();
        List<UsuarioDTO> usuarios = oM.readValue(resultado, new TypeReference<List<UsuarioDTO>>(){});
        
        assertTrue(usuarios.size() == 1);
    }
    
    @Test
    @DisplayName("Criar um objeto e salvar:")
    @Order(2)
    public void testSalvar() throws JsonMappingException, JsonProcessingException {     
        String token = loginComAdmin();
        
        CriarUsuarioDTO criarUsuarioDTO = new CriarUsuarioDTO();
        criarUsuarioDTO.setLogin("Estrategico");
        criarUsuarioDTO.setPessoaId(1l);
        criarUsuarioDTO.setSenha("123456");
        criarUsuarioDTO.setStatusUsuario(StatusUsuario.ATIVO);
        criarUsuarioDTO.setTipoUsuario(Role.ADMINISTRADOR);
        
        
        String resultado = 
            given()
                .header("Authorization", "Bearer " + token)
                .when()
                .contentType(ContentType.JSON)
                .body(criarUsuarioDTO)
                .post("/api/painel/usuarios")
                .then()
                    .statusCode(200)
                    .extract()
                        .asString();
        
        ObjectMapper oM = new ObjectMapper();
        UsuarioDTO usuarioDTO = oM.readValue(resultado, UsuarioDTO.class);
        
        assertTrue(usuarioDTO.getId() > 1);
        assertTrue(usuarioDTO.getLogin().equals("Estrategico"));
        assertTrue(usuarioDTO.getStatusUsuario().equals(StatusUsuario.ATIVO));
        assertTrue(usuarioDTO.getTipoUsuario().equals(Role.ADMINISTRADOR));

        //Armazenar o id para buscas
        idUsuario = usuarioDTO.getId();
    }   
    

    @Test
    @DisplayName("Listagem após criação:")
    @Order(3)
    public void testLista() throws JsonMappingException, JsonProcessingException {
        String token = loginComAdmin();
       
        String resultado =
            given()
                .header("Authorization", "Bearer " + token)
                .when()
                .contentType(ContentType.JSON)
                .get("/api/painel/usuarios")
                .then()
                    .statusCode(200)
                    .extract()
                        .asString();
        
        ObjectMapper oM = new ObjectMapper();
        List<UsuarioDTO> usuarios = oM.readValue(resultado, new TypeReference<List<UsuarioDTO>>(){});
        
        assertTrue(usuarios.size() == 2);
        assertTrue(usuarios.get(1).getId() == this.idUsuario);
    
    }
    
    @Test
    @DisplayName("Recuperar por ID após criação:")
    @Order(4)
    public void testRecuperarPorId() throws JsonMappingException, JsonProcessingException {
        String token = loginComAdmin();
        
        String resultado =
            given()
                .header("Authorization", "Bearer " + token)
                .when()
                .contentType(ContentType.JSON)                
                .pathParam("id", this.idUsuario)
                .get("/api/painel/usuarios/{id}")
                .then()
                    .statusCode(200)
                    .extract()
                        .asString();
        
        assertFalse(resultado.contains("Não foi encontrado usuario"));
        
    }
    
    @Test
    @DisplayName("Teste de Alteração:")
    @Order(5)
    public void testAlterar() throws JsonMappingException, JsonProcessingException {
        String token = loginComAdmin();
        
        AtualizarUsuarioDTO atualizarUsuarioDTO = new AtualizarUsuarioDTO();
        atualizarUsuarioDTO.setLogin("Operacional");
        atualizarUsuarioDTO.setPessoaId(1l);
        atualizarUsuarioDTO.setSenha("123456");
        atualizarUsuarioDTO.setStatusUsuario(StatusUsuario.ATIVO);
        atualizarUsuarioDTO.setTipoUsuario(Role.ADMINISTRADOR);
        
        
        String resultado =
            given()
                .header("Authorization", "Bearer " + token)
                .when()
                .contentType(ContentType.JSON)
                .body(atualizarUsuarioDTO)
                .pathParam("id", this.idUsuario)
                .put("/api/painel/usuarios/{id}")
                .then()
                    .statusCode(200)
                    .extract()
                        .asString();
        
        ObjectMapper oM = new ObjectMapper();
        UsuarioDTO usuarioDTO = oM.readValue(resultado, UsuarioDTO.class);
        
        assertTrue(usuarioDTO.getId() > 1);
        assertTrue(usuarioDTO.getLogin().equals("Operacional"));
        assertTrue(usuarioDTO.getStatusUsuario().equals(StatusUsuario.ATIVO));
        assertTrue(usuarioDTO.getTipoUsuario().equals(Role.ADMINISTRADOR));
    }
    
    @Test
    @DisplayName("Deletar o registro")
    @Order(6)
    public void testeDelete() throws JsonMappingException, JsonProcessingException {      
        String token = loginComAdmin();
        
        given()
            .header("Authorization", "Bearer " + token)
            .when()
            .contentType(ContentType.JSON)
            .pathParam("id", this.idUsuario)
            .delete("/api/painel/usuarios/{id}")
            .then()
                .statusCode(204);
        
    }
    
    @Test
    @DisplayName("Lista com 1 após Exclusão:")
    @Order(7)
    public void testListaAposExclusao() throws JsonMappingException, JsonProcessingException {   
        String token = loginComAdmin();
        
        //Parâmetro de busca para fazer a listagem
        String search = "";
        
        String resultado =
            given()
                .header("Authorization", "Bearer " + token)
                .when()
                .contentType(ContentType.JSON)
                .queryParam("search", search)
                .get("/api/painel/usuarios")
                .then()
                    .statusCode(200)
                    .extract()
                        .asString();

        ObjectMapper oM = new ObjectMapper();
        List<UsuarioDTO> usuario = oM.readValue(resultado, new TypeReference<List<UsuarioDTO>>(){});
        
        assertTrue(usuario.size() == 1);
        
    }
    
    @Test
    @DisplayName("Recuperar por ID após Exclusão:")
    @Order(8)
    public void testRecuperarPorIdAposExclusao() throws JsonMappingException, JsonProcessingException {
        String token = loginComAdmin();
        
        String resultado =
            given()
                .header("Authorization", "Bearer " + token)
                .when()
                .contentType(ContentType.JSON)
                .pathParam("id", this.idUsuario)
                .get("/api/painel/usuarios/{id}")
                .then()
                    .statusCode(500)
                    .extract()
                        .asString();
        
        assertTrue(!resultado.contains("Não foi encontrado usuario"));
    }
    
    
}
