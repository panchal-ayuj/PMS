package com.accolite.server.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoogleTokenPayload {
    String email;

    public String getEmail() {
        return this.email;
    }
}
