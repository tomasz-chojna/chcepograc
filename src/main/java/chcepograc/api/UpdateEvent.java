package chcepograc.api;

import java.util.Date;

public class UpdateEvent {
    // TODO: Custom "MinLengthIfNotEmpty" validator


    private String name;

    private String price;

    private Date startTime;

    private Date endTime;

    private Integer maxParticipants;

    private String place;

    private String skillLevel;

    private String description;


    public String getName() {
        return name;
    }

    public String getPrice() {
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
}
