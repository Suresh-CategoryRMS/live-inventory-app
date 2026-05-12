const DATA_URL = './inventory.json';

let mode = 'item';
let inventoryData = [];

const itemBtn = document.getElementById('itemBtn');
const storeBtn = document.getElementById('storeBtn');

itemBtn.addEventListener('click', () => {
  mode = 'item';
  itemBtn.classList.add('active');
  storeBtn.classList.remove('active');
});

storeBtn.addEventListener('click', () => {
  mode = 'store';
  storeBtn.classList.add('active');
  itemBtn.classList.remove('active');
});

async function loadData(){
  const response = await fetch(DATA_URL);
  inventoryData = await response.json();
}

document.getElementById('searchBtn').addEventListener('click', searchInventory);

function searchInventory(){

  const value = document.getElementById('searchInput').value.trim().toLowerCase();

  const resultDiv = document.getElementById('result');

  resultDiv.innerHTML = '';

  if(mode === 'item'){

    const item = inventoryData.find(
      i => i.itemCode.toLowerCase() === value
    );

    if(!item){
      resultDiv.innerHTML = '<p>No item found</p>';
      return;
    }

    let storesHTML = '';

    item.stores.forEach(store => {
      storesHTML += `
        <tr>
          <td>${store.storeCode}</td>
          <td>${store.qty}</td>
        </tr>
      `;
    });

    resultDiv.innerHTML = `
      <div class="result-card">
        <h2>${item.productName}</h2>

        <p><b>Item Code:</b> ${item.itemCode}</p>
        <p><b>Grade:</b> ${item.grade}</p>
        <p><b>Selling Price:</b> ${item.sellingPrice}</p>
        <p><b>Remarks:</b> ${item.remarks}</p>

        <table class="store-table">
          <tr>
            <td><b>Warehouse</b></td>
            <td><b>Qty</b></td>
          </tr>

          ${storesHTML}

        </table>
      </div>
    `;

  } else {

    let html = '';

    inventoryData.forEach(item => {

      const matchedStore = item.stores.find(
        s => s.storeCode.toLowerCase() === value
      );

      if(matchedStore){

        html += `
          <div class="result-card">

            <h2>${item.productName}</h2>

            <p><b>Item Code:</b> ${item.itemCode}</p>
            <p><b>Qty:</b> ${matchedStore.qty}</p>

          </div>
        `;
      }

    });

    resultDiv.innerHTML = html || '<p>No inventory found</p>';

  }

}

loadData();