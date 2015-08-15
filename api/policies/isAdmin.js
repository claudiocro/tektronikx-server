module.exports = function(req, res, next) {
  if(!req.user.userType !== 3){
    res.status(500).send('Something broke!');
    return res.status(401).send({
      message: 'Request is not authorized'
    });
  } else {
    next();
  }
};
