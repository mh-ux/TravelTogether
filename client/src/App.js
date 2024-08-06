import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreateGroup from './pages/CreateGroup';
import InviteMember from './pages/InviteMember';
import GroupProfile from './pages/GroupProfile';
import CreateTrip from './pages/CreateTrip';
import TripList from './pages/TripList';
//import TripDetails from './pages/TripDetails';
import InviteToTrip from './pages/InviteMember';
import JoinTrip from './pages/JoinTrip';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import CalendarView from './pages/CalendarView';
import Trip from './pages/Trip';
import AddUsers from './pages/AddUsers'; // Import AddUsers component


const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/create" element={<CreateGroup />} />
                <Route path="/invite-member" element={<InviteMember />} />
                <Route path="/group/:groupId" element={<GroupProfile />} />
                <Route path="/create-trip" element={<CreateTrip />} />
                <Route path="/my-trips" element={<TripList />} />
                <Route path="/trip/:tripId/join" element={<JoinTrip />} />
                <Route path="/trip/:tripId" exact element={<Trip />} />
                <Route path="/invite-to-trip" element={<InviteToTrip />} />
                <Route path="/trip/:tripId/calendar" element={<CalendarView />} />
                <Route path="/add-users/:tripId" element={<AddUsers />} /> {/* Add the AddUsers route */}
                <Route path="/itinerary/:tripId" element={<Itinerary />} />



            </Routes>
        </Router>
    );
};

export default App;
