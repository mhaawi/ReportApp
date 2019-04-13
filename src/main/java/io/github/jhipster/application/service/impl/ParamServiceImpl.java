package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.ParamService;
import io.github.jhipster.application.domain.Param;
import io.github.jhipster.application.repository.ParamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Param.
 */
@Service
@Transactional
public class ParamServiceImpl implements ParamService {

    private final Logger log = LoggerFactory.getLogger(ParamServiceImpl.class);

    private final ParamRepository paramRepository;

    public ParamServiceImpl(ParamRepository paramRepository) {
        this.paramRepository = paramRepository;
    }

    /**
     * Save a param.
     *
     * @param param the entity to save
     * @return the persisted entity
     */
    @Override
    public Param save(Param param) {
        log.debug("Request to save Param : {}", param);
        return paramRepository.save(param);
    }

    /**
     * Get all the params.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Param> findAll() {
        log.debug("Request to get all Params");
        return paramRepository.findAll();
    }


    /**
     * Get one param by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Param> findOne(Long id) {
        log.debug("Request to get Param : {}", id);
        return paramRepository.findById(id);
    }

    /**
     * Delete the param by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Param : {}", id);
        paramRepository.deleteById(id);
    }
}
