// FIXME: fix Papa.parse integration
const firstData = [];
const secondData = [];
const thirdData = [];
const labels = [];

const fileInput = document.querySelector("#txtFileUpload");

// const confirmReadCsv = document
//   .getElementById("confirm-read-csv")
//   .addEventListener("click", () => {

fileInput.addEventListener("change", (e) => {
  Papa.parse(fileInput.files[0], {
    download: true,
    skipEmptyLines: true,
    header: true,
    complete: function (results) {
      console.log(results.data[0].day);
      for (i = 0; i < results.data.length; i++) {
        firstData.push(results.data[i].day);
        secondData.push(results.data[i].price1);
        thirdData.push(results.data[i].price2);
        labels.push(results.data[i].month);
      }
      console.log([1]);
      console.log(firstData);
      console.log(secondData);
      console.log(thirdData);
    },
  });
});

// adding the chart data

function updateChart(label) {
  myChart.data.labels = labels;
  myChart.data.datasets[0].label = label;
  if (label === "firstData") {
    myChart.data.datasets[0].data = firstData;
  }
  if (label === "secondData") {
    myChart.data.datasets[0].data = secondData;
  }
  if (label === "thirdData") {
    myChart.data.datasets[0].data = thirdData;
  }
  console.log(label);
  myChart.update();
}

// dropdown buttons
let selection = document.querySelector("select");
let result = document.querySelector("h3");

selection.addEventListener("change", () => {
  result.innerHTML = selection.options[selection.selectedIndex].text;
});

// FIXME: fix chart to display import csv
// const ctx = document.getElementById("myChart").getContext("2d");
// const myChart = new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: [],
//     // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: label,
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 206, 86, 0.6)",
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(153, 102, 255, 0.6)",
//           "rgba(255, 159, 64, 0.6)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           display: false,
//         },
//       },
//     },
//   },
// });
// chart
const data = {
  // labels: ["Red", "Blue", "Yellow", "Green", "Other"],
  labels: [],
  datasets: [
    {
      label: "firstData",
      data: firstData,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// config
const config = {
  type: "bar",
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// const myChart = new Chart(document.getElementById("myChart"), config);

// const ctx = document.getElementById("myChart").getContext("2d");
// const myChart = new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: labels,
//     // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: "price1",
//         data: firstData,
//         backgroundColor: "rgba(54, 162, 235, .4)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Profit",
//         data: secondData,
//         backgroundColor: "rgba(75, 192, 192, 0.4)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Sell",
//         data: thirdData,
//         backgroundColor: "rgba(255, 99, 132, 0.4)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });

// try {
//   console.log("hello");
//   blo;
// } catch (err) {
//   console.error("error" + err.stack);
// } finally {
//   console.log("...end of test");
// }

// console.log("continue");
