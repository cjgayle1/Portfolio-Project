import { AWS } from './aws-config.js';


// export const fetchGAStats = () => {
//   return new Promise((resolve, reject) => {
//     const docClient = new AWS.DynamoDB.DocumentClient();
//     const params = {
//       TableName: 'GA_Stats2',
//       Limit: 1,
//     };

//     docClient.scan(params, (err, data) => {
//       if (err) {
//         console.error("Error fetching data:", err);
//         reject(err);
//       } else if (!data.Items || !data.Items.length) {
//         console.error('No data found.');
//         reject('No data found.');
//       } else {
//         data.Items.sort((a, b) => (new Date(b.Date) - new Date(a.Date)));
//         resolve(data.Items[0]);  // Return the latest item
//       }
//     });
//   });
// };





export const fetchGAStats = () => {
  return new Promise((resolve, reject) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: 'GA_Stats3',
      KeyConditionExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'Data'
      },
      ExpressionAttributeValues: {
        ':pk': 'GA_Stats'
      },
      ScanIndexForward: false,  // latest item first
      Limit: 1,  // fetch one record
    };

    docClient.query(params, (err, data) => {
      if (err) {
        console.error("Error fetching data:", err);
        reject(err);
      } else if (!data.Items || !data.Items.length) {
        console.error('No data found.');
        reject('No data found.');
      } else {
        resolve(data.Items[0]);
      }
    });
  });
};





// export const fetchGAStats = () => {
//     return new Promise((resolve, reject) => {
//         const docClient = new AWS.DynamoDB.DocumentClient();
//         const params = {
//             TableName: 'GA_Stats',
//             KeyConditionExpression: '#dateKey = :pk',
//             ExpressionAttributeNames: {
//                 '#dateKey': 'Date'
//             },
//             ExpressionAttributeValues: {
//                 ':pk': new Date().toISOString().split('T')[0]
//             },
//             ScanIndexForward: false,  
//             Limit: 1
//         };

//     docClient.query(params, (err, data) => {
//         if (err) {
//             console.error("Error fetching data:", err);
//             reject(err);
//         } else if (!data.Items || !data.Items.length) {
//             console.error('No data found.');
//             reject('No data found.');
//         } else {
//             resolve(data.Items[0]);
//         }
//     });
// });
// };

// Use this function to update your DOM with the Google Analytics data
export function updateGAStatsInDOM(data) {
    const container = document.getElementById('ga-stats-container');
    
    // Create a list to display GA data
    const list = document.createElement('ul');
    
    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `Date: ${item.Date}, Active Users: ${item.ActiveUsers}, Page Views: ${item.PageViews}, Average Session Duration: ${item.AvgSessionDuration}`;
      list.appendChild(listItem);
    });
  
    container.appendChild(list);
  }
