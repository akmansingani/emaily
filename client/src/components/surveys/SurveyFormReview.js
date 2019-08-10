import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onReviewCancel, formValues, submitSurvey,history }) =>
{
    return (
        <div>
            <h5>Please confirm the details</h5>
            <div>
                <div>
                    <label>Survey Title</label>
                    <div>{formValues.surveyTitle}</div>
                </div>
                <div>
                    <label>Survey Subject</label>
                    <div>{formValues.surveySubject}</div>
                </div>
                <div>
                    <label>Email Content</label>
                    <div>{formValues.emailContent}</div>
                </div>
                <div>
                    <label>Recipient List</label>
                    <div>{formValues.recipientList}</div>
                </div>
            </div>
            <br/><br/>
            <button className="btn red left" onClick={onReviewCancel}>
                Back
            </button>
            <button className="btn blue right" onClick={() => submitSurvey(formValues,history)}>
                Confirm
            </button>
        </div>
    );
};

function mapStateToProps({ form }) {
 
    return {
        formValues : form.surveyForm.values,
    };
}

const SurveyFormReviewWithRouter = withRouter(SurveyFormReview)

export default connect(mapStateToProps, actions)(SurveyFormReviewWithRouter);