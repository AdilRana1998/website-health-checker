const ErrorHandling = {};


ErrorHandling.sequelError = (errors = []) => {
    const messages = {}
    let message = "";
    errors.forEach(e => {
        console.log("validatorKey", e.validatorKey)
        switch (e.validatorKey) {
            case 'not_unique':
                message = `Duplicate ${e.path}`
                break;
            case 'isIn':
                message = `Given ${e.path} value is not allowed`
                break;
            default : 
                message = `Validation for ${e.path}`
        }
        messages[e.path] = message
    })
    return message;
}

module.exports = ErrorHandling;