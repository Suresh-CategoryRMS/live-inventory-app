let inventoryData = [];

async function loadInventory(){

  const response = await fetch('inventory.json');
  inventoryData = await response.json();

  populateStoreFilter();
  renderInventory(inventoryData);
  updateKPIs(inventoryData);
}

function populateStoreFilter(){

  const storeFilter = document.getElementById('storeFilter');

  const stores = [...new Set(inventoryData.map(i => i.store))];

  stores.forEach(store => {
    const option = document.createElement('option');
    option.value = store;
    option.textContent = store;
    storeFilter.appendChild(option);
  });
}

function renderInventory(data){

  const container = document.getElementById('inventoryList');
  container.innerHTML = '';

  data.forEach(item => {

    let stockClass = 'stock-green';

    if(item.qty === 0){
      stockClass = 'stock-red';
    } else if(item.qty < 10){
      stockClass = 'stock-orange';
    }

    container.innerHTML += `
      <div class="inventory-card">
        <h3>${item.item}</h3>
        <p>SKU: ${item.sku}</p>
        <p>Store: ${item.store}</p>
        <p class="${stockClass}">Available Qty: ${item.qty}</p>
      </div>
    `;
  });
}

function updateKPIs(data){

  document.getElementById('totalItems').textContent = data.length;

  document.getElementById('lowStock').textContent = data.filter(i => i.qty > 0 && i.qty < 10).length;

  document.getElementById('outStock').textContent = data.filter(i => i.qty === 0).length;
}

function applyFilters(){

  const search = document.getElementById('searchInput').value.toLowerCase();
  const store = document.getElementById('storeFilter').value;

  let filtered = inventoryData.filter(item => {

    const matchesSearch =
      item.item.toLowerCase().includes(search) ||
      item.sku.toLowerCase().includes(search);

    const matchesStore = store === '' || item.store === store;

    return matchesSearch && matchesStore;
  });

  renderInventory(filtered);
  updateKPIs(filtered);
}

document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('storeFilter').addEventListener('change', applyFilters);

document.getElementById('refreshBtn').addEventListener('click', loadInventory);

loadInventory();