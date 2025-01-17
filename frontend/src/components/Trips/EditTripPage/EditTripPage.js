import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import {
    editTrip,
    getAccommodation,
    getAccommodations,
    getAttraction,
    getAttractions,
    getTrip, searchAccommodations, searchAttractions
} from "../../../repository/travelService";
import {getDaysBetween} from "../../../utils/daysBetween";
import {FixedSizeList as List} from "react-window";
import {AuthContext} from "../../../context/AuthContext";

export default function EditTripPage(){
    const { id } = useParams();
    const [inputs, setInputs] = useState({budget: 0});

    const navigate = useNavigate();
    const [myBudget, setMyBudget] = useState(0.0);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [searchAttractionsParams, setSearchAttractionsParams] = useState({name: "", location: "", type: ""});
    const [searchAccommodationsParams, setSearchAccommodationsParams] = useState({name: "", location: "", type: ""});

    const [attractions, setAttractions] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [selectedAccommodations, setSelectedAccommodations] = useState([]);

    if(!localStorage.getItem("token")){
        navigate("/login");
    }

    useEffect( () => {
        async function fetchTrip(){
            const dataAttr = await getAttractions();
            const dataAcc = await getAccommodations();
            const data = await getTrip(id);

            const attrIds = data.attractions.map(a => a.id);
            const accIds = data.accommodations.map(a => a.id);

            data.attractions = [...attrIds];
            data.accommodations = [...accIds];

            setAttractions(dataAttr);
            setAccommodations(dataAcc);
            setSelectedAttractions([...attrIds]);
            setSelectedAccommodations([...accIds]);
            setInputs(data);
            setDataLoaded(true);
        }

        fetchTrip();
    }, []);


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

    function handleAttrParamsChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setSearchAttractionsParams(values => ({...values, [name]: value}));
    }

    async function handleSearchAttractions(){
        const data = await searchAttractions(searchAttractionsParams);
        setAttractions(data);
    }

    function handleAccParamsChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setSearchAccommodationsParams(values => ({...values, [name]: value}));
    }

    async function handleSearchAccommodations(){
        const data = await searchAccommodations(searchAccommodationsParams);
        setAccommodations(data);
    }

    function handleSubmit(event){
        event.preventDefault();
        if(myBudget > inputs.budget){
            return;
        }

        editTrip(id, inputs).then(() => navigate("/trips"));
    }

    return (
        <div className="container mt-5 bg-white">
            <img className={"d-flex justify-content-center"} src={"https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Travel-logo-design-Graphics-9786083-1-1-580x435.jpg"} style={{width: 200, margin: 'auto'}} alt="a moving car"/>
            <form onSubmit={handleSubmit} className={"m-5 mt-0 border rounded-2 shadow p-4"}>
                <h3>Let's change the plans for your trip!</h3>
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
                <div className={"d-flex justify-content-end px-md-4"}>
                    <input
                        type="text"
                        name="name"
                        value={searchAttractionsParams.name || ""}
                        placeholder="Name"
                        onChange={handleAttrParamsChange}
                        className={"form-control-sm mx-2"}
                    />
                    <input
                        type="text"
                        name="location"
                        value={searchAttractionsParams.location || ""}
                        placeholder="Location"
                        onChange={handleAttrParamsChange}
                        className={"form-control-sm mx-2"}
                    />
                    <select name="type" onChange={handleAttrParamsChange} className={"form-control-sm mx-2"}>
                        <option value="">--Type--</option>
                        <option value="PARK">Park</option>
                        <option value="BEACH">Beach</option>
                        <option value="CAVE">Cave</option>
                        <option value="MOUNTAIN">Mountain</option>
                        <option value="MUSEUM">Museum</option>
                        <option value="GALLERY">Gallery</option>
                        <option value="HISTORIC_SITE">Historic site</option>
                        <option value="ENTERTAINMENT_PARK">Entertainment Park</option>
                        <option value="SPORT">Sport</option>
                    </select>
                    <p className={"btn btn-light border mb-auto"} onClick={handleSearchAttractions}>Search</p>
                </div>
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
                <div className={"d-flex justify-content-end px-md-4"}>
                    <input
                        type="text"
                        name="name"
                        value={searchAccommodationsParams.name || ""}
                        placeholder="Name"
                        onChange={handleAccParamsChange}
                        className={"form-control-sm mx-2"}
                    />
                    <input
                        type="text"
                        name="location"
                        value={searchAccommodationsParams.location || ""}
                        placeholder="Location"
                        onChange={handleAccParamsChange}
                        className={"form-control-sm mx-2"}
                    />
                    <select name="type" onChange={handleAccParamsChange} className={"form-control-sm mx-2"}>
                        <option value="">--Type--</option>
                        <option value="HOTEL">Hotel</option>
                        <option value="STUDIO">Studio</option>
                        <option value="APARTMENT">Apartment</option>
                    </select>
                    <p className={"btn btn-light border mb-auto"} onClick={handleSearchAccommodations}>Search</p>
                </div>
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
                                            checked={isCheckedAcc(accommodations[index].id)}
                                            onChange={handleCheckboxChangeAcc}
                                            className="form-check-input pointerCursor"
                                        />
                                        <label className="form-check-label d-flex justify-content-between px-2">
                                            <span>{accommodations[index].name} ({accommodations[index].rating})</span>
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
                    {inputs.budget >= myBudget && <span> &#8364;{myBudget}</span> }
                    {inputs.budget < myBudget && <span className={"text-danger"}> &#8364;{myBudget}, cost is higher than your budget!</span> }
                </p>

                <button disabled={myBudget>inputs.budget} className={"btn btn-warning text-white rounded-1 mt-4 text-center w-100 fs-5"}>Edit trip</button>
            </form>
        </div>
    )
}