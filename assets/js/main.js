// FIXME: fix Papa.parse integration, to select the data from the file at the moment it is hardcoded

// empty array to separate out the first row from the file (the names)
let dataSetNames = [];

const firstData = [];
const secondData = [];
const thirdData = [];
const fourthData = [];

// const dataset = [1, 2, 3, 4, 5, 6, 7, 8];

// labels, determines the length of the chart
const labels = [];

const fileInput = document.querySelector("#txtFileUpload");



// stockData()
// async function stockData() {
//   const url = "assets/csv/test2.csv";
//   const response = await fetch(url);
//   const tableData = await response.text();
//   // console.log(tableData);



//   const sex = processData(tableData);
//   console.log(tableData);
// }
// added function for extracting the names
function processData(data) {
  for (i = 0; i < data.length; i++) {
    const row = data[i];
    // console.log(row);
    if (i === 0) {
      // process header
      dataSetNames = row.slice(1); // remove 'Date' header
      // console.log("dataSetNames", dataSetNames);
    }
    // proses rows next
    else {

      const date = new Date(row[0]);
      const year = date.getFullYear();
      //const dict = {'year': year, 'month': month};

      clearData = [];

      // console.log("firstData set", firstData);

      // console.log(date);
      firstData.push(row[1]);
      secondData.push(row[2]);
      thirdData.push(row[3]);
      fourthData.push(row[4]);
      labels.push(row[0]); // the date x axis
      // console.log("firstData set", firstData);

      // firstData.length = 0;

      // console.log("afirstData set", firstData);

      // TODO: get a month worth of data
    }

  }
}

// selects from the first 4 columns and adds them into an array (to form the button)
function displayDefaultChart() {
  // resetData();
  myChart.data.labels = labels;
  myChart.data.datasets[0].data = firstData;

  myChart.data.datasets[1].data = secondData;
  myChart.data.datasets[2].data = thirdData;
  myChart.data.datasets[3].data = fourthData;


  myChart.update();
}

// parsing the data with papa parse
fileInput.addEventListener("change", (e) => {
  Papa.parse(fileInput.files[0], {
    download: true,
    skipEmptyLines: true,
    header: false,
    complete: function (results) {
      processData(results.data);
      createDataSetButtons();
      displayDefaultChart();
    },
  });
});






// remove any and adds dynamic buttons to the html file
function createDataSetButtons() {
  // console.log("createDataSetButtons", dataSetNames);
  const container = document.getElementById("dynamic-btn-container");
  // remove all previous buttons
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }


  // I loop through the array to create buttons
  for (let i = 0; i < dataSetNames.length; i++) {
    const newButton = document.createElement("button");
    newButton.innerText = dataSetNames[i];
    newButton.setAttribute("onclick", `toggleDataSet(${i})`);
    newButton.setAttribute("class", "button");

    container.appendChild(newButton);



    // console.log(toggleButton);


    // FIXME: doesn't wor grey out button
    // async function newColor() {
    //   newButton.setAttribute("style", "background-color: red;");
    // }
    // newButton.addEventListener("onclick", newColor())


    // create only 4 buttons
    if (i === 3) {
      break;
    }
  }

}









// toggle the data set
function toggleDataSet(index) {
  // console.log("toggle dataset", index);
  const isVisible = myChart.isDatasetVisible(index);
  if (isVisible) {
    myChart.hide(index);
  } else {
    myChart.show(index);
  }
}

// function addData(chart, label, data) {
//   // chart.destroy();


//   chart.data.labels.push(label);
//   chart.data.datasets.forEach((dataset) => {
//     dataset.data.push(data);
//   });
//   chart.update();
// }



Papa.parse("/assets/csv/test2.csv", {
  download: true,
  complete: function (results) {
    // console.log("results", results);
    processData(results.data);
    displayDefaultChart();

    console.log(results);
  }


});

// const chartData = "/assets/csv/test2.csv"

// d3.csv(chartData).then(function (dataPoints) {
//   // console.log("My dataPoints", dataPoints);
//   const firstData = [];
//   const secondData = [];
//   const thirdData = [];
//   const fourthData = [];

//   for (let i = 0; i < dataPoints.length; i++) {
//     firstData.push(dataPoints[i].firstData)
//     console.log("max", firstData);
//   }
// });
// chart

const data = {
  // labels: ["Red", "Blue", "Yellow", "Green", "Other"],
  labels: [],
  datasets: [{
      label: "firstData",
      // data: firstData,
      data: firstData,
      backgroundColor: "#69b3a2",
      borderColor: "#69b3a2",
    },
    {
      label: "secondData",
      data: secondData,
      backgroundColor: "#4682b4",
      borderColor: "#4682b4",
    },
    {
      label: "thirdData",
      data: thirdData,
      backgroundColor: "#e24b9e",
      borderColor: "#e24b9e",
    },
    {
      label: "fourthData",
      data: fourthData,
      backgroundColor: "#0cf0e9",
      borderColor: "#0cf0e9",
    },
  ],
  options: {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  },
};







// config of chart - data color FIXME:
const configBar = {
  type: "bar",
  data,
  options: {
    borderWidth: 0,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        // grid: {
        //   display: false,
        // },
      },
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
  },
};
// config2 of chart - data color
const configLine = {
  type: "line",
  data,
  options: {
    borderWidth: 2,
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.4,
    pointRadius: 2,
    // pointHoverRadius: 5,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        // grid: {
        //   display: false,
        // },
      },
      x: {
        stacked: true,
        // grid: {
        //   display: false,
        // },
      },
    },
  },
};

// Adding or Removing Data - from chart.js docs
// function addData(chart, label, data) {
//   // chart.data.labels.push(label);
//   chart.data.datasets.forEach((dataset) => {
//     dataset.data.push(data);
//     console.log(dataset);
//   });
//   chart.update();
// }

// function removeData(chart) {
//   chart.data.labels.pop();
//   chart.data.datasets.forEach((dataset) => {
//     dataset.data.pop();
//   });
//   chart.update();
// }






myChart = new Chart(document.getElementById("myChart"), configBar);
// render init the data
// let myChart = new Chart(document.getElementById("myChart"), configBar);
// to destroy and creat two different charts - bar and line
function chartType(type) {
  myChart.destroy();
  if (type === "bar") {
    myChart = new Chart(document.getElementById("myChart"), configBar);
  }
  if (type === "line") {
    myChart = new Chart(document.getElementById("myChart"), configLine);
  }
}


function resetData() {
  myChart.data.datasets[0].data = firstData;
  myChart.data.datasets[1].data = secondData;
  myChart.data.datasets[2].data = thirdData;
  myChart.data.datasets[3].data = fourthData;
  myChart.data.labels = labels;
  myChart.update();

}
// resetData();