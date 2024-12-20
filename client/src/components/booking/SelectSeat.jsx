import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SelectSeat.css';

const SelectSeat = ({ selectedSeats, onSelectSeat, flight }) => {
    const location = useLocation();
    const { selectedClass } = location.state || {};
    const [selected, setSelected] = useState(selectedSeats || []);
    const [seatMap, setSeatMap] = useState({
        first: [],
        business: [],
        premium: [],
        economy: []
    });

    useEffect(() => {
        if (!flight || !flight.seats) return;
        
        // Nhóm ghế theo class
        const groupedSeats = flight.seats.reduce((acc, seat) => {
            const classType = seat.classType.toLowerCase();
            acc[classType] = [...(acc[classType] || []), seat];
            return acc;
        }, {});

        setSeatMap(groupedSeats);
    }, [flight]);

    const handleSeatClick = (seatNumber, seatClass) => {
        // Chỉ cho phép chọn ghế cùng loại với selectedClass
        if (!seatClass || !selectedClass || 
            seatClass.toLowerCase() !== selectedClass.toLowerCase()) {
            return;
        }

        if (selected.includes(seatNumber)) {
            setSelected(selected.filter(id => id !== seatNumber));
            onSelectSeat(selected.filter(id => id !== seatNumber));
        } else {
            setSelected([...selected, seatNumber]);
            onSelectSeat([...selected, seatNumber]);
        }
    };

    const SeatButton = ({ seatData }) => {
        const isSelected = selected.includes(seatData.seatNumber);
        const isOccupied = seatData.isBooked;
        const classType = seatData.classType.toLowerCase();
        const isWrongClass = !selectedClass || classType !== selectedClass.toLowerCase();

        return (
            <button
                className={`seat ${isSelected ? 'selected' : ''} 
                          ${isOccupied ? 'occupied' : ''}
                          ${isWrongClass ? 'wrong-class' : ''}
                          ${classType}`}
                onClick={() => !isOccupied && !isWrongClass && handleSeatClick(seatData.seatNumber, seatData.classType)}
                disabled={isOccupied || isWrongClass}
                title={`${seatData.seatNumber} - ${seatData.classType} Class${isOccupied ? ' (Already Booked)' : ''}${isWrongClass ? ' (Not Available for Your Class)' : ''}`}
            >
                {seatData.seatNumber}
            </button>
        );
    };

    const renderSeatRow = (rowNumber) => {
        if (!flight || !flight.seats) return null;

        const rowSeats = flight.seats.filter(seat => 
            seat.seatNumber.startsWith(rowNumber.toString())
        );

        if (rowSeats.length === 0) return null;

        return (
            <div key={rowNumber} className="seat-row">
                <div className="row-number">{rowNumber}</div>
                <div className="seat-group left">
                    {['A', 'B', 'C'].map(letter => {
                        const seat = rowSeats.find(s => s.seatNumber === `${rowNumber}${letter}`);
                        return seat ? (
                            <SeatButton 
                                key={seat.seatNumber} 
                                seatData={seat}
                            />
                        ) : <div key={letter} className="seat-placeholder"></div>;
                    })}
                </div>
                <div className="aisle"></div>
                <div className="seat-group right">
                    {['D', 'E', 'F'].map(letter => {
                        const seat = rowSeats.find(s => s.seatNumber === `${rowNumber}${letter}`);
                        return seat ? (
                            <SeatButton 
                                key={seat.seatNumber} 
                                seatData={seat}
                            />
                        ) : <div key={letter} className="seat-placeholder"></div>;
                    })}
                </div>
            </div>
        );
    };

    // Lấy tất cả các số hàng từ dữ liệu ghế
    const rowNumbers = flight && flight.seats ? [...new Set(flight.seats.map(seat => 
        parseInt(seat.seatNumber.match(/\d+/)[0])
    ))].sort((a, b) => a - b) : [];

    if (!flight || !flight.seats) {
        return (
            <div className="select-seat-container">
                <div className="loading-message">Loading seat map...</div>
            </div>
        );
    }

    return (
        <div className="select-seat-container">
            <div className="seat-header">
                <div className="header-info">
                    <h2 className="section-title">Select Your Seat</h2>
                    <p className="class-info">Selected Class: {selectedClass}</p>
                </div>
                <div className="passenger-info">
                    <button className="clear-selection" onClick={() => {
                        setSelected([]);
                        onSelectSeat([]);
                    }}>
                        Clear Selection
                    </button>
                </div>
            </div>

            <div className="aircraft-layout">
                <div className="front-label">
                    <div className="plane-nose"></div>
                    <span>Front of the Aircraft</span>
                </div>

                <div className="seat-letters">
                    <div className="letter-group">
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                    </div>
                    <div className="letter-group">
                        <span>D</span>
                        <span>E</span>
                        <span>F</span>
                    </div>
                </div>

                <div className="seats-grid">
                    {rowNumbers.map(rowNumber => renderSeatRow(rowNumber))}
                </div>

                <div className="seat-info">
                    <div className="selected-seats">
                        {selected.length > 0 ? (
                            <>
                                <span>Selected Seats:</span>
                                <div className="seat-numbers">
                                    {selected.map(seat => (
                                        <span key={seat} className="seat-tag">{seat}</span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <span>No seats selected</span>
                        )}
                    </div>
                </div>

                <div className="seat-legend">
                    <div className="legend-item">
                        <div className="legend-seat available"></div>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-seat occupied"></div>
                        <span>Already Booked</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-seat wrong-class"></div>
                        <span>Not Available for Your Class</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-seat selected"></div>
                        <span>Your Selection</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectSeat; 