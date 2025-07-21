const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// do select option hai 
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg_output");

import { countryList } from "./code.js";


for(let select of dropdowns){
    for (let CurrCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = CurrCode;//Naye <option> tag ke andar jo text user ko dikhai dega, wo hoga CurrCode.
        newOption.value = CurrCode;// ab user dropdown me se koi option select karega, toh uski actual value kya hogi (form ya JavaScript ke use ke liye)?
        
        if(select.name === "from" && CurrCode === "USD"){
            newOption.selected = "selected";
        }

        if(select.name === "to" && CurrCode === "INR"){
            newOption.selected = "selected";
        }
        
        select.append(newOption);
    }            

    select.addEventListener( "change" , (evt) => {
        updateFlag(evt.target); // humne select section me event add kiya hai = change ot then this current line me evt.target mean show kaha par change ho raha hai  
    })
}


// change flag with currency code 

const updateFlag = (element) => {
    let CurrCode = element.value;
    let countrycode = countryList[CurrCode];
    let newFlagScr= `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newFlagScr;
}

btn.addEventListener( "click" , (evet) => {
    evet.preventDefault(); // stop default form or button action
    updateExchangeRate();
});

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");// accesss element
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 0) {
        amount.value = "1"; // Input box me default 1 set kar rahe ho
    }


    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    
    const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
}

window.addEventListener("load" , ()=> {
    updateExchangeRate();
})




