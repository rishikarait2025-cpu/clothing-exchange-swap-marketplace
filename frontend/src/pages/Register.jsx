import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        try {

            const response = await axios.post(
                `${API_BASE_URL}/api/register/`,
                {
                    username,
                    email,
                    password
                }
            );

            alert(response.data.message);

        // } catch (error) {

        //     console.log(error);

        // }
         } catch (error) {
    console.log("REGISTRATION ERROR:", error);
    console.log("RESPONSE:", error.response);
    alert(error.response?.data?.error || "Registration failed");
}

    };

    // return (
    //     <div>

    //         <h1>Register</h1>

    //         <input
    //             placeholder="Username"
    //             onChange={(e)=>setUsername(e.target.value)}
    //         />

    //         <br/><br/>

    //         <input
    //             placeholder="Email"
    //             onChange={(e)=>setEmail(e.target.value)}
    //         />

    //         <br/><br/>

    //         <input
    //             type="password"
    //             placeholder="Password"
    //             onChange={(e)=>setPassword(e.target.value)}
    //         />

    //         <br/><br/>

    //         <button onClick={handleRegister}>
    //             Register
    //         </button>
    //         <br /><br />

    //         <button
    //         onClick={() => navigate("/")}
    //         >
    //         Back To Login
    //         </button>
            
    //     </div>
    // );

    return (

    <div className="auth-container">

        <div className="auth-card">

            <h1>Create Account</h1>

            <p>
                Join the clothing exchange community.
            </p>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button
                onClick={handleRegister}
            >
                Register
            </button>

            <p className="auth-link">
                Already have an account?{" "}

                <span
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Login
                </span>
            </p>

        </div>

    </div>

);
}

export default Register;