var cliente=0;
   
   function calcularPrecio() {
    
    var drink = document.getElementById("drink").value; 
    var ounce = document.getElementById("ounce").value; 
    var shots = document.getElementById("shots").value;
    var nombre= document.getElementById("nombre").value;
    
    var price;
    var taxRate = 0.087;
    if (drink == "espresso")
	price = 1.00;
	if (drink == "latte" || drink == "cappuccino" ) {
		if (ounce == 8)
			price = 1.55;
		if (ounce == 12)
			price = 1.95;
		if (ounce == 16)
			price = 2.35;
	}
     if (drink == "americano")
	    price = 1.00 + .30 * (ounce/8);
        price=price+(shots-1)*.70;
        price=price+price*taxRate;
        cliente=cliente+1;
        agregaRenglon(cliente,price);
        limpiaElementos();
    }
  
   function cambiaEstatus(id){
       var botonEstatus = document.getElementById(id);
       var identregado = "entregado"+id.substr(7,2);
       var botonEntregado = document.getElementById(identregado);
       if(botonEstatus.getAttribute("class")==="btn btn-primary"){
        botonEstatus.setAttribute("class","btn btn-success");
        botonEstatus.innerHTML="Listo!";
        botonEntregado.setAttribute("class","btn btn-primary");
        botonEntregado.innerHTML="<span class='spinner-border spinner-border-sm' ></span>En espera de entrega";
       }
   }
   
   function cambiaEntrega(id){
       var botonEntrega = document.getElementById(id);
       if(botonEntrega.getAttribute("class")==="btn btn-primary"){
        botonEntrega.setAttribute("class","btn btn-success");
        botonEntrega.innerHTML="Entregado!";
           
       }
   }
   
   function limpiaElementos(){
        document.getElementById("drink").value = ""; 
        document.getElementById("ounce").value = ""; 
        document.getElementById("shots").value = 1;
        document.getElementById("nombre").value = "";
    }
   
   function agregaRenglon(cliente,precio) {
        var drink = document.getElementById("drink").value; 
        var ounce = document.getElementById("ounce").value; 
        var shots = document.getElementById("shots").value;
        var nombre= document.getElementById("nombre").value;


    
        // Obtiene una referencia a la tabla
        var tableRef = document.getElementById("tabla");
        // Inserta una fila en la tabla, en el índice 0
        var newRow   = tableRef.insertRow(-1);
        //creacion de celdas
        
        /*
        var newCell  = newRow.insertCell(-1);
        newCell.innerHTML =  cliente;

        var newCell  = newRow.insertCell(-1);
        newCell.innerHTML =  nombre;
        */

        for (var i = 1; i <= 8; i++) {
            switch(i){
            case 1:
                var contenido = cliente;
                break;
            case 2:
                var contenido = nombre;
                break;
            case 3:
                var contenido = drink;
                break;   
            case 4:
                var contenido = ounce;
                break;    
            case 5:
                var contenido = shots;
                break;
            case 6:
                var contenido = precio.toFixed(2);
                break;
            case 7:
                var contenido = 
                 "<button type='button' id='estatus"+cliente+"' class='btn btn-primary' onclick='cambiaEstatus(this.id)'>\n\
                 <span class='spinner-border spinner-border-sm' ></span>\n\
                 En preparación\n\
                 </button>";      
                 break;
            case 8:
                var contenido = 
                 "<button type='button' id='entregado"+cliente+"' class='btn btn-warning disabled' onclick='cambiaEntrega(this.id)' >\n\
                 Pendiente</button>";
                break;
 
            }
            // Inserta una celda en la fila, en el índice 0
            var newCell  = newRow.insertCell(-1);
            // Añade un nodo de texto a la celda
            newCell.innerHTML =  contenido;
        }
   }