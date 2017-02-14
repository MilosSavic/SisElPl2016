package rs.ac.uns.ftn.sep2016.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import rs.ac.uns.ftn.sep2016.model.entity.TransactionOrder;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<TransactionOrder, Long> {

}
