// Отримання посилань на елементи DOM
const form = document.querySelector(".row.g-3");
const table = document.getElementById("carTable");
const modal = document.getElementById("myModal");
const closeModalBtn = document.getElementById("closeModal");
const editForm = document.getElementById("editForm");
const savedCars = JSON.parse(localStorage.getItem("cars")) || [];
const colorOptions = ["Червоний", "Синій", "Зелений", "Жовтий"];
const transmitionOption = ["Automat", "Robot", "Manual"];
const volumeOption = [0.9, 1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3.0,3.2, 3.5,3.7,4.0]
const saveButton = document.getElementById("saveButton");
const openModalBtn = document.getElementById('openModalBtn');
const modalData = document.getElementById('modalData');
const list = document.getElementById('list');




const colourSelectModal = document.getElementById("colourSelectModal");
const colourSelectCol12 = document.getElementById("colourSelectCol12");
const transmitionSelectModal = document.getElementById("transmitionSelectModal");
const transmitionSelectCol12 = document.getElementById("transmitionSelectCol12");
const volumeSelectModal = document.getElementById("volumeSelectModal");
const volumeSelectCol12 = document.getElementById("volumeSelectCol12");


for (const transmition of transmitionOption) {
  const optionElement = document.createElement("option");
  optionElement.value = transmition; // Значення опції
  optionElement.textContent = transmition; // Текст опції
  transmitionSelectModal.appendChild(optionElement);
  transmitionSelectCol12.appendChild(optionElement.cloneNode(true));
}


for (const colour of colorOptions) {
  const optionElement = document.createElement("option");
  optionElement.value = colour; // Значення опції
  optionElement.textContent = colour; // Текст опції
  colourSelectModal.appendChild(optionElement);
  colourSelectCol12.appendChild(optionElement.cloneNode(true));
}

for (const volume of volumeOption) {
  const optionElement = document.createElement("option");
  optionElement.value = volume; // Значення опції
  optionElement.textContent = volume; // Текст опції
  volumeSelectModal.appendChild(optionElement);
  volumeSelectCol12.appendChild(optionElement.cloneNode(true));
}
// Додавання опцій для кольору в модальному вікні
colorOptions.forEach(function (color) {
  const optionElement = document.createElement("option");
  optionElement.value = color;
  optionElement.textContent = color;
  colourSelectModal.appendChild(optionElement);
});

// Додавання опцій для трансмісії в модальному вікні
transmitionOption.forEach(function (transmition) {
  const optionElement = document.createElement("option");
  optionElement.value = transmition;
  optionElement.textContent = transmition;
  transmitionSelectModal.appendChild(optionElement);
});

volumeOption.forEach(function (volume) {
  const optionElement = document.createElement("option");
  optionElement.value = volume;
  optionElement.textContent = volume;
  volumeSelectModal.appendChild(optionElement);
});


// Функція для оновлення таблиці на основі збережених даних
function updateTable() {
  table.innerHTML = "";

  savedCars.forEach(function (car, index) {
    const newRow = table.insertRow(index);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    const cell8 = newRow.insertCell(7);
    const cell9 = newRow.insertCell(8);
    const cell10 = newRow.insertCell(9);

    cell1.innerHTML = index + 1; // Номер рядка
    cell2.innerHTML = car.brand;
    cell3.innerHTML = car.model;
    cell4.innerHTML = car.colour;
    cell5.innerHTML = car.carSalon;
    cell6.innerHTML = car.year;
    cell7.innerHTML = car.volume;
    cell8.innerHTML = car.transmition;

    // Додавання кнопок для редагування та видалення
    const editButton = createEditButton(index);
    const deleteButton = createDeleteButton(index);
    cell9.appendChild(deleteButton);
    cell10.appendChild(editButton);
  });
}

// Функція для створення кнопки редагування
function createEditButton(rowIndex) {
  const editButton = document.createElement("button");
  editButton.innerText = "Редагувати";
  editButton.addEventListener("click", function () {
    openModal(rowIndex);
  });
  //editButton.setAttribute("data-index", rowIndex); // Додаємо атрибут з індексом
  return editButton;
}

// Функція для створення кнопки видалення
function createDeleteButton(rowIndex) {
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Видалити";
  deleteButton.addEventListener("click", function () {
    deleteCar(rowIndex);
  });
  return deleteButton;
}

// Функція для редагування автомобіля
function editCar(rowIndex) {
  const carToEdit = savedCars[rowIndex];
  fillEditForm(carToEdit);
  openModal(rowIndex);

  
}

// Функція для видалення автомобіля
function deleteCar(rowIndex) {
  savedCars.splice(rowIndex, 1);
  localStorage.setItem("cars", JSON.stringify(savedCars));
  updateTable();
}

