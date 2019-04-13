package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Param;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Param entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParamRepository extends JpaRepository<Param, Long> {

}
