import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Chat() {

    const [searchParams] =
        useSearchParams();

    const [receiver, setReceiver] =
        useState(
            searchParams.get("user") || ""
        );

    const [message, setMessage] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const sender =
        localStorage.getItem("username");


    const fetchMessages = async () => {

        if (!receiver) return;

        try {

            const response =
                await axios.get(
                    `http://127.0.0.1:8000/api/get-messages/?sender=${sender}&receiver=${receiver}`
                );

            console.log(response.data);

            setMessages(
                response.data.messages || []
            );

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchMessages();

    }, [receiver]);


    const sendMessage = async () => {

        if (!message.trim()) {

            alert("Enter a message");

            return;

        }

        try {

            await axios.post(
                "http://127.0.0.1:8000/api/send-message/",
                {
                    sender: sender,
                    receiver: receiver,
                    message: message
                }
            );

            setMessage("");

            fetchMessages();

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <>

            <Navbar />

            <div className="chat-container">

                <h1>
                    Negotiation Chat
                </h1>


                <input
                    type="text"
                    placeholder="Enter username to chat with"
                    value={receiver}
                    onChange={(e) =>
                        setReceiver(
                            e.target.value
                        )
                    }
                />


                <button
                    onClick={fetchMessages}
                >
                    Load Chat
                </button>


                <div className="chat-messages">

                    {
                        messages.map(
                            (msg, index) => (

                                <div
                                    key={index}
                                    className={
                                        msg.sender === sender
                                            ? "my-message"
                                            : "other-message"
                                    }
                                >

                                    <strong>
                                        {msg.sender}
                                    </strong>

                                    <p>
                                        {msg.message}
                                    </p>

                                </div>

                            )
                        )
                    }

                </div>


                <div className="message-input">

                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }
                    />


                    <button
                        onClick={sendMessage}
                    >
                        Send
                    </button>

                </div>

            </div>

        </>

    );

}

export default Chat;