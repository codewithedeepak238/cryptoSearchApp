const coinSection = document.getElementById("topcoin-section");
const main = document.getElementById("main");
const searchbtn = document.getElementById("searchbtn");
const input = document.getElementById("input");
let topCoinData = [];


async function fetchTopCoins(){
    try{
        const data = await fetch("https://api.coincap.io/v2/assets");
        const res = await data.json();
        topCoinData = res.data.slice(0, 5)
        showTopCoin(topCoinData);
    }catch(error){
        console.log(error);
    }
}
fetchTopCoins()

function showTopCoin (data){
    data.forEach((ele)=>{
        let div = document.createElement("div");
        div.innerHTML = `<div class="py-[2%] border-b-[1px] border-gray-200/50 flex items-center justify-between">
        <p class="text-[25px] w-[200px]">${ele.name} <span class="text-gray-500/100">${ele.symbol}</span></p>
        <p class="text-[32px] font-[500]">$${ele.marketCapUsd.slice(0, 4)}</p>
        <p class="text-[17px] font-[400] text-amber-500">${ele.changePercent24Hr.slice(0, 4)}%</p>
        <p class="text-[18px] font-[400]">$${ele.volumeUsd24Hr.slice(0, 4)}</p>
        <button class="border-[1px] border-transparent hover:border-white hover:bg-transparent hover:text-white  bg-white text-black font-[500] rounded-[26px] px-[2.5%] py-[0.8%]">Trade</button>
    </div> `
        coinSection.appendChild(div);
    })
}

searchbtn.addEventListener("click", handleSubmit);

function handleSubmit(){
    if(input.value){
        window.location.href = `http://127.0.0.1:5500/search.html?search=${input.value}`;
        input.value = "";
    }
}



