const fromCurrency = document.getElementById('fromCurrency');
const fromAmount = document.getElementById('fromAmount');
const toCurrency = document.getElementById('toCurrency');
const toAmount = document.getElementById('toAmount');
const diffRates = document.getElementById('rate');
const convert = document.getElementById('convert');
const span1 = document.getElementById('span1');
const span2 = document.getElementById('span2');
const remains = (localStorage.getItem("expireTime") - Date.now()) / 60000;
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
	var temp = fromCurrency.value;
	fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    console.log(temp);
    getData();
    
});

function getValues()
{
    var values = [];
    var radios = document.getElementsByClassName("valutan");

    for (var x = 0; x < radios.length; x++) {
        if(radios[x].attributes[0].value == "text")
        {
            values[radios[x].name] = (radios[x].value);
            values.push(values[radios[x].name]);
            console.log("rätt?");
        }
    }
        return values;
}

function runIt()
{
    var x = getValues();

    for(var prop in x)
    {
        console.log(prop + " is " + x[prop]);
    }
}

function getTime()
{
    let remainingMinutes = (localStorage.getItem("expireTime") - Date.now()) / 60000;
    console.log(`Tid till nästa update: ${remainingMinutes.toFixed(0)} minuter`);
}

async function getData() {
    const from_Currency = fromCurrency.value;
    const to_Currency = toCurrency.value;
    let apiCall;
    var rate;
    var select_value = toCurrency.value;
    var allRates;
    var radios = document.getElementsByClassName("valutan");

    if(radios[`${select_value}`].attributes[4].value === "" || localStorage.getItem("expireTime") < Date.now())
    {
        await fetch(`https://api.exchangerate-api.com/v4/latest/${from_Currency}`)
        .then(response => response.json())
        .then(res => {
            rate = res.rates[to_Currency];
            rate2 = res.rates[to_Currency];
            diffRates.innerText = `1 ${from_Currency} = ${rate} ${to_Currency}`
            toAmount.value = (fromAmount.value * rate).toFixed(2);
            localStorage.setItem(allRates, JSON.stringify(rate2));

            // console.log(currentTime);

            var radios = document.getElementsByClassName("valutan");
            for (var x = 0; x < radios.length; x++)
            {
                if(radios[x].attributes[2].value == select_value)
                {
                    radios[`${select_value}`].attributes[4].value = rate2;
                }
            }
            if(localStorage.getItem("expireTime") < Date.now())
            {
            let currentTime = new Date().getTime();
            let expireTime = currentTime + 3600000;
            localStorage.setItem("expireTime", expireTime);
            }

            localStorage.setItem(apiCall, JSON.stringify(rate));
            console.log("hämtade från API");
        })
        .catch(function(error){
            console.warn('failed: ', error)
        });
    }
    else
    {
        stored = JSON.parse(localStorage.getItem(apiCall));
        
        var store = radios[`${select_value}`].attributes[4].value;

        diffRates.innerText = `1 ${from_Currency} = ${store} ${to_Currency}`
        toAmount.value = (fromAmount.value * store).toFixed(2); 
        console.log(`Hämtade lagrad data`);
        let remainingMinutes = (localStorage.getItem("expireTime") - Date.now()) / 60000;
        console.log(`Tid till nästa update: ${remainingMinutes.toFixed(0)} minuter`);
    }
    
}
var date = ((new Date().getTime() + 100000 ) - Date.now()) / 60000;
console.log(date);
console.log(remains);
getData();
setFlags();
setInterval(getTime, 5000);