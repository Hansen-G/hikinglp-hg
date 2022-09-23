import React, { useState } from "react";
import { useSelector } from "react-redux";


import './AI.css'


function AI() {
    const [userInput, setUserInput] = useState('');
    const [initial, setInitial] = useState(true);
    const [aiReply, setAiReply] = useState('');
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [lastMessage, setLastMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);

    let user = useSelector((state) => state.session.user);

    if (!user){
        user = { profile_img: "https://res.cloudinary.com/hansenguo/image/upload/v1660950302/TheGramme/user_yiqxol.png"}
        
    }


    function userChat () {
        return (
            <div className="user-chat flex">

                <div className="user-chat-text">
                    {submit ? userInput : lastMessage}
                    
                </div>

                <div className="user-chat-img">
                    <img src={user.profile_img} 
                    alt="user" 
                    className="chat-img" 
                    onError={e => { e.currentTarget.src = "https://res.cloudinary.com/hansenguo/image/upload/v1661959406/Hikinglp/Logo_sytg4b.png"; }} />
                </div>
            </div>
        )
    }

    function aiChat() {
        return (
            <div className="ai-chat flex">
                <div className="ai-chat-img">
                    <img src="https://res.cloudinary.com/hansenguo/image/upload/v1662413464/Hikinglp/7e99c18116b61b099fb877d810f4b9cf_z0lxbq.jpg" 
                    alt="ai" 
                    className="chat-img" 
                    onError={e => { e.currentTarget.src = "https://res.cloudinary.com/hansenguo/image/upload/v1661959406/Hikinglp/Logo_sytg4b.png"; }} />
                </div>

                <div className="ai-chat-text">

                    {initial ? 'Hi, I am Hikinglp assistance. How can I help you?' : ''}
                    {loading ? '...' : ''}
                    {loaded ? aiReply : ''}
                    {error ? errorMessage : ''}

                </div>

            </div>
        )
    }
    

    const handleSubmit = async (e) => {
            e.preventDefault();
            setSubmit(true);
            setLoading(true);
            setLoaded(false);
            setError(false);
            setInitial(false);
            setInitial(false);
            setErrorMessage('');
            setLastMessage(userInput);
            const data = { prompt: userInput }

            try{
                fetch('/api/ai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {
                        setAiReply(data);
                        setSubmit(false);
                        setUserInput('');
                        setLoading(false);
                        setLoaded(true);

                    })
                    .catch(err => {
                        setError(true);
                        setAiReply('Hmmmmm, something went wrong. Please try again later.');
                    })

            }
            catch(err){
                setError(true);
                setAiReply('Hmmmmm, something went wrong. Please try again later.');
            }


           
        }
        
    

    return (
        <div className="ai-function">
            <button className={show ? "ai-but" : "ai-but-hidden"} 
                onClick={() => setShow(!show)}
            >
                {show ? (
                    <div className="ai-but-div flex">
                        <i class="fa-solid fa-xmark"></i>
                    </div>

                ) : (
                    <div className="ai-but-div flex">
                        <i class="fa-regular fa-comments"></i>
                        <div className="ai-but-div-text">
                            Chat
                        </div>
                    </div>
                )}
               
            </button>

            {show ? (
                <div className="ai-card">
                    {/* <div className="ai-title">
                What can I help you with?
            </div> */}

                    <div className="chatting-continer">

                        {initial && aiChat()}
                        {!initial && userChat()}
                        {!initial && aiChat()}

                    </div>
                    <div className="user-input">
                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                minLength='1'
                                maxLength='200'
                                id='ai-input' 
                                placeholder='Type your question here'
                                disabled={loading}
                                />
                            <button type="submit"
                                disabled={
                                    userInput === '' || submit ? true : false
                                }
                                className={
                                    userInput === '' || submit ? 'disabled-ai-submit ai-submit' : 'enabled-ai-submit ai-submit'
                                }
                            >
                                <i class="fa-regular fa-paper-plane"
                                    id={
                                        userInput === '' || submit ? 'disabled-ai-submit-icon' : 'enabled-ai-submit-icon'
                                    }
                                ></i>

                            </button>
                        </form>
                    </div>
                </div>  
                ) : null}
   
        </div>

    )

}


export default AI;