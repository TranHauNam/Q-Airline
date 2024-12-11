const homeRoute = require("./home.route");
const userRoute = require("./user.route");
const flightRoute = require("./flight.route");
const bookingRoute = require("./booking.route");
const userMiddleware = require("../../middlewares/user.middleware");
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(userMiddleware.infoUser);
    app.use("/api/home", homeRoute);
    app.use("/api/user", userRoute);
    app.use("/api/flight", flightRoute);
    app.use("/api/booking", bookingRoute);
}