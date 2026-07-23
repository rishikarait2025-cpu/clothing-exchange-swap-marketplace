import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddListing from "./pages/AddListing";
import MyListings from "./pages/MyListings";
import BrowseListings from "./pages/BrowseListings";
import SwapRequests from "./pages/SwapRequests";
import OutgoingSwaps from "./pages/OutgoingSwaps";
import ItemDetail from "./pages/ItemDetail";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/add-listing"
          element={<AddListing />}
        />
        <Route
          path="/my-listings"
          element={<MyListings />}
        />
        <Route
          path="/browse"
          element={<BrowseListings />}
        />
        <Route
          path="/swap-requests"
          element={<SwapRequests />}
        />
        <Route
          path="/outgoing-swaps"
          element={<OutgoingSwaps/>}
        />  
        <Route
          path="/item/:id"
          element={<ItemDetail />}
        />  
        <Route
          path="/chat"
          element={<Chat />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>

    </BrowserRouter>

  );

}

export default App;