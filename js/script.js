function calcular(numero1, numero2, signo) {

    if(isNaN(numero1)||isNaN(numero2)){
        return "No ingresaste un número."
        
    }
    

    switch (signo) {
        case "+":
            return numero1 + numero2;
        case "-":
            return numero1 - numero2;
        case "*":
            return numero1 * numero2;
        case "/":
            return numero1 / numero2;
        default:
            return "No fue posible calcular la operación.";
    }
}

for (let i = 0; i < 20; i++){
let primerNumero = parseInt(prompt("Ingresá el primer número"))
let segundoNumero = parseInt(prompt("Ingresá el segundo número"))
let signo = prompt("Ingresá el signo segun corresponda: Suma:+ Resta:- Multiplicación:* División:/")
alert (calcular(primerNumero, segundoNumero, signo));
}
