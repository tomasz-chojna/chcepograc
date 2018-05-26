package chcepograc.repositories;

import chcepograc.models.Event;
import chcepograc.models.User;

import java.util.List;

public interface UserRelatedEventsRepository {
    List<Event> findAll(User user, String type);
//    List<Event> findByOwner(User user);

}