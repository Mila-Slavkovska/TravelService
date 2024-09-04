import instance from '../custom-axios/axios'

export async function getTrips(){
    const token = localStorage.getItem('token');
    try {
        const response = await instance.get("/trips", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error){
        console.log("Error fetching trips: " + error);
        throw error;
    }
}

export async function getTripsByName(name){
    const token = localStorage.getItem('token');
    try {
        const response = await instance.get(`/trips?name=${name}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error){
        console.log("Error fetching trips by name: " + error);
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

export async function getTopAccommodations(){
    try {
        const response = await instance.get("/accommodations/toprated");
        return response.data;
    } catch (error){
        console.log("Error fetching accommodations: " + error);
        throw error;
    }
}

export async function getTrip(id){
    const token = localStorage.getItem("token");
    try {
        const response = await instance.get(`/trips/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error){
        console.log("Error fetching trip by id: " + error);
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

export async function editTrip(id, tripDto){
    const token = localStorage.getItem("token");
    try{
        const response = await instance.put(`/trips/${id}`, {...tripDto}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error){
        console.log("Error editing trip: " + error);
        throw error;
    }
}

export async function addTrip(tripDto){
    const token = localStorage.getItem('token');
    try{
        const response = await instance.post("/trips", {...tripDto}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error){
        console.log("Error adding trip: " + error);
        throw error;
    }
}

export  async  function searchAttractions({name, location, type}){
    try{
        const response = await instance.get(`/attractions/find?name=${name}&location=${location}&type=${type}`);
        return response.data;
    } catch(error){
        console.log("Error searching attractions: " + error);
        throw error;
    }
}

export  async  function searchAccommodations({name, location, type}){
    try{
        const response = await instance.get(`/accommodations/find?name=${name}&location=${location}&type=${type}`);
        return response.data;
    } catch(error){
        console.log("Error searching accommodations: " + error);
        throw error;
    }
}

export async function sendGptRequest(gptRequest) {
    try {
        const response = await instance.post("/gpt/prompt", gptRequest);
        return response.data;
    } catch (error) {
        console.log("Error sending GPT request: " + error);
        throw error;
    }
}
export  async  function findAccommodations({name, location}){
    try{
        const response = await instance.get(`/accommodations/find?name=${name}&location=${location}`);
        return response.data;
    } catch(error){
        console.log("Error searching accommodations: " + error);
        throw error;
    }
}
export  async  function findAttractions({name, location}){
    try{
        const response = await instance.get(`/attractions/find?name=${name}&location=${location}`);
        return response.data;
    } catch(error){
        console.log("Error searching attractions: " + error);
        throw error;
    }
}