module.exports.index = (req, res) => {
  res.json({
      pageTitle: "Home",
      message: "Welcome to the home page!",
      users: ['John', 'Jane', 'Bob']
  });
};
