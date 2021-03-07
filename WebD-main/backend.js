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

  
  var db=firebase.database();
  var info=db.ref("iBank");
  var infoUser={
      money:100,
      email:"Cheenavasdev@gmail.com",
      name:"Cheena",
      uid:3

  };
  //info.push(infoUser);

var txStatus = 0;
var senderEmail, recEmail, amount;
var detailsGlobal, keyGlobal, ksGlobal;

var cardDiv=document.getElementById("userInfo");

var realData = firebase.database();
var ref = realData.ref("iBank");
ref.on("value", gotData, errData);
function gotData(data) { 
    cardDiv.innerHTML=""; 
  var details = data.val();
  detailsGlobal = details;
  var keys = Object.keys(details);
  keyGlobal = keys;
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]; 
    var card=document.createElement("div");
    card.className="card bg-dark text-white ";
    var cardBody=document.createElement("div");
    cardBody.className="card-body  ";
    cardBody.style="text-align:center;";
    var head = document.createElement("h5");
    var info = document.createElement("p");
    head.className="card-title";
    info.className="card-text";

    head.innerHTML = details[k].name;
    info.innerHTML ="Email : "+ details[k].email;   
   
    cardBody.appendChild(head);
    cardBody.appendChild(info);
    var transferButton = document.createElement("button");
    transferButton.className = "btn btn-danger";
    transferButton.innerHTML = "Check Info";
    transferButton.id =details[k].uid;
    cardBody.appendChild(transferButton);
    card.appendChild(cardBody);
    var ptag=document.createElement("p");
    ptag.appendChild(card);
    cardDiv.appendChild(ptag);   
  }
 
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}

document.addEventListener("click", function (e) {
    var emailDiv = document.getElementById("email-row");
     var creditDiv = document.getElementById("credit-row");
  
    for (var i = 0; i < keyGlobal.length; i++) {
      var k = keyGlobal[i];
      if (e.target.id == detailsGlobal[k].uid) {
          console.log(e.target.id);
        var email = detailsGlobal[k].email;
        var credit = detailsGlobal[k].money;
        emailDiv.innerHTML = "<p>Email :" + email + "</p>";
        creditDiv.innerHTML = "<p>Credit :" + credit + "</p>";
        senderEmail = email;
        amount = credit;
        $("#userModal").modal("show");
      }
    }
    console.log(e);
  });
  function transerInit() {
    var senderList = document.createElement("option");
    var sender = document.getElementById("sender");
    sender.innerHTML = "";
    senderList.innerHTML = senderEmail;
    sender.appendChild(senderList);
    var rec = document.getElementById("receiver");
    rec.innerHTML = "";
    for (var i = 0; i < keyGlobal.length; i++) {
      var ks = keyGlobal[i];
      var recList = document.createElement("option");
      if (senderEmail == detailsGlobal[ks].email) continue;
      recList.innerHTML = detailsGlobal[ks].email;
      rec.appendChild(recList);
    }  
    $("#infoModal").modal("show");
  }
  function sendMoney() {
    var sender = document.getElementById("sender");
    var rec = document.getElementById("receiver");
    var money = document.getElementById("amount");
    var sk, rk;
    for (var i = 0; i < keyGlobal.length; i++) {
      var k = keyGlobal[i];
      if (detailsGlobal[k].email == sender.value) {
        sk = k;
        console.log(sk);
      }
    }
    for (var i = 0; i < keyGlobal.length; i++) {
      var k = keyGlobal[i];
      if (detailsGlobal[k].email == rec.value) {
        rk = k;
        console.log(rk);
      }
    }
    if (money.value <= 0) {
      window.alert("Please enter a valid amount to transfer!");
      window.location.href = "http://127.0.0.1:5500/";
    } else if (parseFloat(detailsGlobal[sk].credit) < parseFloat(money.value)) {
      console.log(parseFloat(detailsGlobal[sk].money), money.value);
      window.alert("Insufficient Funds in account!");
      window.location.href = "http://127.0.0.1:5500/";
    } else if (
      parseFloat(money.value) > 0 &&
      parseFloat(detailsGlobal[sk].money) >= money.value
    ) {
      console.log(detailsGlobal[sk].money, money.value);
      transaction(sender.value, rec.value, money.value, sk, rk);
    }
  }
  function transaction(sender, rec, money, senderKey, recKey) {
    let userRef = firebase.database().ref("iBank");
  
    if (senderKey != null || recKey != null) {
      userRef.child(senderKey).update({
        money: parseFloat(detailsGlobal[senderKey].money) - parseFloat(money),
      });
      userRef.child(recKey).update({
        money: parseFloat(detailsGlobal[recKey].money) + parseFloat(money),
      });
  
      userRef = firebase.database().ref("TransactionDetails");
      var transData = {
        date: Date(),
        from: sender,
        to: rec,
        amount: money,
      };
      userRef.push(transData);
      window.alert("Transaction Successful!");
      window.location.href = "https://khushigujrati.000webhostapp.com/";
    }
  }
  