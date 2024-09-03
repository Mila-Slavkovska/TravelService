import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {login} from "../../../repository/authService";

export default function LogIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        if(!username){
            setErrorMessage("Please enter your username.");
            return;
        }
        if(!password){
            setErrorMessage("Please enter your password.");
            return;
        }
        try{
            const response = await login(username, password);
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            navigate("/trips");
        } catch (error) {
            console.error("Authentication failed:", error);
            setToken(null);
            localStorage.removeItem("token");
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={"w-25 m-auto mt-5 border rounded-2 shadow p-3"}>
                <h3 className={"text-center"}>LogIn</h3>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className={"form-control my-3"}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={"form-control my-3"}
                />
                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className={"btn btn-dark"}>LogIn</button>
                </div>
                <p className={"fs-6 fw-lighter text-center text-secondary pt-2"}>Dont have an account? <Link to={"/signup"}>Sign up</Link></p>

            </form>
            {errorMessage && <div className={"text-danger w-25 m-auto pt-2"}>{errorMessage}</div>}{" "}
        </div>
    );
}