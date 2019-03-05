function send() {
    var url = window.location.origin + '/temp';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            console.log(xmlHttp.responseText);
            updateUI(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

function updateUI(temp) {
    //Change Temperature
    document.getElementById('temperature').innerHTML = temp;
    if(chart.data.datasets[0].data.length > MAX_LENGTH)
        removeData(chart);
    addData(chart, chart.data.datasets[0].data.length, temp);
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["0", "1", "2", "3", "4", "5", "6"],
        datasets: [{
            label: "DS18B20",
            backgroundColor: '#40c4ff',
            borderColor: '#00b0ff',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});

const MAX_LENGTH = 21;
window.onload = function() {
    this.setInterval(() => {
        send();        
    }, 3000);
}

function addData(chart, label, data) {
    if(chart.data.datasets[0].data.length < MAX_LENGTH)
        chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    // chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}