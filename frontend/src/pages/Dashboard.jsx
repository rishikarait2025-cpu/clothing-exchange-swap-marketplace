import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function Dashboard() {

    const username =
        localStorage.getItem("username");

    const navigate = useNavigate();
return (

    <>

        <Navbar />

        <div className="dashboard-container">

            <h1>
                Welcome, {username} 👋
            </h1>

            <p className="dashboard-subtitle">
                Manage your clothing swaps and discover sustainable fashion.
            </p>

            <div className="dashboard-cards">

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/add-listing")}
                >
                    <div className="dashboard-card-icon">
                        ➕
                    </div>

                    <h2>Add Clothing</h2>

                    <p>
                        List clothes you want to exchange.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/browse")}
                >
                    <div className="dashboard-card-icon">
                        👕
                    </div>

                    <h2>Marketplace</h2>

                    <p>
                        Browse clothing available for swapping.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/my-listings")}
                >
                    <div className="dashboard-card-icon">
                        📦
                    </div>

                    <h2>My Listings</h2>

                    <p>
                        View the clothes you have listed.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/swap-requests")}
                >
                    <div className="dashboard-card-icon">
                        🔄
                    </div>

                    <h2>Incoming Swaps</h2>

                    <p>
                        Manage requests from other users.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/outgoing-swaps")}
                >
                    <div className="dashboard-card-icon">
                        📤
                    </div>

                    <h2>Sent Requests</h2>

                    <p>
                        Track your swap requests.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/chat")}
                >
                    <div className="dashboard-card-icon">
                        💬
                    </div>

                    <h2>Negotiation</h2>

                    <p>
                        Track your swap requests.
                    </p>
                </div>

            </div>

        </div>

    </>

);
// return (
//     <>

//         <Navbar />

//         <div className="dashboard-container">

//             <h1>
//                 Welcome, {username}
//             </h1>

//             <div className="dashboard-actions">

//                 <button
//                     onClick={() =>
//                         navigate("/add-listing")
//                     }
//                 >
//                     Add Clothing Item
//                 </button>

//                 <button
//                     onClick={() =>
//                         navigate("/my-listings")
//                     }
//                 >
//                     My Listings
//                 </button>

//                 <button
//                     onClick={() =>
//                         navigate("/browse")
//                     }
//                 >
//                     Browse Marketplace
//                 </button>

//                 <button
//                     onClick={() =>
//                         navigate("/swap-requests")
//                     }
//                 >
//                     Swap Requests
//                 </button>

//                 <button
//                     onClick={() =>
//                         navigate("/outgoing-swaps")
//                     }
//                 >
//                     My Sent Requests
//                 </button>

//             </div>

//         </div>

//     </>
// );
}

export default Dashboard;