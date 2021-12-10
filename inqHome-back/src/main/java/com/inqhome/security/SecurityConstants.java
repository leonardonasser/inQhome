/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.inqhome.security;

/**
 *
 * @author ricardo
 */
public interface SecurityConstants {

    String SECRET = "IDnfTAQ88osROGM0UXPleI7M5fghnMO3XExOqfzcNBsPFWPL1bILpHOjMlmybpnDyZwIDnfTAQ88osROGM0UXPleI7M5MO3XExOqfzcNBsPFWPL1bILpHOjMlmybpnDyZwIDnfTAQ88osROGM0UXPleawefI7M5MO3XExOqfzcNBsPFWPL1bILpHOjMlmybpnDyZwIDnfasdfTAQ88osROGM0UXPleI7M5MO3XExOqfzcNBsPFWPL1bILpHOjMlmybpnDyZw";
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
    String SIGN_UP_URL = "/users/sign-up";
    long EXPIRATION_TIME = 864_000_000; // 10 days

}
