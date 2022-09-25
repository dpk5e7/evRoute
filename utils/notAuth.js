const isNotAuthenticated = (req, res, next) => {
  if (!req.session.logged_in) {
    next();
  } else {
    res.redirect("/dashboard");
  }
};

module.exports = isNotAuthenticated;
