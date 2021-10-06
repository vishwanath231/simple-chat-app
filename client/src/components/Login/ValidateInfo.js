
const ValidateInfo = (values) => {

    let error = {};

    if (!values.username) {
        error.username = "Username required.";
    }

    if (!values.room) {
        error.room = "Room ID required."
    }

    return error;
}

export default ValidateInfo;
