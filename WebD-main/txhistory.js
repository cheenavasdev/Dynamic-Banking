var firebaseConfig = {
    apiKey: "AIzaSyDWdyHncED-GJRpb0hpLBktT2oZOiEEa_w",
    authDomain: "internship-127d5.firebaseapp.com",
    databaseURL: "https://internship-127d5.firebaseio.com",
    projectId: "internship-127d5",
    storageBucket: "internship-127d5.appspot.com",
    messagingSenderId: "1078991129126",
    appId: "1:1078991129126:web:03a1dd82062f799f4134e7",
    measurementId: "G-4Y1L6GXZV6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var TxData = firebase.database();
var Txref = TxData.ref("TransactionDetails");
Txref.on("value", gotDataTx, errData);
const transactionTable = document.getElementById("TranstableBody");
function gotDataTx(data) {
    var details = data.val();
    var keys = Object.keys(details);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var tr = document.createElement("tr");
        var from = document.createElement("td");
        var to = document.createElement("td");
        var date = document.createElement("td");
        var amount = document.createElement("td");
        from.innerHTML = details[k].from;
        to.innerHTML = details[k].to;
        date.innerHTML = details[k].date.substring(0, 25);
        amount.innerHTML = details[k].amount;
        tr.appendChild(date);
        tr.appendChild(from);
        tr.appendChild(to);
        tr.appendChild(amount);
        if (tr != null) transactionTable.appendChild(tr);
    }
}

function errData(err) {
    console.log("Error!");
    console.log(err);
  }
