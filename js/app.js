typeof web3 !== 'undefined'
  ? (web3 = new Web3(web3.currentProvider))
  : (web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')));

if (web3.isConnected()) {
  console.log('connected');
} else {
  console.log('not connected');
  exit;
}

const contractAddress = '0xa3ee0babf3d2ee5f516049d716ec61e70c6bf06e';
const smartContract = web3.eth.contract(abi).at(contractAddress);

function showList() {
  const table = document.getElementById('table1');
  const length = smartContract.getNumOfProducts();

  smartContract.product().watch((err, res) => {
    if (!err) {
      console.dir(res);
      const row = table.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);
      cell1.innerHTML = res.args.assist.c[0];
      cell2.innerHTML = res.args.productName;
      cell3.innerHTML = res.args.manpower.c[0];
      cell4.innerHTML = res.args.part.c[0];
      cell5.innerHTML = res.args.circulation.c[0];
      cell6.style.width = '60%';
      cell6.innerHTML = new Date(res.args.timestamp.c[0] * 1000);
    }
  });

  for (let i = 0; i < length; i++) {
    const product = smartContract.getProductStruct(i);
    const toString = product.toString();
    const strArray = toString.split(',');

    const timestamp = new Date(strArray[3] * 1000);
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    cell1.innerHTML = strArray[0];
    cell2.innerHTML = strArray[1];
    cell3.innerHTML = strArray[2];
    cell4.innerHTML = strArray[3];
    cell5.innerHTML = strArray[4];
    cell6.style.width = '60%';
    cell6.innerHTML = timestamp;
  }
}

function addProduct() {
  const assist = document.getElementById('assist').value;
  const productName = document.getElementById('productName').value;
  const manpower = document.getElementById('manpower').value;
  const part = document.getElementById('part').value;
  const circulation = document.getElementById('circulation').value;
  const account = document.getElementById('account').value;
  if (
    web3.personal.unlockAccount(account, document.getElementById('pass').value)
  ) {
    smartContract.addProStru(
      assist,
      productName,
      manpower,
      part,
      circulation,
      { from: account, gas: 2000000 },
      (err, result) => {
        if (!err) alert('트랜잭션이 성공적으로 전송되었습니다.\n' + result);
      }
    );
  }
}

$(function() {
  showList();
});
