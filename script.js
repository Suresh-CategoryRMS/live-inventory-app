const inventoryData = [
  {
    store:'MSR',
    itemCode:'TSH001',
    description:'Blue T-Shirt',
    category:'Fashion',
    grade:'A',
    vb:999,
    qty:20
  },
  {
    store:'BNG',
    itemCode:'SOFA101',
    description:'Luxury Sofa',
    category:'Living',
    grade:'B',
    vb:25000,
    qty:3
  },
  {
    store:'APR',
    itemCode:'BED501',
    description:'King Size Bed',
    category:'Bedroom',
    grade:'NPP',
    vb:40000,
    qty:0
  },
  {
    store:'HYD',
    itemCode:'DIN220',
    description:'Dining Table',
    category:'Dining',
    grade:'A',
    vb:18000,
    qty:11
  }
];

const tableBody = document.getElementById('inventoryTable');
const resultsCount = document.getElementById('resultsCount');

function loadDashboard(data){

  tableBody.innerHTML = '';

  let totalQty = 0;
  let lowStock = 0;
  let outStock = 0;
  let totalValue = 0;
  const stores = new Set();

  data.forEach(item => {

    totalQty += item.qty;
    totalValue += item.qty * item.vb;
    stores.add(item.store);

    if(item.qty === 0){
      outStock++;
    }

    if(item.qty > 0 && item.qty < 5){
storeSearch.addEventListener('input', filterData);