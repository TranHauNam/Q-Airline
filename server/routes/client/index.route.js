const homeRoute = require("./home.route");
const userRoute = require("./user.route");

module.exports = (app) => {
    app.use("/api/home", homeRoute);
    app.use("/api/user", userRoute);
}