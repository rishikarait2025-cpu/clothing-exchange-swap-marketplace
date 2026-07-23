import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function SwapRequests() {

    const [requests, setRequests] =
        useState([]);

    useEffect(() => {

        fetchRequests();

    }, []);

    const navigate = useNavigate();

    const fetchRequests = async () => {

        const username =
            localStorage.getItem(
                "username"
            );

        const response =
            await axios.get(
                `http://127.0.0.1:8000/api/incoming-swaps/?username=${username}`
            );

        setRequests(
            response.data.requests
        );
        console.log(requests);
    };

    const updateStatus =
    async(id,status)=>{

        const response =
        await axios.post(
            "http://127.0.0.1:8000/api/update-swap/",
            {
                request_id:id,
                status:status
            }
        );

        alert(
            response.data.message
        );

        fetchRequests();
    };

    // return(

    //     <div>
    //         <Navbar/>
    //         <h1>
    //             Incoming Swaps
    //         </h1>

    //         {
    //             requests.map((req)=>(

    //                 <div
    //                     key={req.id}
    //                     style={{
    //                         border:"1px solid black",
    //                         padding:"10px",
    //                         margin:"10px"
    //                     }}
    //                 >

    //                     <h3>
    //                         {req.sender}
    //                     </h3>

    //                     <p>
    //                         Wants:
    //                         {req.item}
    //                     </p>

    //                     <p>
    //                         Status:
    //                         {req.status}
    //                     </p>
    //                     {
    //                         req.status === "Pending" && (

    //                             <>

    //                                 <button
    //                                 onClick={() =>
    //                                     updateStatus(
    //                                         req.id,
    //                                         "Accepted"
    //                                     )
    //                                 }>
    //                                     Accept
    //                                 </button>

    //                                 <button
    //                                 onClick={() =>
    //                                     updateStatus(
    //                                         req.id,
    //                                         "Rejected"
    //                                     )
    //                                 }>
    //                                     Reject
    //                                 </button>

    //                             </>

    //                         )
    //                     }
    //                 </div>

    //             ))
    //         }

    //     </div>
    // );
    return (

    <>

        <Navbar />

        <div className="marketplace-container">

            <h1>Incoming Swaps</h1>

            <div className="swap-request-grid">

                {
                    requests.map((req) => (

                        <div
                            className="swap-request-card"
                            key={req.id}
                        >

                            <div className="swap-icon">
                                🔄
                            </div>

                            <div className="swap-request-content">

                                <h2>
                                    {req.item}
                                </h2>

                                <p>
                                    <strong>From:</strong>{" "}
                                    {req.sender}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className={`status-${req.status.toLowerCase()}`}>
                                        {req.status}
                                    </span>
                                </p>

                                {
                                    req.status === "Pending" && (

                                        <div className="swap-actions">

                                            <button className="accept-button" onClick={() => updateStatus( req.id, "Accepted")}>
                                                Accept
                                            </button>

                                            <button className="reject-button" onClick={() => updateStatus(req.id,"Rejected")}>
                                                Reject
                                            </button>
                                            <button onClick={() => {navigate(`/chat?user=${req.sender}`); }}>
                                                Chat with {req.sender}
                                            </button>

                                        </div>

                                    )
                                }

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    </>

);
}

export default SwapRequests;