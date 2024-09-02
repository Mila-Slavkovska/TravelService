import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {deleteTrip, getTrips} from "../../../repository/travelService";
import {useNavigate} from "react-router-dom";
import './tripDetails.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export  default function TripDetails({trip, open, setOpen, setTrips}){
    const navigate = useNavigate();
    const handleClose = () => setOpen(false);

    function handleEdit(){
        navigate(`/edit-trip/${trip.id}`);
    }

    async function handleDelete(){
        handleClose();
        await deleteTrip(trip.id);
        setTrips((prevTrips) => {
            return prevTrips.filter(t => t.id !== trip.id);
        });
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div className={"d-flex justify-content-around"}>
                        <h4 className={"align-self-center fw-bold"}>{trip.name}</h4>
                        <div>
                            <button id="edit" className={"btn btn-outline-info mx-2"} onClick={handleEdit}>Edit</button>
                            <button className={"btn btn-danger"} onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </Typography>
                <hr/>
                <div id="modal-modal-body" sx={{ mt: 2 }}>
                    <div className={"d-flex justify-content-around"}>
                        <p className="card-text fw-bold">My budget: </p><p>&#8364;{trip.budget}</p>
                    </div>
                    <div className={"d-flex justify-content-around"}>
                        <p className="card-text fw-bold">Number of people: </p><p>{trip.numPeople}</p>
                    </div>
                    <hr/>
                    <div className={"px-md-5"}>
                        <h5>Attractions:</h5>
                        {trip.attractions.length===0 && <p>There are no attractions for this trip.</p>}
                        {trip.attractions.length>0 && (
                            <ul className={"row"}>
                                {trip.attractions.map((a) => {
                                    return <li key={a.id} className={"col-md-4"}>{a.name}</li>
                                })}
                            </ul>
                        )}
                    </div>
                    <div className={"px-md-5"}>
                        <h5>Accommodations:</h5>
                        {trip.accommodations.length===0 && <p>There are no accommodations for this trip.</p>}
                        {trip.accommodations.length>0 && (
                            <ul className={"row"}>
                                {trip.accommodations.map((a) => {
                                    return <li key={a.id} className={"col-md-4"}>{a.name}</li>
                                })}
                            </ul>
                        )}
                    </div>
                    <div className={"fs-6 fw-lighter text-center text-secondary"}>Click away to close</div>
                </div>
            </Box>
        </Modal>
    )
}