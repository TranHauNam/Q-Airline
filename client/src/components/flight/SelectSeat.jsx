import React, { useState } from 'react';
import './SelectSeat.css';

const SelectSeat = ({ selectedSeats, onSelectSeat }) => {
    // State để lưu ghế đã chọn
    const [selected, setSelected] = useState(selectedSeats || []);

    // Xử lý khi click vào ghế
    const handleSeatClick = (seatId) => {
        if (selected.includes(seatId)) {
            setSelected(selected.filter(id => id !== seatId));
            onSelectSeat(selected.filter(id => id !== seatId));
        } else {
            setSelected([...selected, seatId]);
            onSelectSeat([...selected, seatId]);
        }
    };

    // Render một ghế
    const SeatButton = ({ id, type = 'standard', status = 'available' }) => {
        const isSelected = selected.includes(id);
        const isOccupied = status === 'occupied';
        const isXL = type === 'XL';

        return (
            <button
                className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''} ${isXL ? 'xl' : ''}`}
                onClick={() => !isOccupied && handleSeatClick(id)}
                disabled={isOccupied}
            >
                {id}
            </button>
        );
    };

    return (
        <div className="select-seat-container">
            {/* Header */}
            <div className="seat-header">
                <div className="passenger-info">
                    <div className="passenger-name">Dang Quang</div>
                    <button className="clear-selection">Clear Selection</button>
                </div>
            </div>

            {/* Aircraft Layout */}
            <div className="aircraft-layout">
                <div className="front-label">Front of the Aircraft</div>

                {/* Row Labels */}
                <div className="row-labels">
                    <div>A</div>
                    <div>B</div>
                    <div>C</div>
                    <div>D</div>
                    <div>E</div>
                    <div>F</div>
                    <div>G</div>
                    <div>H</div>
                    <div>J</div>
                </div>

                {/* Seats Grid */}
                <div className="seats-grid">
                    {/* XL Seats Row */}
                    <div className="seat-row xl-row">
                        <div className="exit-row-label">
                            <span className="arrow">←</span>
                        </div>
                        <SeatButton id="11A" type="XL" />
                        <SeatButton id="11B" type="XL" />
                        <SeatButton id="11C" type="XL" />
                        <div className="aisle"></div>
                        <div className="aisle"></div>
                        <div className="aisle"></div>
                        <SeatButton id="11G" type="XL" />
                        <SeatButton id="11H" type="XL" />
                        <SeatButton id="11J" type="XL" />
                        <div className="exit-row-label">
                            <span className="arrow">→</span>
                        </div>
                    </div>

                    {/* Regular Seats */}
                    {Array.from({ length: 20 }, (_, i) => i + 12).map(row => (
                        <div key={row} className="seat-row">
                            <SeatButton id={`${row}A`} />
                            <SeatButton id={`${row}B`} />
                            <SeatButton id={`${row}C`} />
                            <div className="aisle"></div>
                            <SeatButton id={`${row}D`} />
                            <SeatButton id={`${row}E`} status="occupied" />
                            <SeatButton id={`${row}F`} />
                            <div className="aisle"></div>
                            <SeatButton id={`${row}G`} />
                            <SeatButton id={`${row}H`} />
                            <SeatButton id={`${row}J`} />
                        </div>
                    ))}

                    {/* Bottom XL Seats Row */}
                    <div className="seat-row xl-row">
                        <div className="exit-row-label">
                            <span className="arrow">←</span>
                        </div>
                        <SeatButton id="30A" type="XL" />
                        <SeatButton id="30B" type="XL" />
                        <SeatButton id="30C" type="XL" />
                        <div className="aisle"></div>
                        <div className="aisle"></div>
                        <div className="aisle"></div>
                        <SeatButton id="30G" type="XL" />
                        <SeatButton id="30H" type="XL" />
                        <SeatButton id="30J" type="XL" />
                        <div className="exit-row-label">
                            <span className="arrow">→</span>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="seat-legend">
                    <div className="legend-item">
                        <div className="legend-seat available"></div>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-seat occupied"></div>
                        <span>Occupied</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-seat selected"></div>
                        <span>Selected</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-seat xl"></div>
                        <span>Extra Legroom</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectSeat; 