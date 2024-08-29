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

export async function deleteTrip(id){
    try{
        await instance.delete(`/trips/${id}`);
    } catch (error){
        console.log("Error deleting trip: " + error);
        throw error;
    }
}