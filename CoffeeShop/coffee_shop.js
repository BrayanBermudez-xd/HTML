var cliente = 0;

function calcularPrecio() {
    var drink = document.getElementById("drink").value;
    var ounce = parseInt(document.getElementById("ounce").value);
    var shots = parseInt(document.getElementById("shots").value);
    var nombre = document.getElementById("nombre").value.trim();

    if (!drink || !ounce || !nombre) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
    }

    var price = 0;
    var taxRate = 0.087;

    if (drink === "espresso") {
        price = 1.00;
    } else if (drink === "latte" || drink === "cappuccino") {
        if (ounce === 8) price = 1.55;
        else if (ounce === 12) price = 1.95;
        else if (ounce === 16) price = 2.35;
    } else if (drink === "americano") {
        price = 1.00 + 0.30 * (ounce / 8);
    }

    price += (shots - 1) * 0.70; // Extra por shots
    price += price * taxRate;   // Impuestos

    cliente++;
    agregaRenglon(cliente, price);
    limpiaElementos();
}

function cambiaEstatus(id) {
    var botonEstatus = document.getElementById(id);
    var identregado = "entregado" + id.substr(7);
    var botonEntregado = document.getElementById(identregado);

    if (botonEstatus.classList.contains("btn-primary")) {
        botonEstatus.className = "btn btn-success";
        botonEstatus.innerHTML = "Listo!";
        botonEntregado.className = "btn btn-primary";
        botonEntregado.innerHTML = "<span class='spinner-border spinner-border-sm'></span> En espera de entrega";
    }
}

function cambiaEntrega(id) {
    var botonEntrega = document.getElementById(id);

    if (botonEntrega.classList.contains("btn-primary")) {
        botonEntrega.className = "btn btn-success";
        botonEntrega.innerHTML = "Entregado!";
    }
}

function limpiaElementos() {
    document.getElementById("drink").value = "";
    document.getElementById("ounce").value = "";
    document.getElementById("shots").value = 1;
    document.getElementById("nombre").value = "";
}

function agregaRenglon(cliente, precio) {
    var drink = document.getElementById("drink").value;
    var ounce = document.getElementById("ounce").value;
    var shots = document.getElementById("shots").value;
    var nombre = document.getElementById("nombre").value;

    var tableRef = document.getElementById("tabla");
    var newRow = tableRef.insertRow(-1);

    var columnas = [
        cliente,
        nombre,
        drink,
        ounce,
        shots,
        `$${precio.toFixed(2)}`,
        `<button type='button' id='estatus${cliente}' class='btn btn-primary' onclick='cambiaEstatus(this.id)'>
            <span class='spinner-border spinner-border-sm'></span> En preparación
         </button>`,
        `<button type='button' id='entregado${cliente}' class='btn btn-warning disabled' onclick='cambiaEntrega(this.id)'>Pendiente</button>`
    ];

    columnas.forEach((contenido) => {
        var newCell = newRow.insertCell(-1);
        newCell.innerHTML = contenido;
    });
}
