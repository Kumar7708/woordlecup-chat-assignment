import { Link } from 'react-router-dom';

const Lobby = ({senderName, setSenderName}) => { 

const handleOnChange = (e) => {
    setSenderName(e.target.value)
}

    return (
        <div className="container">
            <div className="lobby">
            <h1 className="lobby_heading">Join The Chat Room</h1>
            <input className="lobby_input" type="text" value={senderName} onChange={handleOnChange} />
            <Link disabled className="lobby_btn" to={'/chat-room'}>Chat Room</Link>
        </div>
        </div>
    )
}

export default Lobby
