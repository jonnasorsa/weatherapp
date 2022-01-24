const aika = document.getElementById("select");
const tyyppi = document.getElementById("selecttype");
const loadingSpinner = document.getElementById("loading-spinner");
const variableTableBody = document.getElementById("variable");
const canvasSpot = document.getElementById("canvas-spot");
let canvasElement = document.getElementById("myChart");
const form = document.getElementById("form");
let aikavali;
let datatyyppi;
const placeHolder = document.getElementById("placeholder");

const myAsyncFunction = async () => {
  console.log("naputi nap nap");
  console.log("datatyyppi:", document.getElementById(datatyyppi).textContent);
  console.log("datatyypin nimi:", datatyyppi);
  loadingSpinner.classList.remove("d-none");
  const serverResponse = await fetch(
    `http://webapi19sa-1.course.tamk.cloud/v1/weather/${datatyyppi}/${aikavali}`
  );

  loadingSpinner.classList.add("d-none");
  const data = await serverResponse.json();
  console.log(
    `http://webapi19sa-1.course.tamk.cloud/v1/weather/${datatyyppi}/${aikavali}`
  );
  console.log("Data:", data);

  if ([datatyyppi] != "wind_direction") {
    console.log("Muut signaalit");
    const myChart = new Chart(canvasElement, {
      type: "line",
      data: {
        labels: data.map((values) => values.date_time),
        datasets: [
          {
            label: document.getElementById(datatyyppi).textContent,
            data: data.map((values) => values[datatyyppi]),
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
  }

  if ([datatyyppi] == "wind_direction") {
    console.log("tuulen suunta");
  }
  variableTableBody.textContent = "";

  data.forEach((rowData, index) => {
    const row = document.createElement("tr");

    const cellDataArray = [
      index + 1,
      new Date(rowData.date_time).toLocaleString(),
      rowData[datatyyppi],
    ];

    for (cellData of cellDataArray) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(cellData);

      cell.appendChild(cellText);

      row.appendChild(cell);
    }

    variableTableBody.appendChild(row);
  });
};

function myFunction() {
  form.addEventListener("submit", (event) => {
    aikavali = event.target.select.value;
    datatyyppi = event.target.selecttype.value;
    console.log("aika:", aikavali);
    console.log("datatyyppi:", datatyyppi);
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
