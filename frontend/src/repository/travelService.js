import instance from '../custom-axios/axios'

export async function getTrips(){
    try {
        const response = await instance.get("/trips");
        return response.data;
    } catch (error){
        console.log("Error fetching trips: " + error);
        throw error;
    }
}

export async function getAttractions(){
    try {
        const response = await instance.get("/attractions");
        return response.data;
    } catch (error){
        console.log("Error fetching attractions: " + error);
        throw error;
    }
}

export async function getAccommodations(){
    try {
        const response = await instance.get("/accommodations");
        return response.data;
    } catch (error){
        console.log("Error fetching accommodations: " + error);
        throw error;
    }
}

export async function getAttraction(id){
    try {
        const response = await instance.get(`/attractions/${id}`);
        return response.data;
    } catch (error){
        console.log("Error fetching attraction by id: " + error);
        throw error;
    }
}

export async function getAccommodation(id){
    try {
        const response = await instance.get(`/accommodations/${id}`);
        return response.data;
    } catch (error){
        console.log("Error fetching accommodation by id: " + error);
        throw error;
    }
}

export async function deleteTrip(id){
    try{
        await instance.delete(`/trips/${id}`);
    } catch (error){
        console.log("Error deleting trip: " + error);
        throw error;
    }
}

export async function addTrip(tripDto){
    const response = await instance.post("/trips", {...tripDto});
}