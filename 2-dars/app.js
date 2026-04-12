const table = document.querySelector("table");
const modal = document.querySelector(".modal");
const carde = document.querySelector(".modal__center");

function opene() {
  if (modal.style.display == "none") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags")
  .then((data) => data.json())
  .then((res) => {
    res.sort((a, b) => {
      return a.name.common.localeCompare(b.name.common);
    });
    res.forEach((item, index) => {
      let tr = document.createElement("tr");
      tr.classList.add("table__row");

      tr.innerHTML = `
      <td>${++index}</td>
      <td>${item.name.common}</td>
      <td>
       <img src="${item.flags.png}" alt="photo">
      </td>
      <td>${item.capital}</td>
      <td>
      <i class="fa-solid fa-trash-can"></i>
      <i class="fa-solid fa-eye-slash" id="icon" onclick="opene()"></i>
      </td>
      `;

      table.appendChild(tr);

      tr.addEventListener("click", (e) => {
        carde.innerHTML = `
        <img src="${item.flags.png}" alt="photo" class="modal__img"/>
        <h2 class="title">${item.name.common}</h2>
        <p class="text">${item.flags.alt || "malumot yo'q"}</p>
        <button class="modal__btn" onclick="opene()">Cencel</button>
        `;
      });
    });
    const a = document.querySelectorAll(".fa-trash-can");
    a.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();
      });
    });

    const modale = document.querySelectorAll("#icon");
    modale.forEach((item) => {
      item.addEventListener("click", (e) => {
        let a = e.target;

        a.classList.toggle("fa-eye");
        a.classList.toggle("fa-eye-slash");
        modal.style.display = "flex";
      });
    });
  });

const input = document.querySelector(".input");

input.addEventListener("input", (e) => {
  let inputValue = e.target.value.toLowerCase();
  const tablerow = document.querySelectorAll(".table__row");

  tablerow.forEach((item) => {
    let a = item.children[1].textContent.toLowerCase();

    if (a.includes(inputValue)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
});

const navbar = document.querySelector(".navbar__main");


