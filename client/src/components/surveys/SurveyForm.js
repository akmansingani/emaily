import React, { Component } from 'react';
import { Field,reduxForm } from "redux-form";
import { Link } from 'react-router-dom';

const SurveyField = ({
    input,
    title,
    meta: { touched, error }
}) =>
{

return (
    
        <div>
            <label className="black-text">{title}</label>
            <input {...input} />
            <div className="red-text" style={{marginBottom:'20px'}}>
            {touched && error}
            </div>
            
           
        </div>
    )

};

class SurveyForm extends Component {

    render() {
        return (
            <div>
            <br/>
               <form onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}>
                    <Field 
                        name="surveyTitle" 
                        title="Survey Title"
                        type="text"
                        component={SurveyField}
                    />
                    <Field
                        name="surveySubject"
                        title="Survey Subject"
                        type="text"
                        component={SurveyField}
                    />
                    <Field
                        name="emailContent"
                        title="Email Content"
                        type="text"
                        component={SurveyField}
                    />
                    <Field
                        name="recipientList"
                        title="Recipient List"
                        type="text"
                        component={SurveyField}
                    />
                    <Link className="btn red left" to="/surveys">
                        Cancel
                    </Link>
                    <button type="submit" className="btn blue right">Submit</button>
               </form>
            </div>
        );

    }

}

function validate(values) {
    const errors = {};

    if (!values.surveyTitle)
    {
        errors.surveyTitle = 'Please enter title';
    }

    if (!values.surveySubject) {
        errors.surveySubject = 'Please enter subject';
    }

    if (!values.emailContent) {
        errors.emailContent = 'Please enter content';
    }

    if (!values.recipientList) {
        errors.recipientList = 'Please enter recipient email list';
    }
    else
    {
        const eregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        const eArray = values.recipientList.split(',')
                        .map(email => email.trim())
                        .filter(email => eregex.test(email) === false);
        
        if(eArray.length)
        {
            errors.recipientList = `Invalid emails : ${eArray}`;
        }
        

    }

    return errors;
}

export default reduxForm({
    validate,
    form :'surveyForm',
    destroyOnUnmount:false
})(SurveyForm);