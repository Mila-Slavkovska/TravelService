import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {login, register} from "../../../repository/authService";
import {AuthContext} from "../../../context/AuthContext";

export default function Register(){
    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (!inputs.email || !inputs.fullName || !inputs.password || !repeatPassword) {
            setErrorMessage("All fields are required.")
            return;
        }
        if (inputs.password !== repeatPassword) {
            setErrorMessage("Passwords do not match.")
            return;
        }
        setErrorMessage("");

        try {
            const response = await register(inputs);
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            setErrorMessage("Registration failed.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={"w-25 m-auto mt-5 border rounded-2 shadow p-3"}>
                <h3 className={"text-center"}>SignUp</h3>
                <input
                    value={inputs.fullName}
                    name="fullName"
                    onChange={handleChange}
                    placeholder="Fullname"
                    className={"form-control my-3"}
                />
                <input
                    value={inputs.email}
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    className={"form-control my-3"}
                />
                <input
                    type="password"
                    value={inputs.password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    className={"form-control my-3"}
                />
                <input
                    type="password"
                    value={repeatPassword}
                    name="repeatPassword"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className={"form-control my-3"}
                />
                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className={"btn btn-success"}>Sign up</button>
                </div>
                <p className={"fs-6 fw-lighter text-center text-secondary pt-2"}>Have an account? <Link to={"/login"}>Log in</Link></p>

            </form>
            {errorMessage && <div className={"text-danger text-center w-25 m-auto pt-2"}>{errorMessage}</div>}{" "}
        </div>
    );
}