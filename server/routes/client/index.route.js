const homeRoute = require("./home.route");
const userRoute = require("./user.route");
const flightRoute = require("./flight.route");
const bookingRoute = require("./booking.route");
const postRoute = require("./post.route");
const userMiddleware = require("../../middlewares/user.middleware");
const authClientMiddleware = require("../../middlewares/authClient.middleware");
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(userMiddleware.infoUser);
    app.use("/api/home", homeRoute);
    app.use("/api/user", userRoute);
    app.use("/api/flight", flightRoute);
    app.use("/api/post", postRoute);
    app.use("/api/booking", authClientMiddleware.verifyToken, bookingRoute);
}