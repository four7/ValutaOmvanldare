const fromCurrency = document.getElementById('fromCurrency');
const fromAmount = document.getElementById('fromAmount');
const toCurrency = document.getElementById('toCurrency');
const toAmount = document.getElementById('toAmount');
const diffRates = document.getElementById('rate');
const convert = document.getElementById('convert');
const cacheTime = 10;


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
    
    await fetch(`https://api.exchangeratesapi.io/latest?base=${from_Currency}&symbols=${to_Currency}`,{cache: "no-cache"})
    .then(response => response.json())
    .then(res => {
        const rate = res.rates[to_Currency];
		diffRates.innerText = `1 ${from_Currency} = ${rate} ${to_Currency}`
		toAmount.value = (fromAmount.value * rate).toFixed(2);
    });
    console.log(cache);
}
getData();
 

    