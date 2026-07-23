// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";


// function MyListings() {

//     const [items, setItems] = useState([]);
//     const [editingItem, setEditingItem] = useState(null);


//     useEffect(() => {

//         fetchItems();

//     }, []);

//     const fetchItems = async () => {

//         try {

//             const username =
//                 localStorage.getItem("username");
//                 console.log(username);

//             const response =
//                 await axios.get(
//                     `http://127.0.0.1:8000/api/my-listings/?username=${username}`
//                 );
//                 console.log(response.data)

//             setItems(
//                 response.data.items || []
//             );

//         } catch(error){

//             console.log(error);

//         }

//     };
// console.log(items);
// const handleDelete = async (itemId) => {

//     const confirmDelete =
//         window.confirm(
//             "Are you sure you want to delete this item?"
//         );

//     if (!confirmDelete) return;

//     try {

//         const response =
//             await axios.delete(
//                 `http://127.0.0.1:8000/api/delete-item/${itemId}/`
//             );

//         alert(response.data.message);

//         fetchItems();

//     } catch (error) {

//         console.log(error);

//     }

// };
// const handleUpdate = async () => {

//     try {

//         const response =
//             await axios.put(
//                 `http://127.0.0.1:8000/api/update-item/${editingItem.id}/`,
//                 editingItem
//             );

//         alert(response.data.message);

//         setEditingItem(null);

//         fetchItems();

//     } catch (error) {

//         console.log(error);

//     }

// };

// return (

//     <>

//         <Navbar />

//         <div className="marketplace-container">

//             <h1>My Listings</h1>

//             <div className="listing-grid">
//                 {
//     editingItem && (

//         <div className="edit-form">

//             <h2>
//                 Edit Listing
//             </h2>

//             <input
//                 value={editingItem.title}
//                 onChange={(e) =>
//                     setEditingItem({
//                         ...editingItem,
//                         title: e.target.value
//                     })
//                 }
//             />

//             <input
//                 value={editingItem.brand}
//                 onChange={(e) =>
//                     setEditingItem({
//                         ...editingItem,
//                         brand: e.target.value
//                     })
//                 }
//             />

//             <input
//                 value={editingItem.category}
//                 onChange={(e) =>
//                     setEditingItem({
//                         ...editingItem,
//                         category: e.target.value
//                     })
//                 }
//             />

//             <input
//                 value={editingItem.size}
//                 onChange={(e) =>
//                     setEditingItem({
//                         ...editingItem,
//                         size: e.target.value
//                     })
//                 }
//             />

//             <input
//                 value={editingItem.condition}
//                 onChange={(e) =>
//                     setEditingItem({
//                         ...editingItem,
//                         condition: e.target.value
//                     })
//                 }
//             />

//             <input
//                 type="number"
//                 value={editingItem.value}
//                 onChange={(e) =>
//                     setEditingItem({
//                         ...editingItem,
//                         value: e.target.value
//                     })
//                 }
//             />

//             <input
//                 value={editingItem.location}
//                 onChange={(e) =>
//                     setEditingItem({
//                         ...editingItem,
//                         location: e.target.value
//                     })
//                 }
//             />

//             <textarea
//                 value={editingItem.description}
//                 onChange={(e) =>
//                     setEditingItem({
//                         ...editingItem,
//                         description: e.target.value
//                     })
//                 }
//             />

//             <button
//                 onClick={handleUpdate}
//             >
//                 Update Listing
//             </button>

//             <button
//                 onClick={() =>
//                     setEditingItem(null)
//                 }
//             >
//                 Cancel
//             </button>

//         </div>

//     )
// }
//                 {
//                     items.map((item) => (

//                         <div
//                             className="listing-card"
//                             key={item.id}
//                         >
//                         <div className="item-image">

//                                 {
//                                     item.image ? (

//                                         <img
//                                             src={item.image}
//                                             alt={item.title}
//                                         />

//                                     ) : (

//                                         <span>👕</span>

//                                     )
//                                 }

//                             </div>


//                             <div className="listing-content">

//                                 <h2>
//                                     {item.title}
//                                 </h2>

//                                 <p>
//                                     {item.brand}
//                                 </p>

//                                 <p>
//                                     Category: {item.category}
//                                 </p>

//                                 <p>
//                                     Size: {item.size}
//                                 </p>

