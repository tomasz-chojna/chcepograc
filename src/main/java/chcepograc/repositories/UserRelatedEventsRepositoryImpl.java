package chcepograc.repositories;

import chcepograc.models.Event;
import chcepograc.models.User;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Transactional(readOnly = true)
public class UserRelatedEventsRepositoryImpl implements UserRelatedEventsRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Event> findAll(User user, String type) {
        if (type.equals("participated")) {
            Query query = entityManager.createNativeQuery("select e.* from events e\n"
                    + "join event_participants participant on e.id = participant.event_id\n"
                    + "where participant.user_id = ? ", Event.class);
            query.setParameter(1, user.getId());

            return query.getResultList();
        }


        // organized
        Query query = entityManager.createNativeQuery("select e.* from events e where e.owner = ? ", Event.class);
        query.setParameter(1, user.getId());

        return query.getResultList();
    }
}