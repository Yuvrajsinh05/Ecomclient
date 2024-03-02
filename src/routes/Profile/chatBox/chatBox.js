import { useRef, useState , useEffect, useMemo} from "react"
import styles from "./profile.module.css"
import io from 'socket.io-client';
import { postApiCall } from "../../../requests/requests";
import { AdvanceApis } from "../../../requests/adminreq";
import { baseUrl } from "../../../requests/adminreq";



export const ChatMessageBox = ({ UserName}) => {
    const messagesEndRef = useRef(null);
    const [isChating, setIsChating] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [message, setMessages] = useState([{bot :"Hey How May I Help You !"}])

    const handleSendMessage = async () => {
        if (newMessage.trim() !== "") {
            await postApiCall(AdvanceApis.SendMSGToDiscord,{Message :newMessage ,IDSock:socket.id})
            setMessages([...message, {user : newMessage}]);
            setNewMessage("");
        }
    };

    useEffect(()=>{
        scrollToBottom()
    },[message])

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };
    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    };

    const socket = useMemo(() => {
        return io('https://ecombackend-303e.onrender.com');
    }, []);

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [socket]);


    socket.on('reply',(replymes)=>{
        setMessages([...message, {bot : replymes.MessageToSocket}]);
    })
    

    return (
        <>
         <div className={styles.userInfo}>
                {/* <h2>User Profile</h2> */}
                <p>Welcome, <b> {UserName}!</b></p>


                <div ref={messagesEndRef} className={styles.MessageOverFLowCheck}>

                {message.map((mess, index) => {
                        
                        if (mess.user) {
                            return (
                                <>
                                    <div className={styles.messageBoxChatRight}>

                                        <div style={{ flex: '1.2', padding: '0.5rem', textAlign: 'right' }}>{mess?.user}</div>
                                        <div style={{ flex: '0.1', padding: '0.5rem' }}><img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src="https://i.ibb.co/k5Nn1Yx/Whats-App-Image-2023-06-18-at-11-50-49-PM.jpg" /></div>
                                    </div>
                                </>
                            )
                        } else {
                            return (
                                <div className={styles.messageBoxChatLeft}>
                                    <div style={{ flex: '0.1', padding: '0.5rem' }}><img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src="https://i.ibb.co/k5Nn1Yx/Whats-App-Image-2023-06-18-at-11-50-49-PM.jpg" /></div>
                                    <div style={{ flex: '1.2', padding: '0.5rem' }}>{mess?.bot}</div>
                                </div>

                            )
                        }
                    })}
                </div>




            </div>
            <div className={styles.actions}>
                {!isChating && (
                    <div className={styles.ButtonDiv}>
                        <button
                            disabled={isChating}
                            className={styles.actionBtn}
                            onClick={() => setIsChating(true)}
                        >
                            Chat
                        </button>
                    </div>
                )}
                {isChating && (
                    <div className={styles.ButtonDiv}>
                        <div className={styles.inputText}>

                            <input
                                className={styles.inputSendMsgTExt}
                                type="text"
                                value={newMessage}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."

                            />
                            <button onClick={handleSendMessage} className={styles.inputSendMsgBtn}>
                                &#8883;
                            </button>

                        </div>

                    </div>
                )}
                <div className={styles.ButtonDiv}><button className={styles.actionBtn}>Delete Account</button></div>
                <div className={styles.ButtonDiv}><button className={styles.actionBtn}>Log Out</button></div>
            </div>
        </>
    )
}