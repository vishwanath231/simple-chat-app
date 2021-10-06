import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Chat.css';




const Chat = ({ socket }) => {

    const [username, setUsername] = useState("");
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([])

    const [users, setUsers] = useState([]);
    const [room, setRoom] = useState("");

    const [show, setShow] = useState(true)


    useEffect(() => {
  
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const user = params.get('name');

        setUsername(user)
    }, [])


    const sendMessage = async () => {
        if (currentMessage !== "") {
            await socket.emit('chatMessage',currentMessage)
            setMessageList((list) => [...list, currentMessage])
            setCurrentMessage("");
            setShow(false)
        }

        setTimeout(() => {
            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight ;
        }, 100)
    }

    useEffect(() => {
        
        socket.on('message', (data) => {
            setMessageList((list) => [...list, data])

            setTimeout(() => {
                var div = document.getElementById("chat_body");
                div.scrollTop = div.scrollHeight ;
            }, 100)
        });

        socket.on('roomUser', ({room, users}) => {
            setRoom(room);
            setUsers(users);
        })
        
    }, [socket])

      
    const history = useHistory();

    const logoutHandle = () => {
        history.push('/');
        window.location.href = "/";
    }

    return (
        <>
            <div className="chat__container">
                <div className="chat__box">
                    <nav className="nav">
                        <div className="logo">
                            <img src="image/logo.png" alt="" />
                            <p>ChatBox</p>
                        </div>
                        <button className="logout" onClick={logoutHandle}>Logout</button>
                    </nav>

                    <div className="chat__body">
                        <div className="chat__body-grid">
                            <div className="user__box">
                                <div className="search__box">
                                    <input type="text" placeholder="Search..." />
                                    <img src="image/search.png" alt="" />
                                </div>
                                <div className="room">Room</div>
                                    <div className="room__name">
                                        <p>{room}</p>
                                    </div>
                                <div className="user">User</div>
                                { users.map((val, index) => (
                                    <div className="username" key={index}>
                                        <p>{val.username}</p>
                                    </div>
                                ))}
                                
                            </div>
                            <div className="chat__body-box">
                                <div className="chat">
                                    <div className="messages" id="chat_body">
                                        {
                                            messageList.map((val) => {
                                                return (
                                                    <div >
                                                    { username === val.username ? (
                                                        <div className="message parker" id="parker">
                                                            <div className="lightBlue">
                                                                <div className="name"></div>
                                                                <div className="text">{val.text}</div>
                                                                <div className="time">{val.time}</div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="message stark" id="stark">
                                                            <div className="lightCoral">
                                                                <div className="name">{val.username}</div>
                                                                <div className="text" >{val.text}</div>
                                                                <div className="time">{val.time}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                </div>
                                <div className="chat__body-footer">
                                    <input 
                                        type="text" 
                                        name="message"
                                        value={currentMessage}
                                        onChange={e => setCurrentMessage(e.target.value)}
                                        onKeyPress={e => e.key === "Enter" && sendMessage()}
                                        placeholder="Enter message..." 
                                    />
                                    <button onClick={sendMessage} ><img src="image/sent.png" alt="" /> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}

export default Chat;