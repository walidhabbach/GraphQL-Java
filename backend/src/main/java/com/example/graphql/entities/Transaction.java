package com.example.graphql.entities;

import com.example.graphql.enums.TypeTransaction;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double  montant;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP) // Ensures that both date and time are stored
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateTransaction;
    @Enumerated(EnumType.STRING)
    private TypeTransaction type;
    private String description;
    @ManyToOne
    private Compte compte;
}