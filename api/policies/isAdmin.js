module.exports = function(req, res, next) {
  if(!req.user.isAdmin()){
    res.status(500).send('Something broke!');
    return res.status(401).send({
      message: 'Request is not authorized'
    });
  } else {
    next();
  }
};
