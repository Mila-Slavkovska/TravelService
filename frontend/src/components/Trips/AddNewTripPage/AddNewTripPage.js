import {useCallback, useEffect, useState} from "react";
import {FixedSizeList as List} from "react-window";
import {addTrip, getAccommodations, getAttractions} from "../../../repository/travelService";
import {useNavigate} from "react-router-dom";

export default function AddNewTripPage(){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({})
    const [attractions, setAttractions] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [selectedAccommodations, setSelectedAccommodations] = useState([]);

    const isSelected = useCallback(
        (id) => selectedAttractions.includes(id),
        [selectedAttractions]
    );
    const isChecked = (id) => isSelected(id);

    const isSelectedAcc = useCallback(
        (id) => selectedAccommodations.includes(id),
        [selectedAccommodations]
    );
    const isCheckedAcc = (id) => isSelectedAcc(id);

    useEffect(() => {
        async function fetchTrips(){
            const dataAttr = await getAttractions();
            const dataAcc = await getAccommodations();

            setAttractions(dataAttr);
            setAccommodations(dataAcc);
        }
        fetchTrips();
    }, []);

    useEffect(() => {
        setInputs(values => ({...values, attractions: selectedAttractions}));
    }, [selectedAttractions]);

    useEffect(() => {
        setInputs(values => ({...values, accommodations: selectedAccommodations}));
    }, [selectedAccommodations]);

    function handleCheckboxChange(event) {
        const { value, checked } = event.target;
        const id = +value;

        setSelectedAttractions((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((attractionId) => attractionId !== id)
                : [...prevSelected, id]
        );
    }

    function handleCheckboxChangeAcc(event){
        const { value, checked } = event.target;
        const id = +value;

        setSelectedAccommodations((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((attractionId) => attractionId !== id)
                : [...prevSelected, id]
        );
    }

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    function handleSubmit(event){
        event.preventDefault();
        addTrip(inputs).then(() => navigate("/trips"));
    }

    return (
        <form onSubmit={handleSubmit} className={"m-5"}>
            <h3>Let's start planning your next trip!</h3>
            <hr className={"my-4"}/>
            <h5>General information about your trip</h5>
            <div className={"form-group d-md-inline-block px-md-3 py-2"}>
                <label htmlFor="name" className={"me-3"}>Trip name: </label>
                <input id="name" type="text" name="name" className={"d-inline w-auto form-control"}
                       value={inputs.name || ""} onChange={handleChange} required/>
            </div>
            <div className={"form-group d-md-inline-block px-md-3 py-2"}>
                <label htmlFor="numPeople" className={"me-3"}>Number of travelers: </label>
                <input id="numPeople" type="number" min="1" step="1" name="numPeople" className={"d-inline w-auto form-control"}
                       value={inputs.numPeople || ""} onChange={handleChange} required/>
            </div>
            <div className={"d-md-inline-block px-md-3 py-2"}>
                <div className="form-group d-flex align-items-center">
                    <label htmlFor="budget" className="me-3">Budget:</label>
                    <div className="input-group w-auto">
                        <div className="input-group-prepend">
                            <div className="input-group-text">&#8364;</div>
                        </div>
                        <input id="budget" type="number" min="0" step="0.01" name="budget" className="form-control"
                               value={inputs.budget || ""} onChange={handleChange} required/>
                    </div>
                </div>
            </div>

            <hr className={"my-4"}/>
            <h5>When do you plan to travel?</h5>
            <div className={"d-flex justify-content-center"}>
            <div className={"form-group d-md-inline-block px-md-3 py-2"}>
                <label htmlFor="date_from" className={"me-3"}>From: </label>
                <input id="date_from" type="datetime-local" name="date_from" className={"d-inline w-auto form-control"}
                       value={inputs.date_from || ""} onClick={handleChange} onChange={handleChange} required/>
            </div>
            <div className={"form-group d-md-inline-block px-md-3 py-2"}>
                <label htmlFor="date_to" className={"me-3"}>To: </label>
                <input id="date_to" type="datetime-local" name="date_to" className={"d-inline w-auto form-control"}
                       value={inputs.date_to || ""} onChange={handleChange} required/>
            </div>
            </div>
            <hr className={"my-4"}/>

            <h5>Would you like to visit any of these attractions?</h5>
            <div>Search params coming soon...</div>
            <div className="form-group">
                <div className={"bg-light p-2 rounded-2 shadow"}>
                <label className={"fw-bold p-3"}>Select Attractions:</label>
                <List
                    height={200}
                    itemCount={attractions.length}
                    itemSize={45}
                    width={600}
                    className={"m-auto bg-white rounded"}
                    // style={{backgroundColor: 'coral'}}
                >
                    {({ index }) => (
                        <div className="form-check py-2 addBorder">
                            <input
                                type="checkbox"
                                value={attractions[index].id}
                                checked={isChecked(attractions[index].id)}
                                onChange={handleCheckboxChange}
                                className="form-check-input"
                            />
                            <label className="form-check-label">{attractions[index].name}</label>
                        </div>
                    )}
                </List>
                </div>
            </div>
            <hr className={"my-4"}/>

            <h5>Would you like to stay somewhere during your trip?</h5>
            <div>Search params coming soon...</div>
            <div className="form-group">
                <div className={"bg-light p-2 rounded-2 shadow"}>
                    <label className={"fw-bold p-3"}>Select Accommodations:</label>
                    <List
                        height={200}
                        itemCount={accommodations.length}
                        itemSize={45}
                        width={600}
                        className={"m-auto bg-white rounded"}
                    >
                        {({ index }) => (
                            <div className="form-check py-2 addBorder">
                                <input
                                    type="checkbox"
                                    value={accommodations[index].id}
                                    checked={isCheckedAcc(accommodations[index].id)}
                                    onChange={handleCheckboxChangeAcc}
                                    className="form-check-input"
                                />
                                <label className="form-check-label">{accommodations[index].name}</label>
                            </div>
                        )}
                    </List>
                </div>
            </div>

            <button className={"btn btn-warning text-white rounded-1 mt-4 text-center w-100 fs-5"}>Finish planning trip</button>
        </form>
    )
}