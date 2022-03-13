// FIXME: fix Papa.parse integration, to select the data from the file at the moment it is hardcoded

// empty array to separate out the first row from the file (the names)
let dataSetNames = [];

// initial test data columns
const firstData = [];
const secondData = [];
const thirdData = [];

// labels, determines the length of the chart
const labels = [];

const fileInput = document.querySelector("#txtFileUpload");

// add function for  extracting the names

function processMyData(data) {
  for (i = 0; i < data.length; i++) {
    const row = data[i];

    if (i === 0) {
      // process header
      dataSetNames = row.slice(1); // remove 'Date' header
      console.log(dataSetNames);
    }
    // proses rows next
  }
}

// parsing the data with papa parse
fileInput.addEventListener("change", (e) => {
  Papa.parse(fileInput.files[0], {
    download: true,
    skipEmptyLines: true,
    header: true,
    complete: function (results) {
      // console.log(results.data[0]);
      for (i = 0; i < results.data.length; i++) {
        firstData.push(results.data[i].day);
        secondData.push(results.data[i].price1);
        thirdData.push(results.data[i].price2);
        labels.push(results.data[i].month);
      }
    },
  });
});

function updateChart(label) {
  myChart.data.labels = labels;
  myChart.data.datasets[0].label = label;
  if (label === "firstData") {
    myChart.data.datasets[0].data = firstData;
    // myChart.data.datasets[1].data = secondData;
  }
  if (label === "secondData") {
    myChart.data.datasets[0].data = secondData;
    // myChart.data.datasets[1].data = thirdData;
  }
  if (label === "thirdData") {
    myChart.data.datasets[0].data = thirdData;
    // myChart.data.datasets[1].data = secondData;
  }
  // console.log(label);
  myChart.update();
}

function createBtn() {
  console.log("createBtn", names);

  const container = document.getElementById("btn-container");
  // remove all previous buttons
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  for (i = 0; i < names.length; i++) {
    // document.getElementById("btn-container").innerHTML +=
    //   "<button>" + names[i] + "</button>";

    const newButton = document.createElement("button");
    newButton.innerHTML = names[i];
    container.appendChild(newButton);

    // .innerHTML +=
    //   "<button>" + names[i] + "</button>";
  }
}

// dropdown buttons
let selection = document.querySelector("select");
let result = document.querySelector("h3");

selection.addEventListener("change", () => {
  result.innerHTML = selection.options[selection.selectedIndex].text;
});

// const otherData = [1, 2, 3, 4, 5, 6, 7, 8];

// chart
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Other"],
  // labels: [],
  datasets: [
    {
      label: "firstData",
      data: [4.5, 7, 3, 4.2, 5.1, 3, 3.6, 7],
      backgroundColor: "#69b3a2",
      borderColor: "#69b3a2",
    },
    {
      label: "secondData",
      data: [3.5, 2, 5, 6.2, 5, 3.3, 3, 2],
      backgroundColor: "#4682b4",
      borderColor: "#4682b4",
    },
    {
      label: "thirdData",
      data: [4, 1, 2, 3.2, 5.6, 2.2, 6, 5.1],
      backgroundColor: "#e24b9e",
      borderColor: "#e24b9e",
    },
    {
      label: "forthData",
      data: [8, 4, 3.8, 5.3, 4.2, 3.6, 2, 4.1],
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
    backgroundColor: "rgba(33, 195, 216, 1)",
    borderColor: "rgba(33, 195, 216, 1)",
    tension: 0.4,
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

// try {
//   console.log("hello");
//   blo;
// } catch (err) {
//   console.error("error" + err.stack);
// } finally {
//   console.log("...end of test");
// }

// console.log("continue");
