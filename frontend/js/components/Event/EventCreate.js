import React from 'react';
import {Redirect} from "react-router-dom";

export default class EventCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Jakaś nazwa",
            sport: 1,
            price: "10zł",
            location: "Lokacja",
            city: "Miasto",
            dateStart: "2018-05-09",
            timeStart: "17:30",
            dateEnd: "2018-05-09",
            timeEnd: "20:00",
            vacancies: 3,
            requiredLevel: 1,
            otherRequirements: "LOL",
            description: "Deskrypcja",
            ajaxStatus: {
                isLoaded: false,
                response: null
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.state;

        fetch("/api/events/", {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "name": data.name,
                "price": data.price,
                "maxParticipants": data.vacancies,
                "place": `${data.location}, ${data.city}`,
                "skillLevel": data.requiredLevel,
                "description": `${data.description}\n${data.otherRequirements}`,
                "eventTypeId": data.sport,
                "startTime": `${data.dateStart}T${data.timeStart}`,
                "endTime": `${data.dateEnd}T${data.timeEnd}`,
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const status = {
                        isLoaded: true,
                        success: !result.hasOwnProperty('error'),
                        response: result
                    };
                    this.setState({
                        ajaxStatus: status
                    });

                    if (!status.success) {
                        alert("Formularz zawiera błędy, proszę je poprawić.")
                        // alert(`${result.status} - ${result.error}: ${result.message}\nPopraw formularz.`);
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        ajaxStatus: {
                            isLoaded: true,
                            success: false,
                            error
                        }
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, response, success} = this.state.ajaxStatus;

        if (error/* || (isLoaded && !success)*/) {
            return <div>Error: {error.message}</div>;
        } else if (isLoaded && success) {
            return <Redirect to={`/events/${response.id}`}/>;
        } else {
            return (
                <div>
                    <div className="py-5 text-center">
                        <h2>Zorganizuj wydarzenie</h2>
                        <p className="lead">Zaplanuj i utwórz wydarzenie sportowe podając podane w formularzu wytyczne.
                            Po
                            wysłaniu formularza organizowane
                            przez Ciebie wydarzenie zostanie automatycznie dodane do systemu.</p>
                    </div>
                    <div className="my-3 p-3 bg-white rounded box-shadow">
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="mb-3">Specyfika wydarzenia</h4>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name">Nazwa wydarzenia</label>
                                            <input type="text" className="form-control" name="name" id="name"
                                                   placeholder="Gierka w piątek"
                                                   value={this.state.name}
                                                   onChange={this.handleInputChange}
                                                   required/>
                                            <div className="invalid-feedback">
                                                Wpisz poprawną nazwę.
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="sport">Sport</label>
                                            <select className="custom-select d-block w-100" name="sport" id="sport"
                                                    required
                                                    value={this.state.sport}
                                                    onChange={this.handleInputChange}
                                            >
                                                <option value="">Wybierz...</option>
                                                <option value="1" selected>Siatkówka</option>
                                                <option value="2">Piłka nożna</option>
                                                <option value="3">Koszykówka</option>
                                                <option value="4">Squash</option>
                                                <option value="5">Tenis</option>
                                                <option value="6">Taniec</option>
                                            </select>
                                            <div className="invalid-feedback">
                                                Wybierz sport.
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="price">Koszt uczestnictwa</label>
                                            <input type="text" className="form-control" name="price" id="price"
                                                   placeholder="10 zł" required
                                                   value={this.state.price}
                                                   onChange={this.handleInputChange}
                                            />
                                            <div className="invalid-feedback">
                                                Podaj koszt uczestnictwa
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="location">Lokalizacja</label>
                                            <input type="text" className="form-control" name="location" id="location"
                                                   placeholder="Sala sportowa na ul. Sportowej" required
                                                   value={this.state.location}
                                                   onChange={this.handleInputChange}
                                            />
                                            <div className="invalid-feedback">
                                                Wpisz lokalizację.
                                            </div>
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <label htmlFor="city">Miasto</label>
                                            <input type="text" className="form-control" name="city" id="city"
                                                   placeholder="Kraków"
                                                   required
                                                   value={this.state.city}
                                                   onChange={this.handleInputChange}
                                            />
                                            <div className="invalid-feedback">
                                                Wpisz miasto.
                                            </div>
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <label htmlFor="dateStart">Rozpoczęcie</label>
                                            <input type="text" className="form-control" name="dateStart" id="dateStart"
                                                   placeholder="15.05.2018"
                                                   required
                                                   value={this.state.dateStart}
                                                   onChange={this.handleInputChange}
                                            />
                                            <div className="invalid-feedback">
                                                Wpisz poprawną datę.
                                            </div>
                                        </div>
                                        <div className="col-md-1 mb-3">
                                            <label htmlFor="timeStart">Godzina</label>
                                            <input type="text" className="form-control" name="timeStart" id="timeStart"
                                                   placeholder="15:30"
                                                   required
                                                   value={this.state.timeStart}
                                                   onChange={this.handleInputChange}
                                            />
                                            <div className="invalid-feedback">
                                                Wpisz poprawną godzinę.
                                            </div>
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <label htmlFor="dateEnd">Zakończenie</label>
                                            <input type="text" className="form-control" name="dateEnd" id="dateEnd"
                                                   placeholder="15.05.2018"
                                                   required
                                                   value={this.state.dateEnd}
                                                   onChange={this.handleInputChange}
                                            />
                                            <div className="invalid-feedback">
                                                Wpisz poprawną datę.
                                            </div>
                                        </div>
                                        <div className="col-md-1 mb-3">
                                            <label htmlFor="timeEnd">Godzina</label>
                                            <input type="text" className="form-control" name="timeEnd" id="timeEnd"
                                                   placeholder="17:30"
                                                   required
                                                   value={this.state.timeEnd}
                                                   onChange={this.handleInputChange}
                                            />
                                            <div className="invalid-feedback">
                                                Wpisz poprawną godzinę.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2 mb-3">
                                            <label htmlFor="vacancies">Liczba miejsc</label>
                                            <input type="text" className="form-control" name="vacancies" id="vacancies"
                                                   placeholder="10 osób"
                                                   required
                                                   value={this.state.vacancies}
                                                   onChange={this.handleInputChange}
                                            />
                                            <div className="invalid-feedback">
                                                Podaj poprawną ilość wymaganych osób
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="requiredLevel">Wymagany poziom</label>
                                            <select className="custom-select d-block w-100" name="requiredLevel"
                                                    id="requiredLevel"
                                                    required
                                                    value={this.state.requiredLevel}
                                                    onChange={this.handleInputChange}
                                            >
                                                <option value="">Brak</option>
                                                <option value="1" selected>Nowy</option>
                                                <option value="2">Rekreacyjny</option>
                                                <option value="3">Zaawansowany początkujący</option>
                                                <option value="4">Średnio zaawansowany</option>
                                                <option value="5">Zaawansowany</option>
                                                <option value="6">Gracze lig amatorskich</option>
                                                <option value="7">Najwyższy poziom wtajemniczenia</option>
                                            </select>
                                            <div className="invalid-feedback">
                                                Wybierz wymagany poziom.
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="otherRequirements">Inne wymagania</label>
                                            <textarea className="form-control" name="otherRequirements"
                                                      id="otherRequirements" placeholder="Np. Buty z jasną podeszwą"
                                                      value={this.state.otherRequirements}
                                                      onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label htmlFor="description">Opis wydarzenia</label>
                                                <textarea className="form-control" name="description" id="description"
                                                          placeholder="Np. Zapraszamy osoby chętne do gierki w miłej atmosferze."
                                                          value={this.state.description}
                                                          onChange={this.handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit">Utwórz wydarzenie
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}