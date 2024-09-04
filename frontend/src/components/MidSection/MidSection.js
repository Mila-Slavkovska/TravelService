import React from 'react';
import './MidSection.css'
import {Button} from "../Button/Button";
export default function MidSection () {
    return (
        <div className="about-us">
            <hr
                className="hr border-2 m-auto"
                style={{ width: "45%",
                    borderWidth: "4px",
                    transform: "translateY(-10px)" }}
            />
            <h2>Research everything about your next destination</h2>
            <h5>Check availability, plan & book</h5>
            <hr
                className="hr border-2 m-auto"
                style={{ width: "45%",
                    borderWidth: "4px",
                    transform: "translateY(+10px)" }}
            />
        <div className="activities-section">
            <div className="activities-text">
                <h4>Engage in activities and recreation</h4>
                <hr
                    className="hr border-2 m-auto"
                    style={{ width: "15%",
                        borderWidth: "4px",
                        transform: "translateY(-10px)" }}
                />
                <p>Make the most of your trip by engaging in all the activities your destination is providing.
                    Depending on where you're traveling - go hiking, swimming, canoeing, explore a cave or a historic site,
                    witness a natural phenomena. Reconnect with nature and meditate.
                    Just search up your place and our site will present you with the details.</p>
                <div className="mid-btns">
                    <Button classname="btns" buttonStyle="btn--primary"
                            buttonSize="btn--medium" onClick={() => window.location.href="/gpt-request"}>
                        Click to test our trip generator
                    </Button>
            </div>
            </div>

            <div className="activities-image1">
                <img alt="img" src="/images/pexels-mohamedelaminemsiouri-2108813.jpg" style={{ width: '100%', height: 'auto', maxWidth: '300px' }}/>
            </div>
            <div className="activities-image2">
            <img alt="img" src="/images/7885443e9621441bd639557a67149149.jpg" style={{ width: '100%', height: 'auto', maxWidth: '300px' }}/>
            </div>
        </div>


            <div className="activities-section">
                <div className="activities-image1">
                    <img alt="img" src="/images/657efdbd662f7f6eda3dd65c3de80a51.jpg" style={{ width: '100%', height: 'auto', maxWidth: '300px' }}/>
                </div>
                <div className="activities-image2">
                    <img alt="img" src="/images/pexels-darya-grey_owl-132130036-17727513.jpg" style={{ width: '100%', height: 'auto', maxWidth: '300px' }}/>
                </div>

                <div className="activities-text">
                    <h4>Plan according to your budget</h4>
                    <hr
                        className="hr border-2 m-auto"
                        style={{ width: "15%",
                            borderWidth: "4px",
                            transform: "translateY(-10px)" }}
                    />
                    <p> Whether you're planning a city break, visiting landmarks and museums to broaden
                        your cultural horizons or a relaxing holiday by the beach, our site will show you
                        all the available accommodations according to your liking, and your desired budget. </p>
                    <div className="mid-btns">
                        <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--medium" onClick={() => window.location.href="/plan-trip"}>
                            Available to select in our planner
                        </Button>
                        <p>For reference, check out top rated accommodations</p>
                        <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--small" onClick={() => window.location.href="/top-rated-accommodations"}>
                            Top rated
                        </Button>
                    </div>
                </div>


            </div>
        </div>
    )
}