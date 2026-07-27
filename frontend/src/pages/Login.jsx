import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await axios.post(
                `${API_BASE_URL}/api/login/`,
                {
                    username,
                    password
                }
            );

            if(response.data.success){

                localStorage.setItem(
                    "username",
                    username
                );

                navigate("/dashboard");

            }else{

                alert(response.data.message);
                navigate("/");

            }

        } catch(error){

            console.log(error);

        }
    };

    // return (
    //     <div>

    //         <h1>Login</h1>

    //         <input
    //             placeholder="Username"
    //             onChange={(e)=>setUsername(e.target.value)}
    //         />

    //         <br/><br/>

    //         <input
    //             type="password"
    //             placeholder="Password"
    //             onChange={(e)=>setPassword(e.target.value)}
    //         />

    //         <br/><br/>

    //         <button onClick={handleLogin}>
    //             Login
    //         </button>
    //         <br /><br />

    //         <button
    //         onClick={() => navigate("/register")}
    //         >
    //         Register Here
    //         </button>
            
    //     </div>
    // );

    return (

    <div className="auth-container">

        <div className="auth-card">

            <h1>Welcome Back</h1>

            <p>
                Login to continue swapping clothes.
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button
                onClick={handleLogin}
            >
                Login
            </button>

            <p className="auth-link">
                Don't have an account?{" "}

                <span
                    onClick={() =>
                        navigate("/register")
                    }
                >
                    Register
                </span>
            </p>

        </div>

    </div>

);
}

export default Login;