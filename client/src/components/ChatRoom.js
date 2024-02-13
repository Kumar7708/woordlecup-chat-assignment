import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client';
const ChatRoom = ({ senderName, }) => {

    const ref = useRef(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [socket] = useState(io('http://localhost:5000/', { transports: ['websocket'], upgrade: false }));

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server');

            socket.on('message', (message) => {
                setMessages(prev => [...prev, { name: message.name, text: message.text }]);
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        });

        return () => {
            socket.disconnect();
        }
    }, [socket]);

    useEffect(() => {

        scrollToLast();
    }, [messages]);

    const scrollToLast = () => {
        const lastChildElement = ref.current?.lastElementChild;
        lastChildElement?.scrollIntoView({ behavior: 'smooth' });
      };

    const handleClick = () => {
        socket.emit('message', { name: senderName, text: message });
        setMessages(prev => [...prev, { name: senderName, text: message }]);
        setMessage("");
    }



    return (
        <div className="container">
            <div className="chat_room">
                <div ref={ref} className="chat_msgs">
                    {
                        messages?.map(message => {
                            return <div className={`msg_block ${senderName === message.name ? 'right' : ';left'}`} key={message}>
                                <div className={`msg ${senderName === message.name ? 'sender' : 'receiver'}`}>
                                    {senderName !== message.name && <div className='name'>{message.name}</div>}
                                    <div className="msg_text">{message.text}</div>
                                </div>
                            </div>
                        })
                    }
                </div>
                
                <div className="chat_room_cont">
                    <input className="cont_input" type="text" value={message} onChange={e => setMessage(e.target.value)} />
                    <button className="cont_btn" onClick={handleClick}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom
