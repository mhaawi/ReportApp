package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Param;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Param.
 */
public interface ParamService {

    /**
     * Save a param.
     *
     * @param param the entity to save
     * @return the persisted entity
     */
    Param save(Param param);

    /**
     * Get all the params.
     *
     * @return the list of entities
     */
    List<Param> findAll();


    /**
     * Get the "id" param.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Param> findOne(Long id);

    /**
     * Delete the "id" param.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
