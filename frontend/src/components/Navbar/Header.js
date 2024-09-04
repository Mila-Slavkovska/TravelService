import {Link} from "react-router-dom";

export default function Header(){
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
                    {/*<li className="nav-item">*/}
                    {/*    <Link className="nav-link" to="/plan-trip">Plan trip</Link>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </nav>
    )
}