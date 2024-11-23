package com.example.graphql.controllers;


import com.example.graphql.entities.Compte;
import com.example.graphql.entities.Transaction;
import com.example.graphql.requests.TransactionRequest;
import com.example.graphql.enums.TypeTransaction;
import com.example.graphql.repositories.CompteRepository;
import com.example.graphql.repositories.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;

import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;

import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
public class TransactionControllerGraphQL {

    @Autowired
    private final CompteRepository compteRepository;
    @Autowired
    private TransactionRepository transactionRepository;

     @QueryMapping
    public List<Transaction> allTransactions() {
        return transactionRepository.findAll();
    }

    @QueryMapping
    public List<Transaction> transactionsByCompteId(@Argument Long compteId) {
        Compte compte = compteRepository.findById(compteId).orElseThrow(() -> new RuntimeException("Compte not found"));
        return transactionRepository.findByCompteId(compte.getId());
    }

    @QueryMapping
    public Map<String, Object> transactionStats() {
        long count = transactionRepository.count();
        double sumDepots = transactionRepository.sumByType(TypeTransaction.DEPOT);
        double sumRetraits = transactionRepository.sumByType(TypeTransaction.RETRAIT);
        return Map.of(
                "count", count,
                "sumDepots", sumDepots,
                "sumRetraits", sumRetraits
        );

    }
    @QueryMapping
    public Map<String, Object> transactionStatsByCompteId(@Argument Long compteId) {
        long count = transactionRepository.countByCompteId(compteId);
        double sumDepots = transactionRepository.sumByTypeAndAccountID(TypeTransaction.DEPOT,compteId);
        double sumRetraits = transactionRepository.sumByTypeAndAccountID(TypeTransaction.RETRAIT,compteId);
        return Map.of(
                "count", count,
                "sumDepots", sumDepots,
                "sumRetraits", sumRetraits
        );

    }

    @MutationMapping
    public Transaction addTransaction (@Argument("transaction") TransactionRequest transactionRequest) {
        System.out.println(transactionRequest.getCompteId());
        Compte compte = compteRepository.findById(transactionRequest.getCompteId())
                .orElseThrow(() -> new RuntimeException("Compte not found"));

        Transaction transaction = new Transaction();

        if(transactionRequest.getType() == TypeTransaction.DEPOT) {
            compte.setSolde(transactionRequest.getMontant() + compte.getSolde());
        } else {
            if(compte.getSolde() - transactionRequest.getMontant() >= 0) {
                compte.setSolde(compte.getSolde() - transactionRequest.getMontant());
            } else throw new RuntimeException("Solde insuffisant");
        }

        compteRepository.save(compte);
        transaction.setMontant(transactionRequest.getMontant());
         transaction.setType(transactionRequest.getType());
        transaction.setDescription(transactionRequest.getDescription());
        transaction.setCompte(compte);
        transactionRepository.save(transaction);
        return transaction;
    }


}