module.exports.generateSeats = (availableSeatsEconomy, availableSeatsPremiumEconomy, availableSeatsBusiness, availableSeatsFirst) => {
    const seats = [];

    var start = 1;

    const numberOfFirstRows = availableSeatsFirst / 4;
    const firstRows = [];
    for (let i = 0; i < numberOfFirstRows; i++) {
        firstRows.push(start + i);
    }
    start += numberOfFirstRows;
    const firstCols = ['A', 'C', 'D', 'F'];
    for (const row of firstRows) {
        for (const col of firstCols) {
            seats.push({
                seatNumber: `${row}${col}`,
                classType: 'First',
                isBooked: false
            });
        }
    }

    const numberOfBusinessRows = availableSeatsBusiness / 4;
    const businessRows = [];
    for (let i = 0; i < numberOfBusinessRows; i++) {
        businessRows.push(start + i);
    }
    start += numberOfBusinessRows;
    const businessCols = ['A', 'C', 'D', 'F'];
    for (const row of businessRows) {
        for (const col of businessCols) {
            seats.push({
                seatNumber: `${row}${col}`,
                classType: 'Business',
                isBooked: false
            });
        }
    }

    const numberOfPremiumEconomyRows = availableSeatsPremiumEconomy / 6;
    const premiumEconomyRows = [];
    for (let i = 0; i < numberOfPremiumEconomyRows; i++) {
        premiumEconomyRows.push(start + i);
    }
    start += numberOfPremiumEconomyRows;
    const premiumEconomyCols = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (const row of premiumEconomyRows) {
        for (const col of premiumEconomyCols) {
            seats.push({
                seatNumber: `${row}${col}`,
                classType: 'Premium Economy',
                isBooked: false
            });
        }
    }

    const numberOfEconomyRows = availableSeatsEconomy / 6;
    const economyRows = [];
    for (let i = 0; i < numberOfEconomyRows; i++) {
        economyRows.push(start + i);
    }
    const economyCols = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (const row of economyRows) {
        for (const col of economyCols) {
            seats.push({
                seatNumber: `${row}${col}`,
                classType: 'Economy',
                isBooked: false
            });
        }
    }

    return seats;
}
