// the colors used for each dataset, optimized for dark theme
const CHART_COLORS = [
  "#2132a3",
  "#1984c5",
  "#22a7f0",
  "#63bff0",
  "#a7d5ed",
  "#e2e2e2",
  "#e1a692",
  "#de6e56",
  "#e14b31",
  "#c23728",
];

// csv file that is first loaded
const SAMPLE_CSV_FILENAME = "ireland-covid-3months-of 2021.csv";

// empty array to separate out the first row from the file (the names)
let processedData = []; // the y axis
let labels = []; // the x axis

// names to add to the dynamic buttons
let dataSetNames = [];

// the default chart
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

let chartData = defaultData;

const fileInput = document.querySelector(".txtFileUpload");

console.log("fpp", fileInput);

// show an error message
function showErrorMessage(message) {
  const errorHeader = document.getElementsByClassName("csv-upload-error")[0];
  errorHeader.classList.add("show-error");
  errorHeader.innerHTML = message;
}

function removeErrorMessage() {
  const errorHeader = document.getElementsByClassName("csv-upload-error")[0];
  errorHeader.classList.remove("show-error");
  errorHeader.innerHTML = "";
}

// for extracting the names
function processData(data) {
  const numberOfColumns = data.length > 0 ? data[0].length : 0; ///5
  processedData = [];

  if (numberOfColumns < 2) {
    showErrorMessage("Data should have at least two columns");
  } else {
    removeErrorMessage();

    // enough data to display
    for (i = 0; i < data.length; ++i) {
      const row = data[i];

      // Set label
      if (i === 0) {
        dataSetNames = row.slice(0); // copy label names

        //for (var label of row) {
        for (let j = 0; j < row.length; j++) {
          const label = row[j];

          const colorIndex = j % CHART_COLORS.length;
          processedData.push({
            label,
            backgroundColor: CHART_COLORS[colorIndex],

            borderColor: CHART_COLORS[colorIndex],
          });
        }
      } else {
        for (let colIndex = 1; colIndex < numberOfColumns; colIndex++) {
          processedData[colIndex].data = [
            ...(processedData[colIndex].data || []),
            row[colIndex],
          ];
        }
        labels.push(row[0]);
      }
    }
  }
}

// window.onload = function () {
//   yourFunction(fileInput);
// };
// yourFunction();

// scroll to chart section so the user doesn 't have to go looking for it

function scrollToChart() {
  const element = document.getElementById("theChart");
  element.scrollIntoView({
    behavior: "smooth",
  });
}

function clearData() {
  processedData = [];
  labels = [];
  dataSetNames = [];
}

// extracts the file name and displays it above the chart
function setChartTitle(title) {
  const titleHeader = document.getElementById("chart-title");
  titleHeader.setAttribute("class", "chart-title");
  if (titleHeader) {
    titleHeader.innerHTML = title;
  }
}

function displayChart() {
  myChart.data.datasets = processedData;
  myChart.data.labels = labels;
  myChart.update();
}

// my demo csv data to be displayed on first load
Papa.parse(`assets/csv/${SAMPLE_CSV_FILENAME}`, {
  download: true,
  skipEmptyLines: true,
  // header: false,
  complete: function (results) {
    clearData();
    processData(results.data);
    createDataSetButtons();
    displayChart();
  },
});

// parsing the user uploaded data with papa parse
fileInput.addEventListener("change", (e) => {
  const fileName = fileInput.files[0].name;
  setChartTitle(fileName);
  if (fileName.toLowerCase().endsWith(".csv")) {
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
  } else {
    showErrorMessage("File is not a CSV file");
    clearData();
    displayChart();
  }
});

// removes any and adds dynamic buttons to the html file
function createDataSetButtons() {
  const container = document.getElementById("dynamic-btn-container");
  // removes all previous buttons
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  // I loop through the array to create the buttons with name of data
  for (let i = 1; i < dataSetNames.length; i++) {
    const newButton = document.createElement("button");
    newButton.innerText = dataSetNames[i];
    const buttonColor = CHART_COLORS[i % CHART_COLORS.length];
    const borderColor = CHART_COLORS[i % CHART_COLORS.length];
    newButton.setAttribute("onclick", `toggleDataSet(${i})`);
    newButton.setAttribute("class", "button dataset-toggle");

    newButton.setAttribute(
      "style",
      `border-color: ${borderColor}; background-color: ${buttonColor}`
    );
    container.appendChild(newButton);
  }
}

// dataSetNames = row.slice(1); // remove 'Date' header

// toggle the data set
function toggleDataSet(index) {
  // // console.log("toggle dataset", index);
  const isVisible = myChart.isDatasetVisible(index);
  const datasetButtons = document.getElementsByClassName("dataset-toggle");
  const datasetButton = datasetButtons[index - 1]; // TODO: off by one otherwise
  if (isVisible) {
    myChart.hide(index);
    datasetButton.classList.add("dataset-hidden");
    //  TODO: add class dataset-hidden
  } else {
    myChart.show(index);
    datasetButton.classList.remove("dataset-hidden");
  }
}

// config of bar chart
const configBar = {
  type: "bar",
  data: chartData,
  options: {
    borderWidth: 0,
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
          color: "#f7f7f7",
        },
      },
      x: {
        stacked: true,
        grid: {
          display: false,
        },

        ticks: {
          color: "#f7f7f7",
        },
      },
    },
  },
};

// config of line chart - data color
const configLine = {
  type: "line",
  data: chartData,
  options: {
    borderWidth: 2,
    responsive: true,
    // maintainAspectRatio: false,
    // tension: 0.1,
    pointRadius: 0,
    pointHoverRadius: 6,
    hitRadius: 15,
    plugins: {
      legend: {
        display: false,
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
          color: "#f7f7f7",
        },
      },
      x: {
        stacked: true,
        grid: {
          color: "#f7f7f76b",
          // display: false,
        },
        ticks: {
          color: "#f7f7f7",
        },
      },
    },
  },
};

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
  // TODO: does not remember what datasets are visible
  //       so re-called function to create data buttons again
  createDataSetButtons();
}
