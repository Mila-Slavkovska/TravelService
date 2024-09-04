import {Navigate, Route, Routes, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import MyTripsPage from "../Trips/MyTripsPage/MyTripsPage";
import Header from "../Navbar/Header";
import AddNewTripPage from "../Trips/AddNewTripPage/AddNewTripPage";
import EditTripPage from "../Trips/EditTripPage/EditTripPage";
import {getTrip} from "../../repository/travelService";
import HomePage from "../Homepage/HomePage";

function App() {
  return (
    <Router>
        <div className="app-container"></div>
        <Header/>
        <main>
            <div className={"container pb-5"}>
                <Routes>
                    //TODO: Add home page
                    <Route path={"/home"} element={<HomePage/>}/>
                    <Route path={"/trips"} element={<MyTripsPage/>}/>
                    <Route path={"/plan-trip"} element={<AddNewTripPage/>}/>
                    <Route path={"/edit-trip/:id"} element={<EditTripPage/>}/>
                    <Route path="/" element={
                        <Navigate replace to="/home" />
                    } />
                    <Route path="*" element={<Navigate to ="/" />}/>
                </Routes>
            </div>
        </main>
    </Router>
  );
}

export default App;
