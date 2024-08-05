document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('metricsChart').getContext('2d');
    var metricsChart = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: [],  
            datasets: [{
                label: 'My Metric',
                data: [],  
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { 
                    beginAtZero: true
                }
            }
        }
    });
});
