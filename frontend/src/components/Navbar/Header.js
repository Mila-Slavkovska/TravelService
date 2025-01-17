import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

export default function Header(){
    const {token, setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogOut(){
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-md-5">
            <Link className="navbar-brand" to="/">
                <img src={"https://cdn-icons-png.freepik.com/512/1841/1841630.png"} style={{height: 30}}/>
                <span> Trip Organizer</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/trips">My trips</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/gpt-request">Get recommendations</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/plan-trip">Plan trip</Link>
                    </li>
                </ul>
            </div>
            <div>
                {token && <button onClick={handleLogOut} className={"btn btn-outline-light"}>Log out</button>}
            </div>
        </nav>
    )
}