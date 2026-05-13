const inventoryData = [

  {
    store:'MSR',
    itemCode:'WR2131-3',
    description:'Melaka Wardrobe 3DR',
    category:'Bedroom',
    grade:'A',
    vb:24999,
    qty:2
  },

  {
    store:'APR',
    itemCode:'WR2131-3',
    description:'Melaka Wardrobe 3DR',
    category:'Bedroom',
    grade:'A',
    vb:24999,
    qty:3
  },

  {
    store:'NGM',
    itemCode:'WR2131-3',
    description:'Melaka Wardrobe 3DR',
    category:'Bedroom',
    grade:'A',
    vb:24999,
    qty:6
  },

  {
    store:'ATR',
    itemCode:'WR2131-3',
    description:'Melaka Wardrobe 3DR',
    category:'Bedroom',
    grade:'A',
    vb:24999,
    qty:10
  }

];

const tableBody =
document.getElementById('inventoryTable');

function loadDashboard(data){

  tableBody.innerHTML='';

  let totalQty = 0;
  let lowStock = 0;
  let outStock = 0;

  const stores = new Set();

  data.forEach(item=>{

    totalQty += item.qty;

    stores.add(item.store);

    if(item.qty === 0){
      outStock++;
    }

    if(item.qty > 0 && item.qty < 5){
      lowStock++;
    }

    const row =
    document.createElement('tr');

    row.innerHTML = `
      <td>${item.store}</td>
      <td>${item.itemCode}</td>
      <td>${item.description}</td>
      <td>${item.category}</td>
      <td>${item.grade}</td>
      <td>₹${item.vb}</td>
      <td>${item.qty}</td>
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
      item.itemCode.toLowerCase().includes(itemValue)
      &&
      item.store.toLowerCase().includes(storeValue)
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

loadDashboard(inventoryData);