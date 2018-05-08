package chcepograc;

import chcepograc.controllers.EventController;
import chcepograc.repositories.EventRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.core.StringContains.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@WebMvcTest(controllers = EventController.class)
public class EventAPITest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventRepository eventRepository;

    @Test
    @WithMockUser(roles="USER")
    public void testCreateClientSuccessfully() throws Exception {
        mockMvc.perform(get("/api/events"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Hello world")));
    }

//    @Test
//    public void shouldReturnAllEventsWhenNoFilteringParametersPassed() throws Exception {
//        String response = this.restTemplate.getForObject("/api/events/", String.class);
//        String expected = "[{id: 2}]";
//        JSONAssert.assertEquals(expected, response, false);
//    }
}