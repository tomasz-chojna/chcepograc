package chcepograc.models;

import chcepograc.api.CreateEvent;
import chcepograc.api.UpdateEvent;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Integer id;

    private String name;

    private BigDecimal price;

    @DateTimeFormat
    @NotNull
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date startTime;

    @DateTimeFormat
    @NotNull
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date endTime;

    private Integer maxParticipants;

    private String place;

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

    public Event populate(CreateEvent data) {
        this.setName(data.getName());
        this.setPrice(new BigDecimal(data.getPrice()));
        this.setPlace(data.getPlace());
        this.setMaxParticipants(data.getMaxParticipants());
        this.setStartTime(data.getStartTime());
        this.setEndTime(data.getEndTime());
        this.setSkillLevel(data.getSkillLevel());
        this.setDescription(data.getDescription());

        return this;
    }

    public Event populate(UpdateEvent data) {
        this.setName(Optional.ofNullable(data.getName()).orElse(getName()));
//        this.setPrice(Optional.ofNullable(data.getPrice()).orElse(getPrice()));
        this.setPlace(Optional.ofNullable(data.getPlace()).orElse(getPlace()));
        this.setMaxParticipants(Optional.ofNullable(data.getMaxParticipants()).orElse(getMaxParticipants()));
        this.setStartTime(Optional.ofNullable(data.getStartTime()).orElse(getStartTime()));
        this.setEndTime(Optional.ofNullable(data.getEndTime()).orElse(getEndTime()));
        this.setSkillLevel(Optional.ofNullable(data.getSkillLevel()).orElse(getSkillLevel()));
        this.setDescription(Optional.ofNullable(data.getDescription()).orElse(getDescription()));

        return this;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public Integer getMaxParticipants() {
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

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public void setSkillLevel(String skillLevel) {
        this.skillLevel = skillLevel;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Event setOwner(User owner) {
        this.owner = owner;

        return this;
    }

    public Event setEventType(EventType eventType) {
        this.eventType = eventType;

        return this;
    }
}
