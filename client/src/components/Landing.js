import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {

    renderContent()
    {
        const arrayDetails = [
            { data: "# User logins via Google API" },
            { data : "# User purchase credits in order to send feedback email to user" },
            { data: "# Stripe API integrated for payment processing and adding credits to user" },
            { data: "# Survey form to enter details by user and saved in mongodb" },
            { data: "# Once survey details are filled, feedback email is sent to user and credits are deducted from user account" },
            { data: "# Sendgrid email api is integrated for send feedback email to different users" },
            { data: "# Users response are collected and recorded in the mongo db" },
            { data: "# Survey list is shown from mongodb" }
        ]

        return arrayDetails.map( ( {data},index ) => {
            
            return (<a href="#!" key={index} className="collection-item blue-text text-darken-2">{data}</a>);
                    
        });

    }


    render() {

        return (

            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1>
                        <Link to="/surveys" style={{textDecoration:'underline'}}>
                           Emaily!
                        </Link>
                    </h1>
                    <p>  <b>Sample program to collect feedback from your users (MERN STACK)</b> <br /><br />
                        Below are sample features : <br /><br />
                        </p>
                   
                    
                    <div className="collection" >
                        {this.renderContent()}
                    </div>
                   
                </div>
               

                <div className="fixed-action-btn">
                    <Link to="/surveys" className="btn-floating btn-large red">
                        <i className="material-icons">arrow_forward</i>
                    </Link>
                </div>

            </div>
           
            

        );
    
    }

}

export default Landing;