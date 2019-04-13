package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Param;
import io.github.jhipster.application.service.ParamService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Param.
 */
@RestController
@RequestMapping("/api")
public class ParamResource {

    private final Logger log = LoggerFactory.getLogger(ParamResource.class);

    private static final String ENTITY_NAME = "param";

    private final ParamService paramService;

    public ParamResource(ParamService paramService) {
        this.paramService = paramService;
    }

    /**
     * POST  /params : Create a new param.
     *
     * @param param the param to create
     * @return the ResponseEntity with status 201 (Created) and with body the new param, or with status 400 (Bad Request) if the param has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/params")
    public ResponseEntity<Param> createParam(@Valid @RequestBody Param param) throws URISyntaxException {
        log.debug("REST request to save Param : {}", param);
        if (param.getId() != null) {
            throw new BadRequestAlertException("A new param cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Param result = paramService.save(param);
        return ResponseEntity.created(new URI("/api/params/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /params : Updates an existing param.
     *
     * @param param the param to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated param,
     * or with status 400 (Bad Request) if the param is not valid,
     * or with status 500 (Internal Server Error) if the param couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/params")
    public ResponseEntity<Param> updateParam(@Valid @RequestBody Param param) throws URISyntaxException {
        log.debug("REST request to update Param : {}", param);
        if (param.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Param result = paramService.save(param);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, param.getId().toString()))
            .body(result);
    }

    /**
     * GET  /params : get all the params.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of params in body
     */
    @GetMapping("/params")
    public List<Param> getAllParams() {
        log.debug("REST request to get all Params");
        return paramService.findAll();
    }

    /**
     * GET  /params/:id : get the "id" param.
     *
     * @param id the id of the param to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the param, or with status 404 (Not Found)
     */
    @GetMapping("/params/{id}")
    public ResponseEntity<Param> getParam(@PathVariable Long id) {
        log.debug("REST request to get Param : {}", id);
        Optional<Param> param = paramService.findOne(id);
        return ResponseUtil.wrapOrNotFound(param);
    }

    /**
     * DELETE  /params/:id : delete the "id" param.
     *
     * @param id the id of the param to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/params/{id}")
    public ResponseEntity<Void> deleteParam(@PathVariable Long id) {
        log.debug("REST request to delete Param : {}", id);
        paramService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
