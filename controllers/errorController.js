const errorCont = {}

/* ***************************
 *  Intentionally cause 500 error
 * ************************** */
errorCont.triggerError = async function (req, res, next) {
  const error = new Error("This is an intentional 500 error for testing purposes")
  error.status = 500
  next(error)
}

module.exports = errorCont
