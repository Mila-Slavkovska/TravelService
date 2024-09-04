import {Navigate, Route, Routes, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import MyTripsPage from "../Trips/MyTripsPage/MyTripsPage";
import Header from "../Navbar/Header";
import AddNewTripPage from "../Trips/AddNewTripPage/AddNewTripPage";
import EditTripPage from "../Trips/EditTripPage/EditTripPage";
import GetRequestPage from "../Trips/GptRequestPage/GptRequestPage";
import {getTrip} from "../../repository/travelService";
import LogIn from "../UserManagement/LogIn/LogIn";
import {AuthProvider} from "../../context/AuthContext";
import Register from "../UserManagement/Register/Register";

function App() {
    const flag = true;
  return (
      <AuthProvider>
        <Router>
            <Header/>
            <main>
                <div className={"container pb-5"}>
                    <Routes>
                        <Route path={"/login"} element={<LogIn/>}/>
                        <Route path={"/signup"} element={<Register/>}/>
                        <Route path={"/home"} element={<MyTripsPage/>}/>
                        <Route path={"/trips"} element={<MyTripsPage/>}/>
                        <Route path={"/plan-trip"} element={<AddNewTripPage/>}/>
                        <Route path={"/edit-trip/:id"} element={<EditTripPage/>}/>
                        <Route path={"/gpt-request"} element={<GetRequestPage/>}/>
                        <Route path="/" element={
                            <Navigate replace to="/home" />
                        } />
                        <Route path="*" element={<Navigate to ="/" />}/>
                    </Routes>
                </div>
            </main>
        </Router>
      </AuthProvider>
  );
}

export default App;
