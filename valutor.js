const fromCurrency = document.getElementById('fromCurrency');
const fromAmount = document.getElementById('fromAmount');
const toCurrency = document.getElementById('toCurrency');
const toAmount = document.getElementById('toAmount');
const diffRates = document.getElementById('rate');
const convert = document.getElementById('convert');
const span1 = document.getElementById('span1');
const span2 = document.getElementById('span2');

const cacheTime = 10;
const currentTime = new Date();

currentTime.setHours(currentTime.getHours() + 1);

function setFlags()
{
    const currency1 = fromCurrency.value;
    const currency2 = toCurrency.value;

  span1.src=`img/${currency1}.png`
  span2.src=`img/${currency2}.png`
}

fromCurrency.addEventListener('change', setFlags)
fromCurrency.addEventListener('change', getData);
fromAmount.addEventListener('input', getData);
toCurrency.addEventListener('change', getData);
toAmount.addEventListener('input', getData); 

convert.addEventListener('click', () => {
	const temp = fromCurrency.value;
	fromCurrency.value = toCurrency.value;
	toCurrency.value = temp;
	getData();
});

async function getData() {
    const from_Currency = fromCurrency.value;
    const to_Currency = toCurrency.value;
    var valutan = (`${from_Currency}`);
    let apiCall;
    var rate;
    var rateValue;
    

    // apiCall = await fetch(`https://api.exchangeratesapi.io/latest?base=${from_Currency}&symbols=${to_Currency}`).then(response => response.json());
    // if(localStorage.getItem(apiCall) == null)
    
    // console.log(JASON.parse(JSON.stringify(apiCall)));
    console.log(apiCall);

    if(localStorage.getItem(apiCall) != valutan || localStorage.getItem("expireTime") < Date.now())
    {
    await fetch(`https://api.exchangeratesapi.io/latest?base=${from_Currency}&symbols=${to_Currency}`)
    .then(response => response.json())
    .then(res => {
        rate = res.rates[to_Currency];
        diffRates.innerText = `1 ${from_Currency} = ${rate} ${to_Currency}`
        toAmount.value = (fromAmount.value * rate).toFixed(2);
        // localStorage.setItem(apiCall, JSON.stringify(rate));
        rateValue = rate;
    })
    .then(data =>{
        let currentTime = new Date().getTime();
        let expireTime = currentTime + 3600000;

        apiCall = data;
        // valutan = apiCall;
        localStorage.setItem("expireTime", expireTime);
        localStorage.setItem(apiCall, JSON.stringify(rate));
    })
    .catch(function(error){
        console.warn('failed: ', error)
    });
}
    
    // let storedData = 
    let storedData = localStorage.getItem(apiCall);
    
    toAmount.value = (fromAmount.value * storedData).toFixed(2);
    diffRates.innerText = `1 ${from_Currency} = ${storedData} ${to_Currency}`

    let remainingMinutes = (localStorage.getItem("expireTime") - Date.now()) / 60000;
    console.log(`Hämtade lagrad data`);
    console.log(`Tid till nästa update: ${remainingMinutes.toFixed(0)} minuter`);

    
    if(document.cookie != null)
    {
        console.log(document.cookie);
    }

    if(CacheStorage != null)
    {
        console.log("cache");
    }
    console.log(rate);
}
getData();
setFlags();
 

    