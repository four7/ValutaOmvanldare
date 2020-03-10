export default async function getCurrency() {
    let arr = [];
var url = "https://api.exchangeratesapi.io/latest";
var result;
var result = await fetch(url)
    .then(response => response.json());

    for(var curr in result.rates)
    {
        arr.push(curr)
    }
return arr
}

SetFlags(currency1, currency2)
{
  document.getElementById("span1").src=`/img/${currency1}.png`
  document.getElementById("span2").src=`/img/${currency2}.png`
}