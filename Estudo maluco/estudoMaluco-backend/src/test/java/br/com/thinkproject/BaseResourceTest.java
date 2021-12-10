package br.com.thinkproject;

import static io.restassured.RestAssured.given;

import br.com.thinkproject.domain.auth.AuthRequest;
import br.com.thinkproject.domain.auth.AuthResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.http.ContentType;
import org.apache.commons.lang3.StringUtils;


public class BaseResourceTest {

    private static String TOKEN_ADMIN = "";
    
    
    protected String loginComAdmin()  throws JsonMappingException, JsonProcessingException {
        
        if(TOKEN_ADMIN.equals(StringUtils.EMPTY)) {
            
            AuthRequest authRequest = new AuthRequest();
            authRequest.setLogin("admin");
            authRequest.setSenha("123456");
            
            String resultado = 
                given()
                        .when()
                        .contentType(ContentType.JSON)
                        .body(authRequest)
                        .post("/api/auth/login")
                        .then()
                            .statusCode(200)
                            .extract()
                            .asString();
            
            ObjectMapper oM = new ObjectMapper();
            AuthResponse authResponse = oM.readValue(resultado, AuthResponse.class);
            TOKEN_ADMIN = authResponse.getToken();
            
        }
        
        return TOKEN_ADMIN;
        
    }
}
