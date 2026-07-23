import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AddListing() {

    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");
    const [condition, setCondition] = useState("");
    const [value, setValue] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const calculateValue = async () => {

    const response =
        await axios.post(
            "http://127.0.0.1:8000/api/calculate-value/",
            {
                brand,
                condition,
                category
            }
        );
        if(response.data.success){
            alert(
                `Estimated Value: ₹${response.data.estimated_value}`
            );
        }else{
            alert(response.data.message);
        }
    // alert(
    //     `Estimated Value: ₹${response.data.estimated_value}`
    // );
};
//     const handleAddItem = async () => {

//     try {

//         const response =
//         await axios.post(
//             "http://127.0.0.1:8000/api/add-item/",
//             {
//                 username:
//                     localStorage.getItem("username"),

//                 title,
//                 brand,
//                 category,
//                 size,
//                 condition,
//                 value,
//                 location,
//                 description
//             }
//         );

//         alert(
//             response.data.message
//         );

//     } catch(error){

//         console.log(error);

//     }

// };

const handleAddItem = async () => {

    try {

        const formData = new FormData();

        formData.append(
            "username",
            localStorage.getItem("username")
        );

        formData.append("title", title);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("size", size);
        formData.append("condition", condition);
        formData.append("value", value);
        formData.append("location", location);
        formData.append("description", description);

        if (image) {

            formData.append(
                "image",
                image
            );

        }

        const response = await axios.post(
            "http://127.0.0.1:8000/api/add-item/",
            formData
        );

        alert(response.data.message);

    } catch (error) {

        console.log(error);

    }

};

// return (
//     <div>
//         <Navbar/>
//         <h1>Add Clothing Item</h1>

//         <input
//             placeholder="Title"
//             onChange={(e)=>setTitle(e.target.value)}
//         />

//         <br/><br/>

//         <input
//             placeholder="Brand"
//             onChange={(e)=>setBrand(e.target.value)}
//         />

//         <br/><br/>

//         <input
//             placeholder="Category"
//             onChange={(e)=>setCategory(e.target.value)}
//         />

//         <br/><br/>

//         <input
//             placeholder="Size"
//             onChange={(e)=>setSize(e.target.value)}
//         />

//         <br/><br/>

//         <input
//             placeholder="Condition"
//             onChange={(e)=>setCondition(e.target.value)}
//         />

//         <br/><br/>

//         <input
//             placeholder="Value"
//             onChange={(e)=>setValue(e.target.value)}
//         />

//         <br/><br/>

//         <input
//             placeholder="Location"
//             onChange={(e)=>setLocation(e.target.value)}
//         />

//         <br/><br/>

//         <textarea
//             placeholder="Description"
//             onChange={(e)=>setDescription(e.target.value)}
//         />

//         <br/><br/>

//         <button onClick={handleAddItem}>
//         Add Item
//         </button>
//         <button onClick={calculateValue}>
//             Calculate Swap Value
//         </button>
//     </div>
// );

return (

    <>

        <Navbar />

        <div className="form-container">

            <div className="form-card">

                <h1>Add Clothing Item</h1>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setImage(e.target.files[0])
                    }
                />
                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) =>
                        setBrand(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Size"
                    value={size}
                    onChange={(e) =>
                        setSize(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Condition"
                    value={condition}
                    onChange={(e) =>
                        setCondition(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Estimated Swap Value"
                    value={value}
                    onChange={(e) =>
                        setValue(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <button
                    onClick={calculateValue}
                >
                    Calculate Swap Value
                </button>

                <button
                    onClick={handleAddItem}
                >
                    Add Clothing Item
                </button>

            </div>

        </div>

    </>

);
}

export default AddListing;