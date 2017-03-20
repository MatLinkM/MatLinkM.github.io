var list = [];

function getTotal(list) {
    var total = 0;
    for (var key in list) {
        total += list[key].amount * list[key].value;
    }
    document.getElementById('total').innerHTML = formatValue(total);
}

function setList(list) {
    var table = '<thead><tr><td>Description</td><td>quantidade</td><td>value</td><td>ação</td></tr></thead><tbody>';
    for (var key in list) {
        table += '<thead><tr><td>' + formatId(list[key].desc) +'</td><td>' + formatAmount(list[key].amount) + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-default" type="button" onclick="setUpdate('+ key +');">Editar</button><button class="btn btn-default" type="button" onclick="deleteData('+ key +');">Deletar</button></td></tr></thead>';
    }
    table += '</body>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatId(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");
    str = "$ " + str;
    return str;
}

function formatAmount(amount) {
    return parseInt(amount);
}

function addData() {
    if (!validForm()) {
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    document.getElementById('errors').style.display = 'none';
    list.unshift({"desc": desc, "amount": amount, "value": value});
    setList(list);
}

function setUpdate(id) {
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("setBtn").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("cancel").style.display = "none";

    document.getElementById("inputID").innerHTML = '<input id="updateID" type="hidden" value="'+id+'">';
}

function update() {
    if (!validForm()) {
        return;
    }
    var id = document.getElementById("updateID").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {'desc': desc, 'amount': amount, 'value': value};
    cancel();
    setList(list);
}

function validForm() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";

    if (desc === "") {
        errors += '<p>Informe a descrição do produto</p>';
    }

    if (amount === "") {
        errors += '<p>Informe a quantidade</p>';
    } else if (amount != parseInt(amount)) {
        errors += '<p>quantidade invalida, digite o numero de itens, por favor</p>';
    }

    if (value === "") {
        errors += '<p>Informe o valor do produto</p>';
    } else if (value != parseFloat(value)) {
        errors += '<p>valor invalido, digite o valor do produto, por favor</p>';
    }

    if (errors != "") {
        document.getElementById('errors').innerHTML = '<h1>Error</h1>' + errors;
        return 0;
    } else {
        return 1;
    }
}

function deleteData(id) {
    list.splice(id, 1);

    setList(list);
}

/*
function checkList(list) {
    if (list.length != 0) {
        document.getElementById('deleteList').style.display = "inline-block";
    }
}
*/

function deleteList() {
    if (confirm("Deseja Excluir a lista de compras?")) {
        list = [];

        setList(list);
    }
}

function cancel() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("setBtn").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById('inputID').innerHTML = "";
}

function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

function loadListStorage(list){
    var testList = localStorage.getItem("list");
    if (testList) {
        list = JSON.parse(testList)
    }
    setList(list);
}

loadListStorage();
