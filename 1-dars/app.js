const table = document.querySelector("table");
const data = new XMLHttpRequest();

data.open(
  "GET",
  "https://restcountries.com/v3.1/all?fields=name,capital,flags",
);

data.addEventListener("readystatechange", () => {
  if (data.readyState === 4 && data.status === 200) {
    let a = JSON.parse(data.responseText);

    a.forEach((item, index) => {
      let tr = document.createElement("tr");
      tr.classList.add("tr");

      tr.innerHTML = `
        <td class="number">${index + 1}</td>
        <td><img src="${item.flags.png}" alt=""></td>
        <td class="title">${item.name.common}</td>
        <td>${item.name.official}</td>
      `;

      table.appendChild(tr);
    });
  } else {
    console.log("malumot hato 404");
  }
});

data.send();
