package com.example.graphql.requests;


import com.example.graphql.enums.TypeTransaction;
import lombok.*;


import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {
    private Long compteId;
    private Double montant;
    private TypeTransaction type;
    private String description;
}
