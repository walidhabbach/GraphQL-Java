package com.example.graphql.repositories;

import com.example.graphql.entities.Compte;
import com.example.graphql.enums.TypeCompte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompteRepository extends JpaRepository<Compte, Long> {
    @Query("SELECT SUM(c.solde) FROM Compte c")
    double sumSoldes();

    List<Compte> findByType(TypeCompte type);

}
