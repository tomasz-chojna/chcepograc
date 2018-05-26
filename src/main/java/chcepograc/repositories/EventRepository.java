package chcepograc.repositories;

import chcepograc.models.Event;
import org.springframework.data.repository.CrudRepository;

public interface EventRepository extends CrudRepository<Event, Integer>, UserRelatedEventsRepository {
//    Iterable<Event> findAll(User user, String type);
}
