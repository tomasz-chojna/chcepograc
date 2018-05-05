package chcepograc.models;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String name;

    private String price;

    private Date start;

    private Date end;

    @Column(name = "max_participants")
    private String maxParticipants;

    private String place;

    @Column(name = "skill_level")
    private String skillLevel;

    private String description;

    @Fetch(FetchMode.JOIN)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner", nullable = false)
    private User owner;

    @Fetch(FetchMode.JOIN)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_type", nullable = false)
    private EventType eventType;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPrice() {
        return price;
    }

    public Date getStart() {
        return start;
    }

    public Date getEnd() {
        return end;
    }

    public String getMaxParticipants() {
        return maxParticipants;
    }

    public String getPlace() {
        return place;
    }

    public String getSkillLevel() {
        return skillLevel;
    }

    public String getDescription() {
        return description;
    }

    public User getOwner() {
        return owner;
    }

    public EventType getEventType() {
        return eventType;
    }
}
