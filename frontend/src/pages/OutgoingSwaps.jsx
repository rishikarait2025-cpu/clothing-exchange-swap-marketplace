import { useEffect, useState }
from "react";

import axios from "axios";
import Navbar from "../components/Navbar";

function OutgoingSwaps(){

    const [requests,
    setRequests] =
        useState([]);

    useEffect(()=>{
        fetchRequests();
    },[]);

    const fetchRequests =
    async()=>{

        const username =
        localStorage.getItem(
            "username"
        );

        const response =
        await axios.get(
        `http://127.0.0.1:8000/api/outgoing-swaps/?username=${username}`
        );

        setRequests(
            response.data.requests
        );
    };

    // return(

    //     <div>
    //         <Navbar/>
    //         <h1>
    //             My Sent Requests
    //         </h1>

    //         {
    //             requests.map(
    //                 (req)=>(

    //                 <div
    //                 key={req.id}
    //                 style={{
    //                     border:
    //                     "1px solid black",
    //                     padding:"10px",
    //                     margin:"10px"
    //                 }}>

    //                     <h3>
    //                         {req.item}
    //                     </h3>

    //                     <p>
    //                         Receiver:
    //                         {req.receiver}
    //                     </p>

    //                     <p>
    //                         Status:
    //                         {req.status}
    //                     </p>

    //                 </div>

    //             ))
    //         }

    //     </div>

    // );

    return (

    <>

        <Navbar />

        <div className="marketplace-container">

            <h1>My Sent Requests</h1>

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
                                    <strong>To:</strong>{" "}
                                    {req.receiver}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}

                                    <span
                                        className={
                                            `status-${req.status.toLowerCase()}`
                                        }
                                    >
                                        {req.status}
                                    </span>

                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    </>

);
}

export default OutgoingSwaps;