import React, { useState } from 'react';
import './Section.css'; // Thêm file CSS để style giao diện

const Section = () => {
  const [tripType, setTripType] = useState('roundTrip');

  return (
    <div className="flight-search-container">
      <div className="tab-menu">
        <button className="active">SEARCH FLIGHTS</button>
        <button>MANAGE BOOKING</button>
        <button>CHECK IN</button>
        <button>FLIGHT STATUS</button>
        <button className="special-offers">SPECIAL OFFERS</button>
      </div>

      <div className="search-options">
        <div className="trip-type">
          <label>
            <input
              type="radio"
              name="tripType"
              value="oneWay"
              checked={tripType === 'oneWay'}
              onChange={() => setTripType('oneWay')}
            />
            One Way
          </label>
          <label>
            <input
              type="radio"
              name="tripType"
              value="roundTrip"
              checked={tripType === 'roundTrip'}
              onChange={() => setTripType('roundTrip')}
            />
            Round Trip
          </label>
          <label>
            <input
              type="radio"
              name="tripType"
              value="multiCity"
              checked={tripType === 'multiCity'}
              onChange={() => setTripType('multiCity')}
            />
            Multi City
          </label>
        </div>

        <div className="search-fields">
          <div className="field">
            <label>FROM</label>
            <input type="text" placeholder="Enter departure city" />
          </div>
          <div className="field">
            <label>TO</label>
            <input type="text" placeholder="Enter destination city" />
          </div>
          <div className="field">
            <label>Depart</label>
            <input type="date" />
          </div>
          <div className="field">
            <label>Return</label>
            <input type="date" disabled={tripType === 'oneWay'} />
          </div>
          <div className="field">
            <label>Passengers</label>
            <select>
              <option>Adult 1</option>
              <option>Adult 2</option>
              <option>Adult 3</option>
            </select>
          </div>
          <div className="field">
            <label>Class</label>
            <select>
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
          <div className="field">
            <label>Pay By</label>
            <select>
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Points</option>
            </select>
          </div>
          <div className="field">
            <label>Concession Type</label>
            <select>
              <option>None</option>
              <option>Student</option>
              <option>Senior Citizen</option>
            </select>
          </div>
        </div>

        <div className="promo-code">
          <button>+ Add Promo Code</button>
        </div>

        <button className="search-button">Search</button>
      </div>
    </div>
  );
};

export default Section;
