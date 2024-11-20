module.exports.index = (req, res) => {
    const user = res.locals.user;
    console.log(user.token);
    res.json({
        user: user ? {
            fullName: user.fullName,
            email: user.email
        } : null,
    });
};
