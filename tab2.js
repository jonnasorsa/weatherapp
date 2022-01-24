const temperatureTableBody = document.getElementById("temperature");
const loadingSpinner = document.getElementById("loading-spinner");
let canvasElement = document.getElementById("myChart");
const canvasSpot = document.getElementById("canvas-spot");
const aika = document.getElementById("select");
const form = document.getElementById("form");
let aikavali;

const myAsyncFunction = async () => {
  console.log("Entering async function..");

  console.log("naputi nap nap");

  loadingSpinner.classList.remove("d-none");

  const serverResponse = await fetch(
    `http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/${aikavali}`
  );

  loadingSpinner.classList.add("d-none");

  const data = await serverResponse.json();
  console.log(
    `http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/${aikavali}`
  );
  console.log("Data:", data);

  const myChart = new Chart(canvasElement, {
    type: "line",
    data: {
      labels: data.map((values) => values.date_time),
      datasets: [
        {
          label: "Lämpötila (°C)",
          data: data.map((values) => values.temperature),
          backgroundColor: "blueviolet",
          borderColor: "indigo",
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              tooltipFormat: "d.L.Y HH:MM:SS",
            },
          },
        ],
      },
    },
  });
  temperatureTableBody.textContent = "";

  data.forEach((rowData, index) => {
    const row = document.createElement("tr");

    const cellDataArray = [
      index + 1,
      new Date(rowData.date_time).toLocaleString(),
      rowData.device_id,
      rowData.temperature,
    ];

    for (cellData of cellDataArray) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(cellData);

      cell.appendChild(cellText);

      row.appendChild(cell);
    }
    console.log(cellDataArray[3]);
    temperatureTableBody.appendChild(row);
  });
};

function myFunction() {
  form.addEventListener("submit", (event) => {
    aikavali = event.target.select.value;
    console.log("aika:", aikavali);
    event.preventDefault();
    destroyChart();
    myAsyncFunction();
  });
}

function destroyChart() {
  canvasElement.remove();

  console.log("Tuhotaan vanha kuvaaja");

  const newCanvas = document.createElement("canvas");

  canvasSpot.appendChild(newCanvas);

  canvasElement = newCanvas;
}

myFunction();
