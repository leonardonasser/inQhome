package br.com.thinkproject;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import br.com.thinkproject.domain.auth.AuthRequest;
import br.com.thinkproject.domain.auth.TokenIssuer;
import br.com.thinkproject.domain.usuario.UsuarioService;
import static org.junit.jupiter.api.Assertions.assertFalse;
import java.util.List;
import javax.inject.Inject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.MockMailbox;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthResourceTest {
    
    @Inject
    MockMailbox mailbox;
    
    @Inject
    UsuarioService usuarioService;
    
    @Inject
    TokenIssuer tokenIssuer;
    
    @BeforeEach
    void init() {
        mailbox.clear();
    }

    
    @Test
    @DisplayName("Deve retornar 200 quando o login de administrador e valido")
    @Order(1)
    void testLoginAdmin() throws JsonMappingException, JsonProcessingException {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setLogin("admin");
        authRequest.setSenha("123456");        

                given()
                        .when()
                        .contentType(ContentType.JSON)
                        .body(authRequest)
                        .post("/api/auth/login")
                        .then()
                            .statusCode(200)
                            .body("token", notNullValue())
                            .body("login", equalTo("admin"))
                            .body("tipoUsuario", equalTo("ADMINISTRADOR"));
                
                
    }

    @Test
    @DisplayName("Deve retornar 500 quando o login dado esta incorreto ou nao existe")
    @Order(2)
    void testLoginIncorreto() throws JsonMappingException, JsonProcessingException {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setLogin("adminErro");
        authRequest.setSenha("123456");
  
               String resultado = given()
                        .when()
                        .contentType(ContentType.JSON)
                        .body(authRequest)
                        .post("/api/auth/login")
                        .then()
                            .statusCode(500)
                                .extract()
                                .asString();
               
               assertTrue(resultado.contains("Login ou Senha incorretos!"));

    }

    
   
    @Test
    @DisplayName("Deve retornar 400 quando a senha dada esta incorreta ou nao existe")
    @Order(3)
    void testSenhaIncorreta() throws JsonMappingException, JsonProcessingException {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setLogin("admin");
        authRequest.setSenha("1234567");
        

               String resultado = given()
                        .when()
                        .contentType(ContentType.JSON)
                        .body(authRequest)
                        .post("/api/auth/login")
                        .then()
                            .statusCode(500)
                                .extract()
                                .asString();
               
               assertTrue(resultado.contains("Login ou Senha incorretos!"));

    }
    
     
    @Test
    @DisplayName("Deve retornar 400 quando não é enviado os parametros obrigatorios")
    @Order(4)
    void testLoginVazio() throws JsonMappingException, JsonProcessingException {
        AuthRequest authRequest = new AuthRequest();

               String resultado = given()
                        .when()
                        .contentType(ContentType.JSON)
                        .body(authRequest)
                        .post("/api/auth/login")
                        .then()
                            .statusCode(400)
                                .extract()
                                .asString();
               
               assertTrue(resultado.contains("não deve ser nulo"));
    }
    
    
    /*
    @Test
    @DisplayName("Deve retornar 200 quando o pedido de atualizar senha e feito com um token valido")
    @Order(5)
    void testAtualizarSenha() throws JsonMappingException, JsonProcessingException {
        
        Usuario usuario = usuarioService.recuperarPorEmailOrThrow("email@email.com");
        String token = tokenIssuer.issueForPasswordReset(usuario);
        
        AtualizacaoSenha atualizacaoSenha = new AtualizacaoSenha();
        atualizacaoSenha.setToken(token);
        atualizacaoSenha.setNovaSenha("12345");

             given()
                        .when()
                        .contentType(ContentType.JSON)
                        .body(atualizacaoSenha)
                        .post("/api/auth/senha")
                        .then()
                            .statusCode(200);                                

                            
         Usuario usuarioNovaSenha = usuarioService.recuperarPorEmailOrThrow("email@email.com");
         assertNotNull(usuarioNovaSenha);
         assertTrue(usuarioNovaSenha.passwordMatches("12345"));

    }
    
    @Test
    @DisplayName("Deve retornar 400 quando o pedido de atualizar senha e feito com um token invalido")
    @Order(6)
    void testAtualizarSenhaTokenInvalido() throws JsonMappingException, JsonProcessingException {

        AtualizacaoSenha atualizacaoSenha = new AtualizacaoSenha();
        atualizacaoSenha.setToken("token-invalido");
        atualizacaoSenha.setNovaSenha("12345");

        String resultado =  given()
                            .when()
                            .contentType(ContentType.JSON)
                            .body(atualizacaoSenha)
                            .post("/api/auth/senha")
                            .then()
                                .statusCode(400)
                                .extract()
                                .asString();                                

                            
        assertTrue(resultado.contains("Token inválido"));
        assertFalse(!(resultado.contains("Token inválido")));
    }
    
    @Test
    @DisplayName("Voltar para a senha anterior")
    @Order(7)
    void testAtualizarSenhaDeVolta() throws JsonMappingException, JsonProcessingException {
        
        Usuario usuario = usuarioService.recuperarPorEmailOrThrow("email@email.com");
        String token = tokenIssuer.issueForPasswordReset(usuario);
        
        AtualizacaoSenha atualizacaoSenha = new AtualizacaoSenha();
        atualizacaoSenha.setToken(token);
        atualizacaoSenha.setNovaSenha("123456");

             given()
                        .when()
                        .contentType(ContentType.JSON)
                        .body(atualizacaoSenha)
                        .post("/api/auth/senha")
                        .then()
                            .statusCode(200);                                

                            
         Usuario usuarioNovaSenha = usuarioService.recuperarPorEmailOrThrow("email@email.com");
         assertNotNull(usuarioNovaSenha);
         assertTrue(usuarioNovaSenha.passwordMatches("123456"));
    }*/
}
