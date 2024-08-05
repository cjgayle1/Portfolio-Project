// aws-config.js
// import AWS from 'aws-sdk'; 
const AWS = window.AWS;
AWS.config.update({
    region: 'us-east-2', 
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:a28e8752-3d1e-48eb-8e1c-ef99ca861ac9'
    })
});

export { AWS };
