//Variable global
var pantalla;
//carga pantalla igualando el elemento del html resultado a la variable pantalla
window.onload = function(){ 
pantalla=document.getElementById("resultado");
document.onkeydown = teclado; // sirve para escuchar las teclas
}
num="0";
numeroCondicional=1; //iniciar numero en pantalla: 1=si; 0=no;
condicionaDecimal=0; //estado condicionDecimal 0=no, 1=si;
numeroAuxiliar=0; //numero oculto o en espera.
op="no"; //operacion en curso

//mostrar numero en pantalla segun se va escribiendo:
function numero(numPulsado) { //recoge el numero pulsado en el argumento.
         if (num=="0" || numeroCondicional==1  ) {   // inicializar un numero, 
            pantalla.innerHTML=numPulsado; //Para mostrar en pantalla el numero o numeros digitados
            num=numPulsado; //guardar numero pulsado en la variable num
            if (numPulsado==".") { //si escribimos una coma al principio del numero se va a escribir un cero y el punto
               pantalla.innerHTML="0."; //se cambia el . por 0. ya no se puede realizar una operacion sin un numero valido
               num=numPulsado; //guarda en la variable num elnumero pulsado que este caso seria 0. ya que el . solo no es valido
               condicionaDecimal=1; //cambiar estado de la coma
               }
           }
           else { //se continua verificando un numero
               if (numPulsado=="." && condicionaDecimal==0) { //si escribimos una coma decimal pòr primera vez me permitir cargar en pantalla lo digitado
                   pantalla.innerHTML+=numPulsado;
                   num+=numPulsado;
                   condicionaDecimal=1; //cambiar el estado de la coma  
               }
               //si intentamos escribir una segunda coma decimal no realiza ninguna accion.
               else if (numPulsado=="." && condicionaDecimal==1) {}    
               else {
                   pantalla.innerHTML+=numPulsado;
                   num+=numPulsado
               }
            }
            numeroCondicional=0 //el numero esta iniciado y podemos ampliarlo.
         }
function operar(s) {
         igualar() //si hay operaciones pendientes se realizan primero
         numeroAuxiliar=num //ponemos el primer numero en "numero en espera" para poder escribir el segundo.
         op=s; //guardamos tipo de operacion.
         numeroCondicional=1; //inicializar pantalla.
         }  
function igualar() {
         if (op=="no") { //no hay ninguna operacion pendiente.
            pantalla.innerHTML=num;   //mostramos el mismo numero digitado
            }
         else { //en caso de que hay una operacion pendiente
            sl=numeroAuxiliar+op+num; // escribimos la operacion en una cadena
            sol=eval(sl) //convertimos la cadena a codigo y resuelve la instruccion que se le esta enviado por parametros
            pantalla.innerHTML=sol //Se muestra la solucion en pantalla
            num=sol; //se guarda la solución en la variable num
            op="no"; //ya no hay operaciones pendientes por lo cual se iguala la  variable a no
            numeroCondicional=1; //se puede reiniciar la pantalla.
            }
        }
function raizc() {
         num=Math.sqrt(num) //se resuelve la raiz cuadrada del numero digitado mediante el sqrt y mandando el numero por parametros
         pantalla.innerHTML=num; //se muestra en pantalla el resultado
         op="no"; //se remueven las operaciones pendientes.
         numeroCondicional=1; //se reinicia la pantalla 
         }
function porcentaje() { 
         num=num/100 //se divide por 100 el numero
         pantalla.innerHTML=num; //se muestra en pantalla
         igualar() //se resuelve y muestra las  operaciones pendientes
         numeroCondicional=1 //se reinicia la pantalla
         }

function retro(){ //Borrar solo un numero digitado de la cadena a la vez
         cifras=num.length; //hayar numero de caracteres en pantalla
         br=num.substr(cifras-1,cifras) //describir ultimo caracter
         num=num.substr(0,cifras-1) //quitar el ultimo caracter
         if (num=="") {num="0";} //si ya no quedan caracteres, pondremos el 0
         if (br==".") {condicionaDecimal=0;} //Si el caracter quitado es la coma, se permite escribirla de nuevo.
         pantalla.innerHTML=num; //mostrar resultado en pantalla   
         }
function borradoParcial() {
        pantalla.innerHTML=0; //Borrado de pantalla;
        num=0;//Borrado indicador numeero pantalla.
        condicionaDecimal=0; //reiniciamos tambi&eacute;n la coma                
        }
function borradoTotal() {
         pantalla.innerHTML=0; //poner pantalla a 0
         num="0"; //reiniciar numero en pantalla
         condicionaDecimal=0; //reiniciar estado coma decimal 
         numeroAuxiliar=0 //indicador de numero oculto a 0;
         op="no" //borrar operacion en curso.
         }
function teclado (elEvento) { 
         evento = elEvento || window.event;
         k=evento.keyCode; //se guarda en la varible k el codifo del evento de la tecla presionada
         if (k>47 && k<58) { 
            p=k-48; //buscar numero a mostrar.
            p=String(p) //todos los valores los convierte en string para mostrarlos en pantalla
            numero(p); //envia el número digitado mostrado en pantalla
            }   
         //Teclas del teclado numerico. Seguimos el mismo procedimiento que en el anterior.
         if (k>95 && k<106) {
            p=k-96;
            p=String(p);
            numero(p);
            }
         if (k==110 || k==190) {numero(".")} //teclas de coma decimal
         if (k==106) {operar('*')} //tecla multiplicacion
         if (k==107) {operar('+')} //tecla suma
         if (k==109) {operar('-')} //tecla resta
         if (k==111) {operar('/')} //tecla division
         if (k==32 || k==13) {igualar()} //Tecla igual: intro o barra espaciadora
         if (k==46) {borradoTotal()} //Tecla borrado total: "supr"
         if (k==8) {retro()} //Retroceso en escritura : tecla retroceso.
         if (k==36) {borradoParcial()} //Tecla borrado parcial: tecla de inicio.
         }
