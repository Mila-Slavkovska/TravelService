import instance from '../custom-axios/axios'

export async function login(email, password){
    try {
        const response = await instance.post("/auth/login", {
            "email": email,
            "password": password
        });

        return response;
    } catch (error) {
        console.error("Authentication failed:", error);
    }
}

export async function register(email, password, fullName){
    try {
        const response = await instance.post("/auth/signup", {
            "email": email,
            "password": password,
            "fullName": fullName
        });

        return response;
    } catch (error) {
        console.error("Registration failed:", error);
    }
}