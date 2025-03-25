const createError = require('http-errors');

const errorHandle = (error, req, res, next) => {
   res.status(error.status || 500);
   res.send({
         error: {
              status: error.status || 500,
              message: error.message,
         }
   })
};

module.exports = errorHandle;