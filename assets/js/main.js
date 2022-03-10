// FIXME: fix Papa.parse integration
const firstData = [];
const secondData = [];
const thirdData = [];
const labels = [];

const fileInput = document.querySelector("#txtFileUpload");

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

// config of chart
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

// render init the data
const myChart = new Chart(document.getElementById("myChart"), config);

// try {
//   console.log("hello");
//   blo;
// } catch (err) {
//   console.error("error" + err.stack);
// } finally {
//   console.log("...end of test");
// }

// console.log("continue");
