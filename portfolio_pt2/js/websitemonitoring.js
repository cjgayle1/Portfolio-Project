import { AWS } from './aws-config.js';

export const fetchWebsiteMonitoringData = () => {
  return new Promise((resolve, reject) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: 'WesbiteMonitoring',
      KeyConditionExpression: '#pk = :pkval',
      ExpressionAttributeNames: {
        '#pk': 'URL',
      },
      ExpressionAttributeValues: {
        ':pkval': 'https://christopher-gayle.com/',
      },
      ScanIndexForward: false,
      Limit: 1
    };

    docClient.query(params, function(err, data) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data.Items[0]);
      }
    });
  });
};

// Function to update DOM with Website Monitoring data
export function updateWebsiteMonitoringInDOM(data) {
    const container = document.getElementById('website-monitoring-container');
    

  
    console.log(data)
    const websiteStatusElement = document.getElementById('website-status');
    const dateTimeElement = document.getElementById('check-time');
    const responseTimeElement = document.getElementById('response-time');
    const statusCodeElement = document.getElementById('status-code');

    websiteStatusElement.textContent = data.StatusCode === 200 ? "Up" : "Down";
    websiteStatusElement.style.color = data.StatusCode === 200 ? "green" : "red";
    dateTimeElement.textContent = data.DateTimeCheck ? new Date(data.DateTimeCheck).toLocaleString() : "N/A";
    responseTimeElement.textContent = data.ResponseTime ? `${data.ResponseTime.toFixed(2)}s` : "N/A";
    statusCodeElement.textContent = data.StatusCode || "N/A";
}
