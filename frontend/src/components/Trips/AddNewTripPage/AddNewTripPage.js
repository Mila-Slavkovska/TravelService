import {useCallback, useEffect, useState} from "react";
import {FixedSizeList as List} from "react-window";
import {
    addTrip,
    getAccommodations,
    getAttractions,
    getAccommodation,
    getAttraction
} from "../../../repository/travelService";
import {useNavigate} from "react-router-dom";
import {getDaysBetween} from "../../../utils/daysBetween";

export default function AddNewTripPage(){
    const navigate = useNavigate();
    const [myBudget, setMyBudget] = useState(0.0);
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

    useEffect( () => {
        const calculateMoney = async () => {
            let money = 0;
            const numPeople = inputs.numPeople || 1;
            let days = 1;

            if (inputs.date_from && inputs.date_to) {
                days = getDaysBetween(inputs.date_from, inputs.date_to);
            }

            const attractionPrices = await Promise.all(
                selectedAttractions.map(async id => {
                    const data = await getAttraction(id);
                    return data.price;
                })
            );

            const accommodationPrices = await Promise.all(
                selectedAccommodations.map(async id => {
                    const data = await getAccommodation(id);
                    return data.pricePerNight;
                })
            );

            money += attractionPrices.length>0 && attractionPrices.reduce((acc, p) => acc + p*numPeople, 0);
            money += accommodationPrices.length>0 && accommodationPrices.reduce((acc, p) => acc +p*numPeople*days, 0);

            setMyBudget(money);
        };

        calculateMoney();

    }, [selectedAttractions, selectedAccommodations, inputs]);
    async function handleCheckboxChange(event) {
        const { value } = event.target;
        const id = +value;

        setSelectedAttractions((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((attractionId) => attractionId !== id)
                : [...prevSelected, id]
        );
    }

    async function handleCheckboxChangeAcc(event){
        const { value} = event.target;
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
        if(myBudget > inputs.budget){
            return;
        }
        addTrip(inputs).then(() => navigate("/trips"));
    }

    return (
        <>
            <img className={"d-flex justify-content-center"} src={"https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Travel-logo-design-Graphics-9786083-1-1-580x435.jpg"} style={{width: 200, margin: 'auto'}} alt="a moving car"/>
        <form onSubmit={handleSubmit} className={"m-5 mt-0 border rounded-2 shadow p-4"}>
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
                       value={inputs.date_from || ""} onChange={handleChange} required/>
            </div>
            <div className={"form-group d-md-inline-block px-md-3 py-2"}>
                <label htmlFor="date_to" className={"me-3"}>To: </label>
                <input id="date_to" type="datetime-local" name="date_to" className={"d-inline w-auto form-control"}
                       value={inputs.date_to || ""} onChange={handleChange} required/>
            </div>
            </div>
            <hr className={"my-4"}/>

            <h5>Would you like to visit any of these attractions?</h5>
            <div>Search params coming soon... <b>By name</b> <b>By location</b> <b>By type</b></div>
            <div className="form-group">
                <div className={"bg-light p-2 rounded-2 shadow"}>
                <label className={"fw-bold p-3"}>Select Attractions:</label>
                <div>
                    <h6 className={"m-auto w-25 pb-2 d-flex justify-content-between display-none"}>
                        <span>Name:</span>
                        <span>Price: </span>
                    </h6>

                <List
                    height={200}
                    itemCount={attractions.length}
                    itemSize={45}
                    width={450}
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
                            <label className="form-check-label d-flex justify-content-between px-2">
                                <span>{attractions[index].name}</span>
                                <span>&#8364;{attractions[index].price}</span>
                            </label>
                        </div>
                    )}
                </List>
                </div>
                </div>
            </div>
            <hr className={"my-4"}/>

            <h5>Would you like to stay somewhere during your trip?</h5>
            <div>Search params coming soon...</div>
            <div className="form-group">
                <div className={"bg-light p-2 rounded-2 shadow"}>
                    <label className={"fw-bold p-3"}>Select Accommodations:</label>
                    <div>
                        <h6 className={"m-auto w-25 pb-2 d-flex justify-content-between display-none"}>
                            <span>Name:</span>
                            <span>Price per night: </span>
                        </h6>
                    <List
                        height={200}
                        itemCount={accommodations.length}
                        itemSize={45}
                        width={450}
                        className={"m-auto bg-white rounded"}
                    >
                        {({ index }) => (
                            <div className="form-check py-2 addBorder">
                                <input
                                    type="checkbox"
                                    value={accommodations[index].id}
                                    cost={accommodations[index].pricePerNight}
                                    checked={isCheckedAcc(accommodations[index].id)}
                                    onChange={handleCheckboxChangeAcc}
                                    className="form-check-input pointerCursor"
                                />
                                <label className="form-check-label d-flex justify-content-between px-2">
                                    <span>{accommodations[index].name}</span>
                                    <span>&#8364;{accommodations[index].pricePerNight}</span>
                                </label>
                            </div>
                        )}
                    </List>
                    </div>
                </div>
            </div>
            <hr className={"my-4"}/>

            <p className={"display-6"}>
                Total trip cost:
                {inputs.budget?.length > 0 && inputs.budget >= myBudget && <span> &#8364;{myBudget}</span> }
                {inputs.budget?.length > 0 && inputs.budget < myBudget && <span className={"text-danger"}> &#8364;{myBudget}, cost is higher than your budget!</span> }
                {!inputs.budget?.length > 0 && <span className={"text-primary-emphasis"}> Please enter your budget for the trip!</span> }
            </p>

            <button disabled={myBudget>inputs.budget} className={"btn btn-warning text-white rounded-1 mt-4 text-center w-100 fs-5"}>Finish planning trip</button>
        </form>
        </>
    )
}