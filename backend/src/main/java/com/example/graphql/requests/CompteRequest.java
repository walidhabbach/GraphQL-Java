package com.example.graphql.requests;
import com.example.graphql.enums.TypeCompte;
import lombok.Data;

import java.util.Date;
@Data
public class CompteRequest {
    private Double solde;
     private TypeCompte type;
}