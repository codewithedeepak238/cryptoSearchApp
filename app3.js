const searchbtn = document.getElementById("searchbtn");
const input = document.getElementById("input");
const resultDiv = document.getElementById("result-div");
let searchData = {}
const label = [];
const prices = []




async function fetchSearchRes(){
    const searchParams = new URLSearchParams(window.location.search);
    const res = await fetch(`https://api.coincap.io/v2/assets/${searchParams.get("search")}`);
    const data = await res.json();
    searchData = data.data;
    if(data.error){
        console.log(data.error);
    }else{
        if(searchData){
            showItem(searchData);
            const ctx = document.getElementById('myChart');
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: label,
                  datasets: [{
                    label: `${searchData.name} Prices`,
                    data: prices,
                    lineTension: 0,
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              })
              async function getData(){
                const data = await fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1");
                const res = await data.json();
                res.data.slice(0, 100).forEach(element => {
                  prices.push(element.priceUsd);
                  label.push(Math.floor(element.time/10000000000));
                });
                myChart.update();
              }
            getData()
        }
    }
}

fetchSearchRes();

function showItem (data){
    let div = document.createElement("div");
    div.innerHTML = `<div class="flex items-center justify-between">
    <h2 class="text-2xl">${data.name} <span class="text-[18px] text-gray-500/100">${data.symbol}</span></h2>
    <div class="flex items-center w-[30%] justify-between">
        <p class="flex items-center text-sky-400 cursor-pointer"><span class="material-symbols-outlined">star</span> Add to Watchlist</p>
        <p class="flex items-center text-sky-400 cursor-pointer"><span class="material-symbols-outlined">ios_share</span> Share</p>
        <p class="flex items-center text-sky-400 cursor-pointer"><span class="material-symbols-outlined">download</span> Download</p>
    </div>
</div>
<div class="item-box rounded-[10px] mt-[2%] p-[3%]">
    <div>
        <p class="text-2xl">$61,088.76 USD <span class="text-lg text-amber-500 pl-[1%]">${data.changePercent24Hr.slice(0,3)}%</span> <span class="text-lg pl-[1%]">(24H)</span></p>
    </div>
    <div class="mt-[5%]">
        <p>${data.name} Price Chart(USD)</p>
        <div class="w-[100%]">
            <canvas id="myChart" height="100"></canvas>
        </div>
        <div class="flex items-center justify-between mt-[5%]">
            <p class="flex flex-col text-gray-400">Market Cap (USD)<span class="text-xl text-white">$${data.marketCapUsd.slice(0,4)} B</span></p>
            <p class="flex flex-col text-gray-400">24H VOLUME (USD)<span class="text-xl text-white">$${data.volumeUsd24Hr.slice(0,3)} B</span></p>
            <p class="flex flex-col text-gray-400">Circulating Supply<span class="text-xl text-white">${data.vwap24Hr.slice(0, 3)} M BTC</span></p>
            <p class="flex flex-col text-gray-400">Max Supply
                <span class="text-xl text-white">${data.priceUsd.slice(0, 3)} M BTC</span></p>
            <p class="flex flex-col text-gray-400">Total Supply <span class="text-xl text-white">${data.supply.slice(0,2)} M BTC</span></p>
        </div>
    </div>
</div>`
    resultDiv.appendChild(div);
}


searchbtn.addEventListener("click", handleSubmit);

function handleSubmit(){
    if(input.value){
        window.location.href = `search.html?search=${input.value}`;
        input.value = "";
    }
}