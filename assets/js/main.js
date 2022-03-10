// FIXME: fix Papa.parse integration
// let btnUpload = document
//   .getElementById("btn-read-csv")
//   .addEventListener("click", () => {
//     Papa.parse(document.getElementById("txtFileUpload").files[0], {
//       header: true,
//       skipEmptyLines: true,
//       complete: function (results) {
//         console.log(results);
//         results.data.map((data, index) => {
//           console.log(data);
//         });
//       },
//     });
//   });

const date = [];

const firstData = [];
const secondData = [];
const thirdData = [];

const confirmReadCsv = document
  .getElementById("confirm-read-csv")
  .addEventListener("click", () => {
    Papa.parse(document.getElementById("txtFileUpload").files[0], {
      download: true,
      skipEmptyLines: true,
      header: true,
      complete: function (results) {
        console.log(results);
        for (i = 0; i < results.data.length; i++) {
          date.push(results.data[i].Month);
          firstData.push(results.data[i].price1);
          secondData.push(results.data[i].price2);
          thirdData.push(results.data[i].price3);
        }
        console.log(secondData);
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

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "price1",
        data: firstData,
        backgroundColor: "rgba(54, 162, 235, .4)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: secondData,
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Sell",
        data: thirdData,
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// try {
//   console.log("hello");
//   blo;
// } catch (err) {
//   console.error("error" + err.stack);
// } finally {
//   console.log("...end of test");
// }

// console.log("continue");
