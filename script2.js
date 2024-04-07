const submitBtn = document.getElementById("submit-btn");
const closeBtn = document.getElementById("close-btn");
const addBtn = document.getElementById("add-btn");

let itemCount = 1;
let categories = [];
let table = new DataTable("#main-table", {
  responsive: true,
});

const today = new Date().toISOString().split("T")[0];
document.getElementById("validationCustom03").setAttribute("max", today);

(() => {
  ("use strict");
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (form.checkValidity()) {
          actionDecision();
        }
        event.preventDefault();
        event.stopPropagation();

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

addBtn.addEventListener("click", () => {
  document.getElementById("formId").reset();
  resetForm();
});

const actionDecision = () => {
  if (submitBtn.getAttribute("data-bs-action") === "update") {
    updateCategoryToList();
  } else {
    addCategory();
  }
  renderCategory();
  closeBtn.click();
};

const addCategory = () => {
  const categoryName = document.getElementById("validationCustom01");
  const categoryDescription = document.getElementById("validationCustom02");
  const active = document.getElementById("invalidCheck");
  const launchDate = document.getElementById("validationCustom03");
  console.log(active.checked);

  let activeStatus = true;
  if (!active.checked) {
    activeStatus = false;
  }

  let items = [];
  const rows = document.querySelectorAll("#secondary-tbody tr");
  rows.forEach((row) => {
    let itemActiveStatus = true;
    if (!row.querySelector(".item-active").checked) itemActiveStatus = false;
    let item = {
      itemName: row.querySelector(".item-name").value,
      itemDescription: row.querySelector(".item-description").value,
      foodType: row.querySelector(".food-type").value,
      price: row.querySelector(".price").value,
      discount: row.querySelector(".discount").value,
      gst: row.querySelector(".gst").value,
      itemActive: itemActiveStatus,
    };
    items.push(item);
  });

  let category = {
    categoryName: categoryName.value,
    categoryDescription: categoryDescription.value,
    activeStatus: activeStatus,
    launchDate: launchDate.value,
    items: items,
  };
  categories.push(category);
  console.log(categories);
};

const updateCategory = (index) => {
  let currentCategory = categories[index];
  addBtn.click();
  document.getElementById("validationCustom01").value =
    currentCategory.categoryName;
  document.getElementById("validationCustom02").value =
    currentCategory.categoryDescription;
  document.getElementById("invalidCheck").checked = currentCategory.activeStatus;
  document.getElementById("validationCustom03").value =
    currentCategory.launchDate;

  const secondaryTbody = document.getElementById("secondary-tbody");
  secondaryTbody.innerHTML = "";
  secondaryTbody.innerHTML = currentCategory.items
    .map((item, index) => {
      return `
    <tr>
      <td>
          <input type="text" class="form-control item-name" pattern="^[a-zA-Z ]+$" value="${
            item.itemName
          }"
              required>
          <div class="invalid-feedback">
              Only alphabets allowed!
          </div>
      </td>
      <td>
          <input type="text" class="form-control item-description"
              pattern="^[a-zA-Z ]+$" value="${item.itemDescription}" pattern="">
          <div class="invalid-feedback">
              Only alphabets allowed!
          </div>
      </td>
      <td>
          <select class="form-select form-select food-type" value="${
            item.foodType
          }" required>
              <option value="veg" selected>Veg</option>
              <option value="non-veg">Non-veg</option>
              <option value="sea food">Sea food</option>
              <option value="vegan">Vegan</option>
              <option value="dairy food">Dairy food</option>
          </select>
      </td>
      <td>
          <input type="number" class="form-control price" value="${
            item.price
          }" step="0.01" min="1"
              required>
          <div class="invalid-feedback">
              Can't be empty!
          </div>
      </td>
      <td>
          <input type="number" class="form-control discount" value="${
            item.discount
          }" step="0.01"
              max="15" min="1" required>
          <div class="invalid-feedback">
              Can't be empty!
          </div>
      </td>
      <td>
          <input type="number" class="form-control gst" value="${
            item.gst
          }" step="0.01" max="15"
              min="0" required>
          <div class="invalid-feedback">
              allowed below 15!
          </div>
      </td>
      <td>
          <div class="form-check">
              <input class="form-check-input item-active" type="checkbox"
                    ${item.itemActive === true ? 'checked' : ""}>
              <div class="invalid-feedback">
                  You must agree before submitting.
              </div>
          </div>
      </td>
      <td>
          <button class="btn btn-outline-danger" onclick="removeRow(this)"
              ${index < 1 ? "disabled" : ""}>Remove</button>
      </td>
    </tr>
    `;
    })
    .join("");
  submitBtn.setAttribute("data-bs-action", "update");
  submitBtn.setAttribute("data-bs-index", index);
};

const updateCategoryToList = () => {
  const index = submitBtn.getAttribute("data-bs-index");

  const categoryName = document.getElementById("validationCustom01");
  const categoryDescription = document.getElementById("validationCustom02");
  const active = document.getElementById("invalidCheck");
  const launchDate = document.getElementById("validationCustom03");

  let activeStatus = true;
  if (!active.checked) {
    activeStatus = false;
  }

  let items = [];
  const rows = document.querySelectorAll("#secondary-tbody tr");
  rows.forEach((row) => {
    let itemActiveStatus = true;
    if (!row.querySelector(".item-active").checked) itemActiveStatus = false;
    let item = {
      itemName: row.querySelector(".item-name").value,
      itemDescription: row.querySelector(".item-description").value,
      foodType: row.querySelector(".food-type").value,
      price: row.querySelector(".price").value,
      discount: row.querySelector(".discount").value,
      gst: row.querySelector(".gst").value,
      itemActive: itemActiveStatus,
    };
    items.push(item);
  });

  let currentCategory = {
    categoryName: categoryName.value,
    categoryDescription: categoryDescription.value,
    activeStatus: activeStatus,
    launchDate: launchDate.value,
    items: items,
  };
  categories[index] = currentCategory;
  closeBtn.click();
};

const renderCategory = () => {
  table.clear().draw();
  categories.forEach((Element, index) => {
    let sevenDaysAgo = new Date();
    let givenDate = new Date(Element.launchDate);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    table.row
      .add([
        `<button class="btn btn-primary btn-sm mx-1" onclick="viewNestedTable(${index}, this)" >Bill</button>`,
        Element.categoryName,
        Element.categoryDescription,
        Element.activeStatus === true ? "Yes" : "No",
        sevenDaysAgo < givenDate ? "New" : "Old",
        `<button class="btn btn-outline-warning btn-sm" onclick="updateCategory(${index}, this)">Update</button><button class="btn btn-outline-danger btn-sm ms-2" onclick="deleteCategory(${index})">Delete</button>`,
      ])
      .draw();
  });
};

const resetForm = () => {
  itemCount = 1;
  submitBtn.setAttribute("data-bs-action", "add");
  submitBtn.removeAttribute("data-bs-index");
  defaultRow();
  document.getElementById("formId").classList.remove("was-validated");
};

const AddItemRow = () => {
  const tbody = document.getElementById("secondary-tbody");
  const row = `
  <tr>
    <td>
        <input type="text" class="form-control item-name" pattern="^[a-zA-Z ]+$"
            value="" required>
        <div class="invalid-feedback">
            Only alphabets allowed!
        </div>
    </td>
    <td>
        <input type="text" class="form-control item-description"
            pattern="^[a-zA-Z ]+$" value="" pattern="">
        <div class="invalid-feedback">
            Only alphabets allowed!
        </div>
    </td>
    <td>
        <select class="form-select form-select food-type" required>
            <option value="veg" selected>Veg</option>
            <option value="non-veg">Non-veg</option>
            <option value="sea food">Sea food</option>
            <option value="vegan">Vegan</option>
            <option value="dairy food">Dairy food</option>
        </select>
    </td>
    <td>
        <input type="number" class="form-control price" value="" step="0.01" min="1"
            required>
        <div class="invalid-feedback">
            Can't be empty!
        </div>
    </td>
    <td>
        <input type="number" class="form-control discount" value="" step="0.01"
            max="15" min="1" required>
        <div class="invalid-feedback">
            Can't be empty!
        </div>
    </td>
    <td>
        <input type="number" class="form-control gst" value="" step="0.01" max="15"
            min="0" required>
        <div class="invalid-feedback">
            allowed below 15!
        </div>
    </td>
    <td>
        <div class="form-check">
            <input class="form-check-input item-active" type="checkbox"
                 checked>
            <div class="invalid-feedback">
                You must agree before submitting.
            </div>
        </div>
    </td>
    <td>
        <button class="btn btn-outline-danger" onclick="removeRow(this)"
            >Remove</button>
    </td>
  </tr>
    `;
  itemCount++;
  if (itemCount < 11) {
    tbody.insertAdjacentHTML("beforeend", row);
  }
};

const removeRow = (button) => {
  const row = button.closest("tr");
  itemCount--;
  row.remove();
};

const defaultRow = () => {
  const tbody = document.getElementById("secondary-tbody");
  tbody.innerHTML = `
    <tr>
      <td>
          <input type="text" class="form-control item-name" pattern="^[a-zA-Z ]+$"
              value="" required>
          <div class="invalid-feedback">
              Only alphabets allowed!
          </div>
      </td>
      <td>
          <input type="text" class="form-control item-description"
              pattern="^[a-zA-Z ]+$" value="" pattern="">
          <div class="invalid-feedback">
              Only alphabets allowed!
          </div>
      </td>
      <td>
          <select class="form-select form-select food-type" required>
              <option value="veg" selected>Veg</option>
              <option value="non-veg">Non-veg</option>
              <option value="sea food">Sea food</option>
              <option value="vegan">Vegan</option>
              <option value="dairy food">Dairy food</option>
          </select>
      </td>
      <td>
          <input type="number" class="form-control price" value="" step="0.01" min="1"
              required>
          <div class="invalid-feedback">
              Can't be empty!
          </div>
      </td>
      <td>
          <input type="number" class="form-control discount" value="" step="0.01"
              max="15" min="1" required>
          <div class="invalid-feedback">
              Can't be empty!
          </div>
      </td>
      <td>
          <input type="number" class="form-control gst" value="" step="0.01" max="15"
              min="0" required>
          <div class="invalid-feedback">
              allowed below 15!
          </div>
      </td>
      <td>
          <div class="form-check">
              <input class="form-check-input item-active" type="checkbox"
                  checked>
              <div class="invalid-feedback">
                  You must agree before submitting.
              </div>
          </div>
      </td>
      <td>
          <button class="btn btn-outline-danger" onclick="removeRow(this)"
              disabled>Remove</button>
      </td>
    </tr>
  `;
};

const viewNestedTable = (index, button) => {
  const currentCategory = categories[index];
  const tr = button.closest("tr");
  let nestedTable = `
  <div class="table-responsive">
    <table class="table table-primary">
        <thead>
            <tr>
                <th scope="col">Number</th>
                <th scope="col">Item Name</th>
                <th scope="col">Food type</th>
                <th scope="col">Price</th>
                <th scope="col">Discount</th>
                <th scope="col">Discounted Price</th>
            </tr>
        </thead>
        <tbody>`;

  let totalPrice = 0;
  let totalDiscount = 0;

  currentCategory.items.forEach((item, index) => {
    let price = parseFloat(item.price);
    let gstValue = (item.gst * price) / 100;
    let discountValue = ((price + gstValue) * item.discount) / 100;
    let discountedPrice = price + gstValue - discountValue;

    totalPrice += price;
    totalDiscount += discountedPrice;

    nestedTable += `<tr>
      <td>${index + 1}</td>
      <td>${item.itemName}</td>
      <td>${item.foodType}</td>
      <td>${price.toFixed(2)}</td>
      <td>${parseFloat(item.discount).toFixed(2)}%</td>
      <td>${parseFloat(discountedPrice).toFixed(2)}</td>
    </tr>`;
  });

  nestedTable += `<tr>
      <td>total</td>
      <td></td>
      <td></td>
      <td>${parseFloat(totalPrice).toFixed(2)}</td>
      <td></td>
      <td>${parseFloat(totalDiscount).toFixed(2)}</td>
    </tr>`;

  nestedTable += `</tbody>
        </table>
    </div>`;

  if (table.row(tr).child.isShown()) {
    table.row(tr).child(nestedTable).hide();
  } else {
    table.row(tr).child(nestedTable).show();
  }
};
renderCategory();

const deleteCategory = (index) => {
  if (confirm("Are you sure you want to delete?")) {
    categories.splice(index, 1);
    renderCategory();
  }
};
