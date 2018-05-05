package chcepograc.models;

import javax.persistence.*;

@Entity
@Table(name = "event_types")
public class EventType {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String name;

    private String image;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getImage() {
        return image;
    }
}
