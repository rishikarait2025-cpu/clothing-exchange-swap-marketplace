import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const username =
        localStorage.getItem("username");

    const handleLogout = () => {

        localStorage.removeItem("username");

        navigate("/");
    };

    return (

        <nav className="navbar">

            <h2
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                SwapStyle
            </h2>

            <div className="nav-links">

                <button
                    onClick={() =>
                        navigate("/browse")
                    }
                >
                    Marketplace
                </button>

                <button
                    onClick={() =>
                        navigate("/my-listings")
                    }
                >
                    My Listings
                </button>

                <button
                    onClick={() =>
                        navigate("/swap-requests")
                    }
                >
                    Incoming Swaps
                </button>

                <button
                    onClick={() =>
                        navigate("/outgoing-swaps")
                    }
                >
                    Sent Requests
                </button>
                <button onClick={() => navigate("/chat")}>
                    Chat
                </button>
                <span>
                    {username}
                </span>
                
                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <button onClick={() => navigate("/profile")}>
                    Profile
                </button>
                
            </div>

        </nav>

    );
}

export default Navbar;