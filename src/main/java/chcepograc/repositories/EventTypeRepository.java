package chcepograc.repositories;

import chcepograc.models.User;
import org.springframework.data.repository.CrudRepository;

public interface EventTypeRepository extends CrudRepository<User, Long> {
}
