export default {
  requestError: (error, req, res, next) => {
    
    if (error.status) {
      res.status(error.status || 500).send({
        error: {
          status: error.status || 500,
          message: error.message || 'Ha ocurrido un error. Intente más tarde',
        }
      })
    }
  }
}