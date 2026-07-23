import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function ItemDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {

        fetchItem();

    }, []);

    const fetchItem = async () => {

        try {

            const response =
                await axios.get(
                    `http://127.0.0.1:8000/api/item/${id}/`
                );

            setItem(
                response.data.item
            );

        } catch (error) {

            console.log(error);

        }

    };

    if (!item) {

        return (
            <>
                <Navbar />
                <h2>Loading...</h2>
            </>
        );

    }
    const handleSwapRequest = async () => {

    try {

        const response = await axios.post(
            "http://127.0.0.1:8000/api/send-swap-request/",
            {
                username:
                    localStorage.getItem("username"),

                item_id: item.id
            }
        );

        alert(response.data.message);

    } catch (error) {

        console.log(error);

    }

};
    return (

        <>

            <Navbar />

            <div className="item-detail-container">

                <div className="item-detail-image">

                    {
                        item.image ? (

                            <img
                                src={item.image}
                                alt={item.title}
                            />

                        ) : (

                            <span>👕</span>

                        )
                    }

                </div>

                <div className="item-detail-content">

                    <h1>
                        {item.title}
                    </h1>

                    <h3>
                        {item.brand}
                    </h3>

                    <p>
                        Category: {item.category}
                    </p>

                    <p>
                        Size: {item.size}
                    </p>

                    <p>
                        Condition: {item.condition}
                    </p>

                    <p>
                        Location: {item.location}
                    </p>

                    <h2>
                        Estimated Value: ₹{item.value}
                    </h2>

                    <p>
                        {item.description}
                    </p>

                    <p>
                        Listed by: {item.owner}
                    </p>

                
                    <button
                        className="detail-swap-button"
                        onClick={handleSwapRequest}
                    >
                        Request Swap
                    </button>
                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/browse")
                        }
                    >
                        ← Back to Marketplace
                    </button>
            </div>
            </div>

        </>

    );

}

export default ItemDetail;