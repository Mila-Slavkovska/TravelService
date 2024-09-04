import { useState } from "react";
import { sendGptRequest, findAttractions, findAccommodations } from "../../../repository/travelService";
import { useNavigate } from "react-router-dom";

export default function GetRequestPage() {
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [gptResponse, setGptResponse] = useState(null);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [selectedAccommodations, setSelectedAccommodations] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await sendGptRequest({ location, budget });
            const dbAttractions = await Promise.all(
                response.attractions.map(attraction =>
                    findAttractions({ name: attraction.name, location: attraction.location })
                )
            );
            const dbAccommodations = await Promise.all(
                response.accommodations.map(accommodation =>
                    findAccommodations({ name: accommodation.name, location: accommodation.location })
                )
            );
            setGptResponse({
                attractions: dbAttractions.filter(item => item.length > 0).map(item => item[0]),
                accommodations: dbAccommodations.filter(item => item.length > 0).map(item => item[0])
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleAttractionChange = (id) => {
        setSelectedAttractions(prev =>
            prev.includes(id)
                ? prev.filter(a => a !== id)
                : [...prev, id]
        );
    };

    const handleAccommodationChange = (id) => {
        setSelectedAccommodations(prev =>
            prev.includes(id)
                ? prev.filter(a => a !== id)
                : [...prev, id]
        );
    };

    const handleAddTrip = () => {
        navigate('/plan-trip', {
            state: { selectedAttractions, selectedAccommodations }
        });
    };

    return (
        <div className="container mt-5">
            <img
                src="https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Travel-logo-design-Graphics-9786083-1-1-580x435.jpg"
                style={{ width: 200, margin: 'auto', display: 'block' }}
                alt="a moving car"
                className="mb-4"
            />
            <div className="border rounded-2 shadow p-4">
                <h3 className="text-center">Plan Your Trip with GPT</h3>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3 row">
                        <label htmlFor="location" className="form-label col-sm-2">Location</label>
                        <div className="col-sm-6">
                            <input
                                type="text"
                                className="form-control"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="budget" className="form-label col-sm-2">Budget</label>
                        <div className="col-sm-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">€</div>
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="budget"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Get Recommendations</button>
                </form>
            </div>
            {gptResponse && (
                <div className="mt-4 border rounded-2 shadow p-4">
                    <h4 className="text-center">Recommendations</h4>

                    <div className="mt-4">
                        <h5>Attractions</h5>
                        <ul className="list-group">
                            {gptResponse.attractions.map((attraction) => (
                                <li key={attraction.id} className="list-group-item">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={attraction.id}
                                            checked={selectedAttractions.includes(attraction.id)}
                                            onChange={() => handleAttractionChange(attraction.id)}
                                        />
                                        <label className="form-check-label">
                                            {`${attraction.name} - ${attraction.description} - €${attraction.price}`}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4">
                        <h5>Accommodations</h5>
                        <ul className="list-group">
                            {gptResponse.accommodations.map((accommodation) => (
                                <li key={accommodation.id} className="list-group-item">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={accommodation.id}
                                            checked={selectedAccommodations.includes(accommodation.id)}
                                            onChange={() => handleAccommodationChange(accommodation.id)}
                                        />
                                        <label className="form-check-label">
                                            {`${accommodation.name} - €${accommodation["price per night"] || accommodation.pricePerNight} EUR/night - Rating: ${accommodation.rating}`}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleAddTrip} className="btn btn-success mt-4 w-100">Proceed to Planning Your Trip</button>
                </div>
            )}
        </div>
    );
}