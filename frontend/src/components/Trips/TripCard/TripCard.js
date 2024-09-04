import React, {useState} from "react";
import {formatDate} from "../../../utils/dateFormatter";
import "./TripCard.css"
import {compareDates} from "../../../utils/dateComparator";
import TripDetails from "../TripDetails/TripDetails";

export default function TripCard({myTrip, setTrips}){
    const [isOpen, setIsOpen] = useState(false);
    function handleClick(id){
        setIsOpen(true);
    }

    return (
        <>
            {isOpen && <TripDetails trip={myTrip} open={isOpen} setOpen={setIsOpen} setTrips={setTrips}/>}
        <div className={ compareDates(myTrip.date_from) ? "card col-md-4 p-0 myTripCardPast shadow-sm" : "card col-md-4 p-0 myTripCard shadow-sm"
        } onClick={() => handleClick(myTrip.id)}>
            <div className={"card-header text-end mb-2"}>
                {formatDate(myTrip.date_from)} - {formatDate(myTrip.date_to)}
            </div>
            <div className="card-body">
                <div className="text-center card-title">
                    <h5 className="card-title">{myTrip.name}</h5>
                </div>
                <hr/>
                <div className={"d-flex justify-content-around"}>
                    <p className="card-text fw-bold">My budget: </p><p>&#8364;{myTrip.budget}</p>
                </div>
                <div className={"d-flex justify-content-around"}>
                    <p className="card-text fw-bold">Number of people: </p><p>{myTrip.numPeople}</p>
                </div>
            </div>
        </div>
        </>
    )
}