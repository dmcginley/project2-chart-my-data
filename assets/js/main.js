// console.log("test");

const firstData = [];

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

// FIXME: fix chart to display import csv
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: label,
        data: [12, 19, 3, 5, 2, 3],
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
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
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
