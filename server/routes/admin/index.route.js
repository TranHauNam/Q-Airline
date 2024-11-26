const dashboardRoute = require("../admin/dashboard.route");
const flightRoute = require("../admin/flight.route");
const bookingRoute = require("../admin/booking.route");
const postRoute = require("../admin/post.route");
const planeRoute = require("../admin/plane.route");

//const cookieParser = require('cookie-parser');

module.exports = (app) => {
    //app.use(cookieParser());
    app.use("/api/admin/dashboard", dashboardRoute);
    app.use("/api/admin/flight", flightRoute);
    app.use("/api/admin/booking", bookingRoute);
    app.use("/api/admin/post", postRoute);
    app.use("/api/admin/plane", planeRoute);
}