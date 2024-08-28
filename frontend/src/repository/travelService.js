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