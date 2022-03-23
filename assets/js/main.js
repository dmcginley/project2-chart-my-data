// empty array to separate out the first row from the file (the names)
let processedData = []; // the  axis
let labels = []; // the x axis


// names to add to the dynamic buttons
let dataSetNames = [];


// 4 empty arrays for the data to be injected into
// const firstData = [];
// const secondData = [];
// const thirdData = [];
// const fourthData = [];


const defaultData = {
  labels: [],
  datasets: [],
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
// Chart.register(zoomPlugin);



let chartData = defaultData;


const fileInput = document.querySelector(".txtFileUpload");

// TODO: generating the color, maybe later change to d3js colors
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log("colors", color);
  return color;

}


// function for extracting the names
function processData(data) {
  const noOfCols = data.length > 0 ? data[0].length : 0; ///5
  processedData = [];
  // console.log(processedData);
  // console.log(labels);

  if (noOfCols) {
    for (i = 0; i < data.length; ++i) {
      const row = data[i];

      // Set label
      if (i === 0) {

        dataSetNames = row.slice(1); // remove 'Date' header

        console.log("dataSetNames", dataSetNames);

        for (var label of row) {
          processedData.push({
            label,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor()
            // borderColor: '#FFFFFF'
          });
        }
      } else {
        for (let colIndex = 0; colIndex < noOfCols; colIndex++) {
          processedData[colIndex].data = [
            ...(processedData[colIndex].data || []),
            row[colIndex]
          ];
        }
        labels.push(row[0]);
        // console.log("labss", labels);
      }
    }
  }

}

// scroll to chart section so the user doesn't have to go looking for it
function scrollToChart() {
  const element = document.getElementById("theChart");
  element.scrollIntoView({
    behavior: 'smooth'
  });
  // console.log("click");
}

// function resetData() {
//   processedData = [], labels = [];
//   myChart.update();
// }


function clearData() {
  processedData = [], labels = [], dataSetNames = [];
}


// FIXME: function to clear the previous data
// function clearData() {
//   firstData.length = 0
//   secondData.length = 0
//   thirdData.length = 0
//   fourthData.length = 0
// }

function displayChart() {

  // FIXME: 	Expected an assignment or function call and instead saw an expression.
  const datasets = processedData;
  myChart.data.datasets = processedData;
  myChart.data.labels = labels;
  myChart.update();


  console.log("labels", labels);
}

// demo csv data to be displayed on first load
Papa.parse("assets/csv/test2.csv", {
  download: true,
  skipEmptyLines: true,
  complete: function (results) {
    clearData();
    processData(results.data);
    createDataSetButtons();
    displayChart();
  }
});



// parsing the user uploaded data with papa parse
fileInput.addEventListener("change", (e) => {
  Papa.parse(fileInput.files[0], {
    download: true,
    skipEmptyLines: true,
    header: false,
    complete: function (results) {
      clearData();
      processData(results.data);
      createDataSetButtons();
      displayChart();
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
    // console.log("newButton", newButton);
    // create only 4 buttons
    // if (i === 3) {
    //   break;
    // }
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



// config of bar chart - data color FIXME:
const configBar = {
  type: "bar",
  data: chartData,
  options: {
    borderWidth: 0,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
          // pan options and/or events
          threshold: 10,
        },
        // limits: {
        //   // axis limits
        // },
        zoom: {
          mode: "x",
          drag: {
            enabled: true,
            backgroundColor: "rgba(201, 106, 42, 0.397)",
            borderColor: "rgba(201, 106, 42, 1)",
            borderWidth: 1

            // wheel: {
            //   enabled: true,
            // },
            // zoom options and/or events
          }
        }
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        grid: {
          color: "#f7f7f76b",
          //   display: false,
        },
        ticks: {
          color: '#f7f7f7'
        }
      },
      x: {
        stacked: true,
        grid: {
          display: false,
        },

        ticks: {
          color: '#f7f7f7'
        }
      },
    },
  },
};

function resetZoom() {
  myChart.resetZoom();
}


// FIXME: when switching between bar and line sometimes doesn't re zoom to 100%

// config of line chart - data color
const configLine = {
  type: "line",
  data: chartData,
  options: {
    borderWidth: 2,
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.4,
    pointRadius: 3,
    // pointHoverRadius: 5,
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
          // pan options and/or events
          threshold: 10,
        },
        // limits: {
        //   // axis limits
        // },
        zoom: {
          mode: "x",
          drag: {
            enabled: true,
            backgroundColor: "rgba(201, 106, 42, 0.397)",
            borderColor: "rgba(201, 106, 42, 1)",
            borderWidth: 1

            // wheel: {
            //   enabled: true,
            // },
            // zoom options and/or events
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f7f7f76b",
          // display: false,
        },
        ticks: {
          color: '#f7f7f7'
        },
      },
      x: {
        stacked: true,
        grid: {
          color: "#f7f7f76b",
          // display: false,
        },
        ticks: {
          color: '#f7f7f7'
        },
      },
    },
  },
};

// FIXME: when switching between bar and line sometimes doesn't re zoom to 100%
// linked to the button to reset the zoom of the chart to 100%
function resetZoom() {
  myChart.resetZoom();
}


// render initialize the data
myChart = new Chart(document.getElementById("myChart"), configBar);


// destroy and creat two different charts - bar and line
function chartType(type) {
  myChart.destroy();
  if (type === "bar") {
    myChart = new Chart(document.getElementById("myChart"), configBar);
  }
  if (type === "line") {
    myChart = new Chart(document.getElementById("myChart"), configLine);
  }
}