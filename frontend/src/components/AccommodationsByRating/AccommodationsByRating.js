import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import { getTopAccommodations } from '../../../src/repository/travelService';
import './AccommodationsByRating.css';

export default function AccommodationsByRating() {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTopAccommodations();
                setAccommodations(data);
            } catch (error) {
                console.error('Error fetching accommodations:', error);
            }
        };

        fetchData();
    }, []);

    const sortedAccommodations = [...accommodations].sort((a, b) => b.rating - a.rating);

    return (
        <div className="container">
            <Typography variant="h4" component="h1" gutterBottom>
                Top Rated Accommodations
            </Typography>
            <Typography variant="h6" component="h1" gutterBottom>
                If in doubt, check out which accommodations people were the most satisfied by!
            </Typography>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Rating</th>
                </tr>
                </thead>
                <tbody>
                {sortedAccommodations.map(accommodation => (
                    <tr key={accommodation.id}>
                        <td>{accommodation.name}</td>
                        <td>{accommodation.rating}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="accommodations">
                <img alt="img" src="/images/pexels-photo-6775268.jpeg" />
            </div>
        </div>
    );
}
