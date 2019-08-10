import React, { Component } from 'react';
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";

class SurveyNew extends Component {

   state = { sformDone: false };

   renderContent()
   {

       if(this.state.sformDone)
       {
           return <SurveyFormReview 
                    onReviewCancel={() => this.setState({ sformDone: false })} />;
       }

       return <SurveyForm
                onSurveySubmit = { () => this.setState({ sformDone : true}) } />;
   }

    render()
    {
        return(
            <div>
              {this.renderContent()}
            </div>
        );

    }

}

export default reduxForm({
    form:'surveyForm'
}) (SurveyNew);