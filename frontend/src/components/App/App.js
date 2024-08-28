import {Navigate, Route, Routes, BrowserRouter as Router} from "react-router-dom";
import './App.css';
import MyTripsPage from "../Trips/MyTripsPage/MyTripsPage";
import Header from "../Navbar/Header";

function App() {
  return (
    <Router>
        <Header/>
        <main>
            <div className={"container pb-5"}>
                <Routes>
                    <Route path={"/trips"} element={<MyTripsPage/>}/>
                    <Route path="/" element={
                        <Navigate replace to="/trips" />
                    } />
                    <Route path="*" element={<Navigate to ="/" />}/>
                </Routes>
            </div>
        </main>
    </Router>
  );
}

export default App;
