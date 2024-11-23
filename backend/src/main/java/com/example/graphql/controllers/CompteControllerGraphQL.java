package com.example.graphql.controllers;

import com.example.graphql.entities.Compte;
import com.example.graphql.requests.CompteRequest;
import com.example.graphql.enums.TypeCompte;
import com.example.graphql.repositories.CompteRepository;

import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
public class CompteControllerGraphQL {

    private CompteRepository compteRepository;

    @QueryMapping
    public List<Compte> allComptes(){
        return compteRepository.findAll();
    }

    @QueryMapping
    public Compte compteById(@Argument Long id){
        Compte compte =  compteRepository.findById(id).orElse(null);
        if(compte == null) throw new RuntimeException(String.format("Compte %s not found", id));
        else return compte;
    }
    @QueryMapping
    public List<Compte> comptesByType(@Argument TypeCompte type){
        return compteRepository.findByType(type);
    }

    @MutationMapping
    public Compte deleteCompte(@Argument Long id){
        Compte compte = compteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compte not found with id: " + id));

        compteRepository.delete(compte);
        return compte;
    }
    @MutationMapping
    public Compte saveCompte(@Argument("compte") CompteRequest compteRequest) {
        System.out.println("Received CompteRequest: " + compteRequest);


        if (compteRequest == null) {
            throw new RuntimeException("CompteRequest is null");
        }

        try {
            // Map fields to Compte entity
            Compte compte = new Compte();
            compte.setSolde(compteRequest.getSolde());
            compte.setType(compteRequest.getType());

            // Save and return Compte
            return compteRepository.save(compte);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse dateCreation: " + e.getMessage());
        }
    }
    @QueryMapping
    public Map<String, Object> compteStats() {
        long count = compteRepository.count();
        Double sum = compteRepository.sumSoldes();
        Double average = count > 0 ? sum / count : 0;

        return Map.of(
                "count", count,
                "sum", sum,
                "average", average
        );
    }
}