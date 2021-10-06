import React from 'react';
import './Login.css';
import useForm from './useForm';
import ValidateInfo from './ValidateInfo';

const Login = ({ socket }) => {

    const { handleChange, submitHandle, values, error  } = useForm(ValidateInfo, socket);


    return (
        <>
            <div className="form__container">
                <div className="form__box">
                    <div className="title">Join A Room</div>
                    <form className="form" onSubmit={submitHandle}>
                        <div className="form__div">
                            <label htmlFor="username">Username</label>
                            <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            value={values.username}
                            onChange={handleChange}
                            placeholder="will smith" 
                            />
                            { error.username && <p>{error.username}</p> }
                        </div>
                        <div className="form__div">
                            <label htmlFor="room">Room ID</label>
                            <input 
                            type="text" 
                            name="room" 
                            id="room" 
                            value={values.room}
                            onChange={handleChange}
                            placeholder="*****" 
                            />
                            { error.room && <p>{error.room}</p> }
                        </div>
                        <button className="joinBtn" type="submit">join </button>
                    </form>
                </div>
            </div> 
        </>
    )
}

export default Login;
