// const access = async () => {
//   console.log("Fetchiing Data");
//   const res = await fetch(baseUrl);
//   console.log(res);
//   let data = await res.json();
//   console.log(data["usd"]);
//   return data;
// };

const dropDowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
document.addEventListener("DOMContentLoaded", () => {
  msg.innerText = "Loading Exchange Rate...";
});
// let fromCurr = fromCurrency.value;
// let toCurr = toCurrency.value;
for (let select of dropDowns) {
  for (currCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = currCode;
    newOptions.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOptions.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOptions.selected = "selected";
    }
    select.append(newOptions);
  }
  select.addEventListener("change", (e) => {
    updateFlags(e.target);
  });
}

const updateFlags = (code) => {
  //   console.log(code);
  let currCode = code.value;
  //   console.log(currCode);
  let countryCode = countryList[currCode];
  console.log(countryCode);
  let imgTag = code.parentElement.querySelector("img");
  //   console.log(imgTag);
  imgTag.src = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amount.value = "1";
    amtVal = 1;
  }
  console.log(fromCurr.value, toCurr.value);
  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();
  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
  const res = await fetch(URL);
  const data = await res.json();
  const rate = data[from][to];
  console.log(rate);
  let total = amtVal * rate;
  console.log(total);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`;
});