//                                 <p>
//                                     Condition: {item.condition}
//                                 </p>

//                                 <p>
//                                     📍 {item.location}
//                                 </p>

//                                 <div className="item-value">
//                                     ₹{item.value}
//                                 </div>
                                
//                             <button onClick={() => handleDelete(item.id)}>
//                                 Delete
//                             </button>
//                             <button onClick={() => setEditingItem(item)}>
//                                 Edit
//                             </button>

//                             </div>
//                         </div>

//                     ))
//                 }

//             </div>

//         </div>

//     </>

// );
// }

// export default MyListings;



import { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";


function MyListings() {
    const navigate = useNavigate();
    const [items, setItems] =
        useState([]);

    const [editingItem, setEditingItem] =
        useState(null);


    const fetchItems = useCallback(async () => {

        try {

            const username =
                localStorage.getItem("username");


            const response =
                await axios.get(
                    `http://127.0.0.1:8000/api/my-listings/?username=${username}`
                );


            setItems(
                response.data.items || []
            );


        } catch (error) {

            console.log(error);

        }

    }, []);


    useEffect(() => {

        fetchItems();

    }, [fetchItems]);


    const handleDelete = async (itemId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this item?"
            );


        if (!confirmDelete) return;


        try {

            const response =
                await axios.delete(
                    `http://127.0.0.1:8000/api/delete-item/${itemId}/`
                );


            alert(
                response.data.message
            );


            fetchItems();


        } catch (error) {

            console.log(error);

        }

    };


    const handleUpdate = async () => {

        try {

            const response =
                await axios.put(

                    `http://127.0.0.1:8000/api/update-item/${editingItem.id}/`,

                    editingItem

                );


            alert(
                response.data.message
            );


            setEditingItem(
                null
            );


            fetchItems();


        } catch (error) {

            console.log(error);

        }

    };


    return (

        <>

            <Navbar />


            <div className="marketplace-container">


                <h1>
                    My Listings
                </h1>


                {
                    editingItem && (

                        <div className="edit-form">


                            <h2>
                                Edit Listing
                            </h2>


                            <input

                                value={
                                    editingItem.title
                                }

                                onChange={(e) =>

                                    setEditingItem({

                                        ...editingItem,

                                        title:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                value={
                                    editingItem.brand
                                }

                                onChange={(e) =>

                                    setEditingItem({

                                        ...editingItem,

                                        brand:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                value={
                                    editingItem.category
                                }

                                onChange={(e) =>

                                    setEditingItem({

                                        ...editingItem,

                                        category:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                value={
                                    editingItem.size
                                }

                                onChange={(e) =>

                                    setEditingItem({

                                        ...editingItem,

                                        size:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                value={
                                    editingItem.condition
                                }

                                onChange={(e) =>

                                    setEditingItem({

                                        ...editingItem,

                                        condition:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                type="number"

                                value={
                                    editingItem.value
                                }

                                onChange={(e) =>

                                    setEditingItem({

                                        ...editingItem,

                                        value:
                                            e.target.value

                                    })

                                }

                            />


                            <input

                                value={
                                    editingItem.location
                                }

                                onChange={(e) =>

                                    setEditingItem({

                                        ...editingItem,

                                        location:
                                            e.target.value

                                    })

                                }

                            />


                            <textarea

                                value={
                                    editingItem.description
                                }

                                onChange={(e) =>

                                    setEditingItem({

                                        ...editingItem,

                                        description:
                                            e.target.value

                                    })

                                }

                            />


                            <button
                                onClick={
                                    handleUpdate
                                }
                            >

                                Update Listing

                            </button>


                            <button

                                onClick={() =>
                                    setEditingItem(null)
                                }

                            >

                                Cancel

                            </button>


                        </div>

                    )

                }


                <div className="listing-grid">


                    {

                        items.map((item) => (

                            <div

                                className="listing-card"

                                key={
                                    item.id
                                }
                                onClick={() =>
        navigate(`/item/${item.id}`)
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
                                        Category:{" "}
                                        {
                                            item.category
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

                                        onClick={() =>
                                            handleDelete(
                                                item.id
                                            )
                                        }

                                    >

                                        Delete

                                    </button>


                                    <button

                                        onClick={() =>
                                            setEditingItem(
                                                item
                                            )
                                        }

                                    >

                                        Edit

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


export default MyListings;