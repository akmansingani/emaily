const keys = require('../../config/keys');

module.exports = (survey) => {
    return `
        <html>
        <body>
            <div style="text-align:center">
                <h3>Please provide your input to help us!</h3>
                <p>Please answer below question:</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${keys.domain}api/surveys/${survey.id}/yes/">Yes</a>
                    <a href="${keys.domain}api/surveys/${survey.id}/no/">No</a>
                </div>
            </div>
        </body>
        </html>
    
    `;
};