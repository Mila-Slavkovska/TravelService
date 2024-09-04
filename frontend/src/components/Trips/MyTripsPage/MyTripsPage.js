import {getTrips} from "../../../repository/travelService";
import {useContext, useEffect, useState} from "react";
import TripCard from "../TripCard/TripCard";
import "./MyTripsPage.css"
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function MyTripsPage (){
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    async function fetchTrips(){
        if(!localStorage.getItem("token")){
            navigate("/login");
        } else {
            const data = await getTrips();
            // console.log(data);
            setTrips(data);
        }
    }
        fetchTrips();
    }, []);


    
    return (
        <div className={"container-fluid px-5 bg-white"}>
        <header className={"pt-5 pb-2 d-flex justify-content-between"}>
            <h2>My trips</h2>
            <div className={"align-self-center"}>
                Upcoming <span className={"rounded-circle"} id="upcoming">......</span>
                &nbsp;&nbsp; Past <span className={"rounded-circle"} id="past">......</span>
            </div>
        </header>
            <hr/>
        <div className={"row d-flex justify-content-start"}>
            {trips.length === 0 && <p className={"text-center"}>No trips to show</p>}
            {trips.length > 0 && (
                trips.map((trip) => <TripCard key={trip.id} myTrip={trip} setTrips={setTrips}/>)
            )}
        </div>
        </div>
    )
}