const axios = require('axios');

async function getNumber(){
     const response = await axios.get("http://localhost:3000/number");
     console.log(response.data.number);
     return response.data.number;
}

async function soma(valorA, valorB){
    const response = await axios.post("http://localhost:3000/soma",{valorA:valorA, valorB:valorB });

    return response.data;

}

function tempo(init){
    const end = process.hrtime(init);

    const executionTime = end[0] * 1000 + end[1] / 1e6; // Convert to milliseconds

    console.log(executionTime);
}

function currentTime(){
    const currentTime = new Date();

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const milliseconds = currentTime.getMilliseconds();
    console.log(`Current Time: ${hours}:${minutes}:${seconds}.${milliseconds}`);

}

async function teste(){

    console.log("--teste--");
    currentTime();
    const start = process.hrtime();
   
    const a = await getNumber();
    console.log("valor A");
    tempo(start);
    currentTime();
   
    const b = await getNumber();
    console.log("valor B");
    tempo(start);
    currentTime();
    //console.log(b);
    const response = await soma(a,b);
    console.log(response);

    console.log("--total--");
    tempo(start);
    currentTime();
}

async function teste2(){

    console.log("--teste2--");
    currentTime();
    const start = process.hrtime();

    Promise.all([ getNumber(),getNumber()])
    .then(async (responses)=>{
        console.log("valor A e B");
        tempo(start);
        currentTime();
        const response = await soma(responses[0],responses[1]);
        console.log(response);
        console.log("--total--");
        tempo(start);
        currentTime();
    })
    .catch((error)=>{
        console.log(error);
    })

}


async function testeSync(){
    await getNumber()
    await teste();
    
    await teste2();

}

testeSync();