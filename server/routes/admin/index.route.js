const dashboardRoute = require("../admin/dashboard.route");
const flightRoute = require("../admin/flight.route");
//const cookieParser = require('cookie-parser');

module.exports = (app) => {
    //app.use(cookieParser());
    app.use("/api/admin/dashboard", dashboardRoute);
    app.use("/api/admin/flight", flightRoute);
}