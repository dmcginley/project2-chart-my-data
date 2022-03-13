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
    },
  ],
};

// config of chart - data color FIXME:
const config = {
  type: "bar",
  data,
  options: {
    borderWidth: 1,
    backgroundColor: [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ],
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
// config2 of chart - data color
const config2 = {
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
let myChart = new Chart(document.getElementById("myChart"), config);

// to destroy and creat two different charts - bar and line
function chartType(type) {
  myChart.destroy();
  if (type === "bar") {
    myChart = new Chart(document.getElementById("myChart"), config);
  }
  if (type === "line") {
    myChart = new Chart(document.getElementById("myChart"), config2);
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
