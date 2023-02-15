let btn = document.querySelector(".btn");
let name_inp = document.querySelector(".name_inp");
let email_inp = document.querySelector(".email_inp");
let imageUrl_inp = document.querySelector(".imageUrl_inp");
let phone_inp = document.querySelector(".phone_inp");
let list = document.querySelector(".task-list");

btn.addEventListener("click", () => {
  if (
    !name_inp.value.trim() ||
    !email_inp.value.trim() ||
    !imageUrl_inp.value.trim() ||
    !phone_inp.value.trim()
  ) {
    alert("Запольните Поле!!!");
    return;
  }
  let obj = {
    name: name_inp.value,
    email: email_inp.value,
    img: imageUrl_inp.value,
    phone: phone_inp.value,
  };

  setItemToStorage(obj);
  createElement();
  name_inp.value = "";

  email_inp.value = "";

  imageUrl_inp.value = "";

  phone_inp.value = "";
});

function setItemToStorage(mak) {
  if (!localStorage.getItem("Key-data")) {
    localStorage.setItem("Key-data", "[]");
  }
  let data = JSON.parse(localStorage.getItem("Key-data"));

  data.push(mak);

  localStorage.setItem("Key-data", JSON.stringify(data));
}

createElement();
function createElement() {
  if (!localStorage.getItem("Key-data")) {
    localStorage.setItem("Key-data", "[]");
  }
  let newMak = JSON.parse(localStorage.getItem("Key-data"));
  list.innerHTML = "";
  newMak.forEach((item, index) => {
    let li = document.createElement("li");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    li.innerHTML += `<li>${item.name}</li>
     <li>${item.email}</li>
     <image src='${item.img}' width = '300px'/>
   <li>${item.phone}</li>`;
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";

    li.append(btnDelete);
    li.append(btnEdit);

    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });

    list.append(li);
  });
}

function deleteElement(index) {
  let kl = JSON.parse(localStorage.getItem("Key-data"));

  kl.splice(index, 1);
  localStorage.setItem("Key-data", JSON.stringify(kl));
  createElement();
}

let mainModal = document.querySelector(".main-modal");
let inpName = document.querySelector(".inp-Name");
let inpEmail = document.querySelector(".inp-email");
let inpImg = document.querySelector(".inp-img");
let inpPhone = document.querySelector(".inp-phone");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("Key-data"));

  data.forEach((item) => {
    inpName.value = item.name;
  });
  data.forEach((item) => {
    inpEmail.value = item.email;
  });
  data.forEach((item) => {
    inpImg.value = item.img;
  });
  data.forEach((item) => {
    inpPhone.value = item.phone;
  });
  inpName.setAttribute("id", index);
}
btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("Key-data"));
  let index = inpName.id;
  if (
    !inpName.value.trim() &&
    !email_inp.value.trim() &&
    !imageUrl_inp.value.trim() &&
    !phone_inp.value.trim()
  ) {
    alert("запольните поле!");
    return;
  }

  let editedTask = {
    name: inpName.value,
    email: inpEmail.value,
    img: inpImg.value,
    phone: inpPhone.value,
  };

  data.splice(index, 1, editedTask);
  localStorage.setItem("Key-data", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});