function openModal(rowIndex)
{
  modal.style.display = "block";
  const carToEdit = savedCars[rowIndex];

  // // Створення об'єкта нового автомобіля
  const editBrandInput = document.getElementById("editBrand");
  const editModelInput = document.getElementById("editModel");
  const editColourSelect = document.getElementById("colourSelectCol12");
  const editCarSalonInput = document.getElementById("inputCarSalon");
  const editYearInput = document.getElementById("editYear");
  const editVolumeInput = document.getElementById("volumeSelectCol12");
  const editTransmitionInput = document.getElementById("editTransmition");
  const index = rowIndex;

  // Заповніть поля вводу значеннями з автомобіля
  editBrandInput.value = carToEdit.brand;
  editModelInput.value = carToEdit.model;
  colourSelectModal.value = carToEdit.colour;
  editSalon.value = carToEdit.carSalon;
  editYearInput.value = carToEdit.year;
  volumeSelectModal.value = carToEdit.volume;
  transmitionSelectModal.value = carToEdit.transmition;
  saveButton.addEventListener("click", function () {
    // Отримайте значення полів форми редагування
    const editedBrand = document.getElementById("editBrand").value;
    const editedModel = document.getElementById("editModel").value;
    const editedColour = document.getElementById("colourSelectModal").value;
    const editedCarSalon = document.getElementById("editSalon").value;
    const editedYear = document.getElementById("editYear").value;
    const editedVolume = document.getElementById("volumeSelectModal").value;
    const editedTransmition = document.getElementById("transmitionSelectModal").value;
  
    // Отримайте індекс редагованого автомобіля (можливо ви вже зберігаєте його)
    const editedCarIndex = index;
  
    // Оновіть дані автомобіля в масиві `savedCars`
    savedCars[editedCarIndex] = {
      brand: editedBrand,
      model: editedModel,
      colour: editedColour,
      carSalon: editedCarSalon,
      year: editedYear,
      volume: editedVolume,
      transmition: editedTransmition
    };
  
    // Оновіть збережені дані в localStorage
    localStorage.setItem("cars", JSON.stringify(savedCars));
  
    // Оновіть таблицю для відображення оновлених даних
    updateTable();
  
    // Закрийте модальне вікно
    closeModal();
  });

}

function closeModal()
{
  modal.style.display = "none";
}

updateTable();
closeModalBtn.addEventListener("click", function () {
  closeModal();
});
// Реагування на подію подачі форми
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Отримайте значення полів форми
  const brand = document.getElementById("inputBrand").value;
  const model = document.getElementById("inputModel").value;
  const colour = document.getElementById("colourSelectCol12").value;
  const carSalon = document.getElementById("inputCarSalon").value;
  const year = document.getElementById("inputYear").value;
  const volume = document.getElementById("volumeSelectCol12").value;
  const transmition = document.getElementById("transmitionSelectCol12").value;

  // Створення об'єкта нового автомобіля
  const newCar = {
    brand: brand,
    model: model,
    colour: colour,
    carSalon: carSalon,
    year: year,
    volume: volume,
    transmition: transmition,
  };
  
closeModalBtn.addEventListener("click", function()
{
  closeModal();
})
  // Додавання нового автомобіля до масиву збережених автомобілів
  savedCars.push(newCar);

  // Збереження оновленого масиву в localStorage
  localStorage.setItem("cars", JSON.stringify(savedCars));

  // Оновлення таблиці для відображення нового автомобіля
  updateTable();

  // Очистка полів форми
  form.reset();
});


editForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Заборона дії за замовчуванням (відправки форми)

  // Отримайте значення полів форми редагування
  const editedBrand = document.getElementById("editBrand").value;
  const editedModel = document.getElementById("editModel").value;
  const editedColour = document.getElementById("colourSelectModal").value;
  const editedCarSalon = document.getElementById("editSalon").value;
  const editedYear = document.getElementById("editYear").value;
  const editedVolume = document.getElementById("volumeSelectModal").value;
  const editedTransmition = document.getElementById("transmitionSelectModal").value;

  // Отримайте індекс редагованого автомобіля (можливо ви вже зберігаєте його)
const editedCarIndex = index;

  // Оновіть дані автомобіля в масиві `savedCars`
  savedCars[editedCarIndex] = {
    brand: editedBrand,
    model: editedModel,
    colour: editedColour,
    carSalon: editedCarSalon,
    year: editedYear,
    volume: editedVolume,
    transmition: editedTransmition
  };

  // Оновіть збережені дані в localStorage
  localStorage.setItem("cars", JSON.stringify(savedCars));

  // Оновіть таблицю для відображення оновлених даних
  updateTable();

  // Закрийте модальне вікно
  closeModal();
});

listItem.addEventListener('click', openModal);


