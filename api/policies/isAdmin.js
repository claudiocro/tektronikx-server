module.exports = function(req, res, next) {
  if(req.user.userType !== 3){
    return res.status(500).send({
      message: 'Request is not authorized' + req.user.userType
    });
  } else {
    next();
  }
};
