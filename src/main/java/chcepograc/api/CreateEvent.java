package chcepograc.api;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class CreateEvent {
    @Length(min = 3)
    private String name;

    @NotBlank
    @NumberFormat(style = NumberFormat.Style.CURRENCY)
    private String price;

    @DateTimeFormat
    @NotNull
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date startTime;

    @DateTimeFormat
    @NotNull
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date endTime;

    @NumberFormat(style = NumberFormat.Style.NUMBER)
    private Integer maxParticipants;

    @NotBlank
    @Length(min = 3)
    private String place;

    private String skillLevel;

    private String description;

    @NotNull
    @NumberFormat
    private Integer eventTypeId;


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

    public Integer getEventTypeId() {
        return eventTypeId;
    }
}
