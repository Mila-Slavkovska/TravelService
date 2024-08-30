import {Navigate, Route, Routes, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import MyTripsPage from "../Trips/MyTripsPage/MyTripsPage";
import Header from "../Navbar/Header";
import AddNewTripPage from "../Trips/AddNewTripPage/AddNewTripPage";

function App() {
  return (
    <Router>
        <Header/>
        <main>
            <div className={"container pb-5"}>
                <Routes>
                    <Route path={"/home"} element={<MyTripsPage/>}/>
                    <Route path={"/trips"} element={<MyTripsPage/>}/>
                    <Route path={"/plan-trip"} element={<AddNewTripPage/>}/>
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
