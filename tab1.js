const latestTableBody = document.getElementById("viimeisimmat");
const loadingSpinner = document.getElementById("loading-spinner");

const myAsyncFunction = async () => {
  console.log("Entering async function..");

  loadingSpinner.classList.remove("d-none");

  const serverResponse = await fetch(
    "http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50"
  );

  loadingSpinner.classList.add("d-none");

  const data = await serverResponse.json();

  console.log("Data:", data);

  latestTableBody.textContent = "";

  data.forEach((rowData, index) => {
    const row = document.createElement("tr");

    const cellDataArray = [
      index + 1,
      new Date(rowData.date_time).toLocaleString(),
      rowData.id,
      rowData.device_id,
      Object.keys(rowData.data),
      rowData.data[Object.keys(rowData.data)],
    ];

    for (cellData of cellDataArray) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(cellData);

      cell.appendChild(cellText);

      row.appendChild(cell);
    }

    latestTableBody.appendChild(row);
  });
};

myAsyncFunction();
