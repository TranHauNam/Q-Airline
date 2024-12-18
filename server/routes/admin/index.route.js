//const dashboardRoute = require("../admin/dashboard.route");\
const adminRoute = require("../admin/admin.route");
const flightRoute = require("../admin/flight.route");
const bookingRoute = require("../admin/booking.route");
const postRoute = require("../admin/post.route");
const planeRoute = require("../admin/plane.route");
const authAdminMiddleware = require("../../middlewares/authAdmin.middleware");


//const cookieParser = require('cookie-parser');

module.exports = (app) => {
    //app.use(cookieParser());
    //app.use("/api/admin/dashboard", dashboardRoute);
    app.use("/api/admin/account", adminRoute);
    app.use("/api/admin/flight", authAdminMiddleware.verifyToken, flightRoute);
    app.use("/api/admin/booking", authAdminMiddleware.verifyToken, bookingRoute);
    app.use("/api/admin/post", authAdminMiddleware.verifyToken, postRoute);
    app.use("/api/admin/plane", authAdminMiddleware.verifyToken, planeRoute);
}