let inventoryData = [];

const tableBody =
document.getElementById('inventoryTable');

async function fetchInventory(){

  try{

    const response =
    await fetch(
      "https://defaultdf1002680b1c406b98d2c76f4ac594.6d.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/107494ec63564d7f93def2ca318edba3/triggers/manual/paths/invoke?api-version=1",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }
      }
    );

    const data =
    await response.json();

    inventoryData = data;

    loadDashboard(inventoryData);

  }

  catch(error){

    console.error(
      "Inventory Fetch Error:",
      error
    );

  }

}

function loadDashboard(data){

  tableBody.innerHTML='';

  let totalQty = 0;
  let lowStock = 0;
  let outStock = 0;

  const stores = new Set();

  data.forEach(item=>{

    totalQty += Number(item.Qty || 0);

    stores.add(item.Store);

    if(Number(item.Qty) === 0){
      outStock++;
    }

    if(Number(item.Qty) > 0 &&
       Number(item.Qty) < 5){
      lowStock++;
    }

    const row =
    document.createElement('tr');

    row.innerHTML = `
      <td>${item.Store || ''}</td>
      <td>${item.ItemCode || ''}</td>
      <td>${item.ProductName || ''}</td>
      <td>${item.Category || ''}</td>
      <td>${item.Grade || ''}</td>
      <td>₹${item.Value || 0}</td>
      <td>${item.Qty || 0}</td>
    `;

    tableBody.appendChild(row);

  });

  document.getElementById('totalQty')
  .innerText = totalQty;

  document.getElementById('lowStock')
  .innerText = lowStock;

  document.getElementById('outStock')
  .innerText = outStock;

  document.getElementById('totalStores')
  .innerText = stores.size;

}

function filterData(){

  const itemValue =
  document.getElementById('itemSearch')
  .value
  .toLowerCase();

  const storeValue =
  document.getElementById('storeSearch')
  .value
  .toLowerCase();

  const filtered =
  inventoryData.filter(item=>{

    return(
      (item.ItemCode || '')
      .toLowerCase()
      .includes(itemValue)

      &&

      (item.Store || '')
      .toLowerCase()
      .includes(storeValue)
    );

  });

  loadDashboard(filtered);

}

document
.getElementById('itemSearch')
.addEventListener('input',filterData);

document
.getElementById('storeSearch')
.addEventListener('input',filterData);

fetchInventory();

setInterval(fetchInventory,30000);