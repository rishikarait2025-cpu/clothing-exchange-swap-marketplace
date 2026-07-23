import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {

    const [profile, setProfile] =
        useState(null);

    const username =
        localStorage.getItem("username");


    const fetchProfile = async () => {

        try {

            const response =
                await axios.get(
                    `http://127.0.0.1:8000/api/profile/?username=${username}`
                );

            setProfile(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchProfile();

    }, []);


    if (!profile) {

        return (
            <p>
                Loading profile...
            </p>
        );

    }


    return (

        <>

            <Navbar />

            <div className="profile-container">

                <h1>
                    My Profile
                </h1>

                <div className="profile-card">

                    <h2>
                        {profile.username}
                    </h2>

                    <p>
                        Email: {profile.email}
                    </p>

                    <p>
                        Total Listings:
                        {" "}
                        {profile.total_listings}
                    </p>

                    <p>
                        Accepted Swaps:
                        {" "}
                        {profile.accepted_swaps}
                    </p>

                    <p>
                        Pending Requests:
                        {" "}
                        {profile.pending_requests}
                    </p>

                </div>

            </div>

        </>

    );

}

export default Profile;