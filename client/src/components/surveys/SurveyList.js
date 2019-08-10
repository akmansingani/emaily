import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SurveyNew extends Component {

    componentDidMount()
    {
        this.props.listSurveys();
    }

    renderSurverys()
    {
        return this.props.survey.reverse().map(survey => {
            return (
                <div className="card darken-1" key={survey._id}>
                  <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Send Date : {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                  </div>
                    <div className="card-action">
                        <a>Yes : {survey.yes}</a>
                        <a>No : {survey.no}</a>
                    </div>
                </div>
            );
        });
    }
     
    render() {
        return (

            <div>
                <br /><br/>
               { this.renderSurverys() }
            </div>

        );

    }

}

function mapStateToProps({ survey }) {

    return { survey };
}

export default connect(mapStateToProps, actions) (SurveyNew);