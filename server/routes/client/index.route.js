const homeRoute = require("./home.route");
const userRoute = require("./user.route");
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(cookieParser());
    app.use("/api/home", homeRoute);
    app.use("/api/user", userRoute);
}