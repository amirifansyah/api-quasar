
module.exports = {

    commonError:{
        error: true,
        message: 'Something went wrong'
    },
    commonErrorMessage: (message) => {
        return {
            error: true,
            message: message
        }
    },

    commonSuccess: {
        error: false,
        message: 'Success'
    },
    commonSuccessMessage: (message) => {
        return {
            error: true,
            message: message
        }
    },
    commonResult: (data) => {
        return {
            error: false,
            message: 'success get data',
            data: data
        }
    }
}
