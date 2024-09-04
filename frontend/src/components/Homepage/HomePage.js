import React from 'react'
import './HomePage.css'
import '../App/App.css'
import {Button} from "../Button/Button";
import MidSection from "../MidSection/MidSection";
import Footer from "../Footer/Footer";

export default function HomePage() {
    return (
        <div className="home-wrapper">
        <div className="home-container">
            <h1>PLAN YOUR NEXT TRIP</h1>
            <p>The journey awaits!</p>
            <div className="home-btns">
                <Button classname="btns" buttonStyle="btn--outline"
                buttonSize="btn--medium" onClick={() => window.location.href="/plan-trip"}>
                    Click to start your plan
                </Button>
            </div>
        </div>
            <MidSection />
            <Footer />
    </div>


    )
}