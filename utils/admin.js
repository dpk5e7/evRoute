const isAdmin = (req, res, next) => {
  if (req.session.is_admin) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = isAdmin;
