let searchData = {};
const searchItem = document.getElementById("searchItem");
const searchbtn = document.getElementById("searchbtn");
const input = document.getElementById("input");

async function fetchSearchRes(){
    const searchParams = new URLSearchParams(window.location.search);
    const res = await fetch(`https://api.coincap.io/v2/assets/${searchParams.get("search")}`);
    const data = await res.json();
    searchData = data.data;
    if(data.error){
        console.log(data.error);
    }else{
        console.log(searchData);
        if(searchData){
            showItem(searchData);
            const info = document.getElementById("more-info");
            info.addEventListener("click", handleInfo);
        }else{
            let loading = document.createElement("p");
            loading.innerText = "Loading...";
            loading.style.color = "white";
            searchItem.appendChild(loading);
        }
    }
}

fetchSearchRes();

function showItem (data){
    let div = document.createElement("div");
    div.innerHTML = `<div class="py-[2%] border-b-[1px] border-gray-200/50 flex items-center justify-between">
    <p class="text-[25px] w-[200px]">${data.name} <span class="text-gray-500/100">${data.symbol}</span></p>
    <p class="text-[32px] font-[500]">$${data.marketCapUsd.slice(0, 4)}</p>
    <p class="text-[17px] font-[400] text-amber-500">${data.changePercent24Hr.slice(0, 4)}%</p>
    <p class="text-[18px] font-[400]">$${data.volumeUsd24Hr.slice(0, 4)}</p>
    <button id="more-info" class="border-[1px] border-transparent hover:border-white hover:bg-transparent hover:text-white  bg-white text-black font-[500] rounded-[26px] px-[2.5%] py-[0.8%]">Trade</button>
</div>`
    searchItem.appendChild(div);
}

searchbtn.addEventListener("click", handleSubmit);

function handleSubmit(){
    if(input.value){
        window.location.href = `https://search.html?search=${input.value}`;
        input.value = "";
    }
}


    

function handleInfo(){
    console.log("clicked")
    window.location.href = `https://result.html?search=${searchData.id}`;
}