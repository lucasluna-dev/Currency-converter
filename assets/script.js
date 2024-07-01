let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");


//Ajustar o valor, passando para inteiro flutuante.
function fixValue(value){
   let fixedValue = value.replace(",", ".");
   let floatValue = parseFloat(fixedValue);
   if(isNaN(floatValue)){
        floatValue = 0;
   }
   return floatValue;
}

//Formatando e ajustando moeda para o formato brasileiro
function formatCurrency(value){
    let fixedValue = fixValue(value);
    let options = {
        useGrouping:false,
        minimumFractionDigits:2
    };

    let formatter = new Intl.NumberFormat("pt-br",options);
    return formatter.format(fixedValue);
}

//Api para trazer a contação no tempo atual que o usuário está solicitando
fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
.then(response=> response.json())
.then(function(json){
    dolar = json.USDBRL['ask']
    eur = json.EURBRL['ask']
    btc = json.BTCBRL['ask']

})
.catch(error => console.error("Erro ao obter o valor do dólar:", error));



//aceite apenas numeros e ponto
function validateInput(input){
    let value = input.value;
    value = value.replace(/[^0-9.,]/g, "");
    input.value = value;
}

usdInput.addEventListener("input", () =>{
    validateInput(usdInput);
    convert("usd-to-brl");
});

brlInput.addEventListener("input", () =>{
    validateInput(brlInput);
    convert("brl-to-usd");
});


// Função para converter os valores
function convert(type){
    if(type === "usd-to-brl"){
        let fixedValue = fixValue(usdInput.value);
        let result = fixedValue * dolar;
        result = result.toFixed(2);
        brlInput.value = formatCurrency(result);
    }

    if(type === "brl-to-usd"){
        let fixedValue = fixValue(brlInput.value);
        let result = fixedValue / dolar;
        result = result.toFixed(2);
        usdInput.value = formatCurrency(result);
    }
}

