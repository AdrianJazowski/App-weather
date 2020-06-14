import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";

const APIKey = "ed20c2b245e8ccc71f8fb233f735b5d9";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: "",
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // Sposób z wykorzystaniem obsługi przycisku wysyłającego zapytanie do bazy
  // handleCitySubmit = e =>{
  //   e.preventDefault()

  //   const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`

  //   fetch(API)
  //   .then(response => {
  //     if(response.ok){
  //       return response
  //     }
  //     throw Error('Nie udało się')
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     const time = new Date().toLocaleString()
  //     this.setState(state =>({
  //       date: time,
  //       city: state.value,
  //       sunrise: data.sys.sunrise,
  //       sunset: data.sys.sunset,
  //       temp: data.main.temp,
  //       pressure: data.main.pressure,
  //       wind: data.wind.speed,
  //       err: false
  //       }))
  //     })
  //   .catch(err => {
  //     console.log(err)
  //     this.setState(praveState=>({
  //     err: true,
  //     city: praveState.value
  //     }))
  //   })
  // }

  // Obsługa zapytania bez przycisku wyślij
  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;

    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;

      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("Nie udało się");
        })
        .then((response) => response.json())
        .then((data) => {
          const time = new Date().toLocaleString();
          this.setState((state) => ({
            date: time,
            city: state.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            err: false,
          }));
        })
        .catch((err) => {
          console.log(err);
          this.setState((praveState) => ({
            err: true,
            city: praveState.value,
          }));
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Form value={this.state.value} change={this.handleInputChange} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
