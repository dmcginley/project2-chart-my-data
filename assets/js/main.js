// FIXME: fix Papa.parse integration, to select the data from the file at the moment it is hardcoded

// empty array to separate out the first row from the file (the names)
let dataSetNames = [];

const firstData = [];
const secondData = [];
const thirdData = [];
const fourthData = [];

// labels, determines the length of the chart
const labels = [];

const fileInput = document.querySelector("#txtFileUpload");

// add function for  extracting the names
function processData(data) {
  for (i = 0; i < data.length; i++) {
    const row = data[i];

    if (i === 0) {
      // process header
      dataSetNames = row.slice(1); // remove 'Date' header
      console.log(dataSetNames);
    }
    // proses rows next
    else {
      // process data row
      console.log(`processing row ${i}`);
      const date = new Date(row[0]);
      // const year = date.getFullYear();
      //const dict = {'year': year, 'month': month};
      console.log(`processing row ${i}`, {
        // year,
      });

      console.log(date);
      firstData.push(row[1]);
      secondData.push(row[2]);
      thirdData.push(row[3]);
      fourthData.push(row[4]);
      labels.push(row[0]); // the date x axis

      // TODO: get a month worth of data
    }
  }
}

// selects from the first 4 columns and adds them into an array (to form the button)
function displayDefaultChart() {
  myChart.data.labels = labels;
  myChart.data.datasets[0].data = firstData;
  myChart.data.datasets[1].data = secondData;
  myChart.data.datasets[2].data = thirdData;
  myChart.data.datasets[3].data = fourthData;
  myChart.update();
}

// FIXME: get data to display in the chart
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

function createDataSetButtons() {
  console.log("createDataSetButtons", dataSetNames);

  const container = document.getElementById("btn-container");
  // remove all previous buttons
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  for (let i = 0; i < dataSetNames.length; i++) {
    const newButton = document.createElement("button");
    newButton.innerText = dataSetNames[i];
    newButton.setAttribute("onclick", `toggleDataSet(${i})`);
    container.appendChild(newButton);
  }
}

// toggle the data set
function toggleDataSet(index) {
  console.log("toggle dataset", index);
  const isVisible = myChart.isDatasetVisible(index);
  if (isVisible) {
    myChart.hide(index);
  } else {
    myChart.show(index);
  }
}

// // dropdown buttons
// let selection = document.querySelector("select");
// let result = document.querySelector("h3");

// selection.addEventListener("change", () => {
//   result.innerHTML = selection.options[selection.selectedIndex].text;
// });

// const otherData = [1, 2, 3, 4, 5, 6, 7, 8];

// chart
const data = {
  // labels: ["Red", "Blue", "Yellow", "Green", "Other"],
  labels: [],
  datasets: [
    {
      label: "firstData",
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
};

// config of chart - data color FIXME:
const configBar = {
  type: "bar",
  data,
  options: {
    borderWidth: 0,
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
      },
      x: {
        stacked: true,
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

    tension: 0.4,
    pointRadius: 3,
    // pointHoverRadius: 5,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// render init the data
let myChart = new Chart(document.getElementById("myChart"), configBar);

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
