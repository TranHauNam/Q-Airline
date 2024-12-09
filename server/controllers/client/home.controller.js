module.exports.index = (req, res) => {
    const user = res.locals.user;
    res.json({
        user: user ? {
            fullName: user.fullName,
            email: user.email
        } : null,
    });
};
