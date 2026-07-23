// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";

// function BrowseListings() {

//     const [items, setItems] = useState([]);
//     const [location, setLocation] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//     const response =
//         await axios.get(
//             `http://127.0.0.1:8000/api/all-listings/?location=${location}`
//         );
//         setItems(response.data.items);
//     };

//     const handleSwapRequest = async (itemId) => {

//     try {

//         const response =
//             await axios.post(
//                 "http://127.0.0.1:8000/api/send-swap-request/",
//                 {
//                     username:
//                         localStorage.getItem("username"),
//                     item_id: itemId
//                 }
//             );

//         alert(response.data.message);

//     } catch(error){

//         console.log(error);

//     }

// };
//     // return (

//     //     <div>
//     //     <Navbar/>
//     //     <input
//     //         type="text"
//     //         placeholder="Enter location"
//     //         value={location}
//     //         onChange={(e)=>
//     //             setLocation(e.target.value)
//     //         }
//     //     />

//     //     <button onClick={fetchItems}>
//     //         Search
//     //     </button>

//     //     <br /><br />

//     //         <h1>Marketplace</h1>

//     //         {
//     //             items.map((item) => (

//     //                 <div
//     //                     key={item.id}
//     //                     style={{
//     //                         border:"1px solid black",
//     //                         margin:"10px",
//     //                         padding:"10px"
//     //                     }}
//     //                 >

//     //                     <h3>{item.title}</h3>

//     //                     <p>Brand: {item.brand}</p>

//     //                     <p>Owner: {item.owner}</p>

//     //                     <p>Location: {item.location}</p>
//     //                     <button
//     //                     onClick={() =>
//     //                         handleSwapRequest(item.id)
//     //                     }>
//     //                     Request Swap
//     //                 </button>
//     //                 </div>

//     //             ))
//     //         }

//     //     </div>

//     // );
//     return (

//     <>

//         <Navbar />
        

//         <div className="marketplace-container">

//             <h1>Marketplace</h1>

//             <div className="location-search">

//                 <input
//                     type="text"
//                     placeholder="Search by location"
//                     value={location}
//                     onChange={(e) =>
//                         setLocation(e.target.value)
//                     }
//                 />

//                 <button
//                     onClick={fetchItems}
//                 >
//                     Search
//                 </button>

//             </div>

//             <div className="listing-grid">

//                 {
//                     items.map((item) => (

//                     <div
//                         className="listing-card"
//                         key={item.id}
//                         onClick={() => {
//                             navigate(`/item/${item.id}`);
//                         }}
//                     >
//                         <div className="item-image">
//                             {item.image ? (
//                                 <img
//                                     src={item.image}
//                                     alt={item.title}
//                                 />
//                             ) : (
//                                 <span>👕</span>
//                             )}
//                         </div>

//                         <div className="listing-content">

//                             <h2>{item.title}</h2>

//                             <p>{item.brand}</p>

//                             <p>Size: {item.size}</p>

//                             <p>Condition: {item.condition}</p>

//                             <p>📍 {item.location}</p>

//                             <div className="item-value">
//                                 ₹{item.value}
//                             </div>

//                             <button
//                                 onClick={(e) => {

//                                     e.stopPropagation();

//                                     handleSwapRequest(item.id);

//                                 }}
//                             >
//                                 Request Swap
//                             </button>

//                         </div>

//                     </div>
//                     ))
//                 }

//             </div>

//         </div>

//     </>

// );
// }

// export default BrowseListings;


import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


function BrowseListings() {

    const [items, setItems] =
        useState([]);

    const [location, setLocation] =
        useState("");

    const navigate =
        useNavigate();


    const fetchItems = useCallback(async () => {

        try {

            const username =
                localStorage.getItem("username");


            const response =
                await axios.get(

                    `http://127.0.0.1:8000/api/all-listings/?location=${location}&username=${username}`

                );


            console.log(
                response.data
            );


            setItems(

                response.data.items || []

            );


        } catch (error) {

            console.log(
                error
            );


            setItems([]);

        }

    }, [location]);


    useEffect(() => {

        fetchItems();

    }, [fetchItems]);


    const handleSwapRequest =
        async (itemId) => {

            try {

                const response =
                    await axios.post(

                        "http://127.0.0.1:8000/api/send-swap-request/",

                        {

                            username:
                                localStorage.getItem(
                                    "username"
                                ),

                            item_id:
                                itemId

                        }

                    );


                alert(
                    response.data.message
                );


            } catch (error) {

                console.log(
                    error
                );

            }

        };


    return (

        <>

            <Navbar />


            <div className="marketplace-container">


                <h1>
                    Marketplace
                </h1>


                <div className="location-search">


                    <input

                        type="text"

                        placeholder="Search by location"

                        value={
                            location
                        }

                        onChange={(e) =>

                            setLocation(
                                e.target.value
                            )

                        }

                    />


                    <button

                        onClick={
                            fetchItems
                        }

                    >

                        Search

                    </button>


                </div>


                <div className="listing-grid">


                    {

                        items.map((item) => (

                            <div

                                className="listing-card"

                                key={
                                    item.id
                                }

                                onClick={() =>

                                    navigate(
                                        `/item/${item.id}`
                                    )

                                }

                            >


                                <div className="item-image">


                                    {

                                        item.image ?

                                            (

                                                <img

                                                    src={
                                                        item.image
                                                    }

                                                    alt={
                                                        item.title
                                                    }

                                                />

                                            )

                                            :

                                            (

                                                <span>
                                                    👕
                                                </span>

                                            )

                                    }


                                </div>


                                <div className="listing-content">


                                    <h2>
                                        {
                                            item.title
                                        }
                                    </h2>


                                    <p>
                                        {
                                            item.brand
                                        }
                                    </p>


                                    <p>
                                        Size:{" "}
                                        {
                                            item.size
                                        }
                                    </p>


                                    <p>
                                        Condition:{" "}
                                        {
                                            item.condition
                                        }
                                    </p>


                                    <p>
                                        📍{" "}
                                        {
                                            item.location
                                        }
                                    </p>


                                    <div className="item-value">

                                        ₹
                                        {
                                            item.value
                                        }

                                    </div>


                                    <button

                                        onClick={(e) => {

                                            e.stopPropagation();

                                            handleSwapRequest(
                                                item.id
                                            );

                                        }}

                                    >

                                        Request Swap

                                    </button>


                                </div>


                            </div>

                        ))

                    }


                </div>


            </div>


        </>

    );

}


export default BrowseListings;