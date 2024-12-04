let cliente = 0;

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

    // Enviar el pedido al servidor backend
    enviarPedido(nombre, drink, ounce, shots, price);
}

// Función para enviar el pedido al backend (MongoDB)
function enviarPedido(nombre, drink, ounce, shots, price) {
    const pedido = {
        nombre: nombre,
        drink: drink,
        ounce: ounce,
        shots: shots,
        precio: price
    };

    fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido guardado:', data);
        agregarPedidoATabla(data); // Agregar pedido a la tabla
    })
    .catch(error => {
        console.error('Error al enviar el pedido:', error);
    });
}

// Función para agregar pedido a la tabla
function agregarPedidoATabla(pedido) {
    const tableRef = document.getElementById("tabla");
    const newRow = tableRef.insertRow(-1);
    
    newRow.innerHTML = `
        <td>${pedido._id}</td>
        <td>${pedido.nombre}</td>
        <td>${pedido.drink}</td>
        <td>${pedido.ounce}</td>
        <td>${pedido.shots}</td>
        <td>$${pedido.precio.toFixed(2)}</td>
        <td><button class="btn btn-primary">En preparación</button></td>
        <td><button class="btn btn-warning">Pendiente</button></td>
    `;
}

// Función para limpiar los elementos del formulario
function limpiaElementos() {
    document.getElementById("drink").value = "";
    document.getElementById("ounce").value = "";
    document.getElementById("shots").value = 1;
    document.getElementById("nombre").value = "";
}
