import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const useForm = ( ValidateInfo, socket ) => {


    const [values, setValues] = useState({
        username: '',
        room: ''
    })
    const [error, setError] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        })
    }

    const history = useHistory()

    const submitHandle = (e) => {
        e.preventDefault();

        setError(ValidateInfo(values))
        setIsSubmitting(true);

        if (Object.keys(error).length === 0 && isSubmitting) {
            
            history.push(`/chat?name=${values.username}`);

            socket.emit("joinRoom", { username:values.username, room:values.room});
        }

    }


    return { handleChange, submitHandle, values, error }
}

export default useForm
