import React, { Component } from "react";
import AutoComplete from "./AutoComplete";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

class Taxi extends Component {
  constructor() {
    super();
    this.state={
      names: ["Adambakkam",
      "Adyar",
      "Alandur",
      "Alwarthirunagar",
      "Ambattur",
      "George Town",
      "Gopalapuram",
      "Government Estate",
      "Guindy",
      "Guduvancheri",
      ],km:[10, 4, 20, 5, 13, 10, 7, 9, 15,18],
      from: "", // Selected "From" location
      to: "",// Selected "To" location
      carType: 15,  // Default car type value (Hatchback)
      bookingSuccess: false, // Booking success status
      bookingID: "",
      selectedDateTime: null, // Random booking ID
    };
  }

  handleFromChange = (selectedFrom) => {
    this.setState({ from: selectedFrom });
  };

  handleToChange = (selectedTo) => {
    this.setState({ to: selectedTo });
  };

  calculateDistance = () => {
    const { names, from, to } = this.state;
    const fromIndex = names.indexOf(from);
    const toIndex = names.indexOf(to);
    if (fromIndex !== -1 && toIndex !== -1) {
      return Math.abs(toIndex - fromIndex);
    }
    return null;
  };

  calculateAmount = () => {
    const { carType } = this.state;
    const distance = this.calculateDistance();
    if (distance !== null) {
      return distance * carType;
    }
    return null;
  };

  getCarType = (e) => {
    const carType = parseInt(e.target.value, 10);
    this.setState({ carType });
  };

  handleBookNow = () => {
    const { from, to } = this.state;

    if (from === "" || to === "") {
      alert("Please select both 'From' and 'To' locations.");
      return;
    }
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const idLength = 10;
  
    let randomID = "";
    for (let i = 0; i < idLength; i++) {
      if (i % 2 === 0) {
        randomID += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      } else {
        randomID += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
    }
  
    this.setState({ bookingSuccess: true, bookingID: randomID });
  };
  handleDateTimeChange = selectedDateTime => {
    this.setState({ selectedDateTime });
  };


  render() {
    const { names, from, to,selectedDateTime, bookingSuccess, bookingID } = this.state;

    return (
      <>
        <div className="css">
          <label>From:</label>
          <AutoComplete suggestions={names} onSelect={this.handleFromChange} />
          <label>To:</label>
          <AutoComplete suggestions={names} onSelect={this.handleToChange} />
          <label>Date & Time:</label>
          <Datetime onChange={this.handleDateTimeChange} />
          <label>Type:</label>
          <select style={{ width: "170px" }} onChange={this.getCarType}>
            <option id="1" value={15}>
              Hatchback Rs. 15/km
            </option>
            <option id="2" value={20}>
              Sedan cars Rs20/km
            </option>
            <option id="3" value={30}>
              SUV cars Rs30/km
            </option>
          </select>
          
          <p>Distance: {this.calculateDistance()}</p>
          <p>Amount: {this.calculateAmount()}</p>
          <input
            style={{ width: "100px" }}
            type="button"
            value={"Book Now"}
            onClick={this.handleBookNow}
          />
        </div>

        {bookingSuccess && (
          <div>
            <p>Your Booking From {from} to {to} Successful!</p>
            <p>Your Cab will arrive on or before {selectedDateTime && selectedDateTime.toString()}</p>
            <p>Booking ID: {bookingID}</p>
          </div>
        )}

      </>
    );
  }
}

export default Taxi;

