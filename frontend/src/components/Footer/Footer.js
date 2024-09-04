import React from 'react'
import {Button} from "../Button/Button";
import './Footer.css'
import {Link} from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer () {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p classname="footer-subscription-heading">
                    Register via email to receive our best deals at the moment!
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input type="email" name="email" placeholder="Enter your email address" className="footer-input"/>
                        <Button buttonStyle="btn--outline" buttonSize="btn--medium">Subscribe</Button>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                     <div className="footer-link-items">
                         <h4>About Us</h4>
                         <Link to="/">Our agency partners</Link>
                         <Link to="/">How it started</Link>
                         <Link to="/">Terms Of Service</Link>
                         <Link to="/">Privacy Terms</Link>
                     </div>

                    <div className="footer-link-items">
                        <h4>Contact Us</h4>
                        <Link to="/">Contact</Link>
                        <Link to="/">Support</Link>
                        <Link to="/">Destinations Supervisors</Link>
                        <Link to="/">Subscription related</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h4>Trips so far</h4>
                        <Link to="/">Submit videos</Link>
                        <Link to="/">Our most popular destinations</Link>
                        <Link to="/">Ambassadors</Link>
                        <Link to="/">Sponsorships</Link>
                    </div>

                    <div className="footer-link-items">
                        <h4>Social Media</h4>
                        <Link to="/">Facebook</Link>
                        <Link to="/">YouTube</Link>
                        <Link to="/">Instagram</Link>
                        <Link to="/">Twitter</Link>
                    </div>

                    <small className='website-rights'>TRAVEL © 2024</small>
                    <div className="social-media-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}