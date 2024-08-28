import React from "react";
import {formatDate} from "../../../utils/dateFormatter";
import "./TripCard.css"

export default function TripCard({myTrip}){
    const today = new Date();
    const dateFrom = new Date(myTrip.date_from);
    console.log(today>dateFrom)
    function handleClick(id){
        console.log(id)
    }

    return (
        <div className={ today>dateFrom ? "card col-md-4 p-0 myTripCardPast shadow-sm" : "card col-md-4 p-0 myTripCard shadow-sm"
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
                    <p className="card-text fw-bold">My budget: </p><p>{myTrip.budget}EU</p>
                </div>
                <div className={"d-flex justify-content-around"}>
                    <p className="card-text fw-bold">Number of people: </p><p>{myTrip.numPeople}</p>
                </div>
            </div>
        </div>
    )
}