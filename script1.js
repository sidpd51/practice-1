const addBtn = document.getElementById('add-btn')
const submitBtn = document.getElementById('submit-btn')
const closeBtn = document.getElementById('close-btn')

let itemCount=1
let currentDate = new Date()
let sevenDaysAgo = new Date()
let table = new DataTable('#main-table',{
    responsive: true
})

let today = currentDate.toISOString().split('T')[0]
document.getElementById('validationCustom03').setAttribute('max',today)
sevenDaysAgo.setDate(currentDate.getDate()-7);

// const getLocalStorage = () =>{

// }
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (form.checkValidity()) {
          actionDecision()
        }
        event.preventDefault()
        event.stopPropagation()
        form.classList.add('was-validated')
      }, false)
    })
  })()

let categories =[]

const actionDecision = ()=>{
    console.log('actionDecision')
    if(submitBtn.getAttribute('data-bs-action')==='update'){
        console.log('update category')
        updateCategoryToList()
        
    }else{
        console.log('add category')
        addCategory()
    }
    // renrender 
    rerender()
    closeBtn.click()
}

addBtn.addEventListener('click',()=>{
    refactorForm()
})

const addCategory = () =>{
    const rows = document.querySelectorAll('#secondary-tbody tr')
    const categoryName = document.getElementById('validationCustom01')
    const categoryDescription = document.getElementById('validationCustom02')
    const launchDate = document.getElementById('validationCustom03')
    const activeStatus = document.getElementById('invalidCheck')
    
    let items = []
    rows.forEach((row)=>{
        let item = {
            itemName: row.querySelector('.item-name').value,
            itemDescription: row.querySelector('.item-description').value,
            foodType:row.querySelector('.food-type').value,
            price:row.querySelector('.price').value,
            discount:row.querySelector('.discount').value,
            gst:row.querySelector('.gst').value,
            isItemActive:row.querySelector('.item-active').checked===true
        }
        items.push(item)
    })

    let category = {
        categoryName: categoryName.value,
        categoryDescription: categoryDescription.value,
        launchDate: launchDate.value,
        activeStatus: activeStatus.checked===true,
        items: items
    }
    categories.push(category)
    console.log(categories)
}

const updateCategory = (index)=>{
    let currentCategory = categories[index]
    addBtn.click()
    const categoryName = document.getElementById('validationCustom01')
    const categoryDescription = document.getElementById('validationCustom02')
    const launchDate = document.getElementById('validationCustom03')
    const activeStatus = document.getElementById('invalidCheck')
    
    categoryName.value = currentCategory.categoryName
    categoryDescription.value = currentCategory.categoryDescription
    launchDate.value = currentCategory.launchDate
    activeStatus.checked = currentCategory.activeStatus

    const secondaryTbody = document.getElementById('secondary-tbody')
    secondaryTbody.innerHTML=''
    secondaryTbody.innerHTML=currentCategory.items.map((item,index)=>{
        return`
        <tr>
            <td>
                <input type="text" class="form-control item-name" pattern="^[a-zA-Z ]+$"
                    value="${item.itemName}" required>
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
                <select class="form-select form-select food-type" required>
                    <option value="veg" ${item.foodType==='veg'?'selected': ''}>Veg</option>
                    <option value="non veg" ${item.foodType==='non veg'?'selected': ''}>Non-veg</option>
                    <option value="sea food" ${item.foodType==='sea food'?'selected': ''}>Sea food</option>
                    <option value="vegan" ${item.foodType==='vegan'?'selected': ''}>Vegan</option>
                    <option value="dairy food" ${item.foodType==='dairy food'?'selected': ''}>Dairy food</option>
                </select>
            </td>
            <td>
                <input type="number" class="form-control price" value="${item.price}" step="0.01" min="1"
                    required>
                <div class="invalid-feedback">
                    Can't be empty!
                </div>
            </td>
            <td>
                <input type="number" class="form-control discount" value="${item.discount}" step="0.01"
                    max="15" min="1" required>
                <div class="invalid-feedback">
                    Can't be empty!
                </div>
            </td>
            <td>
                <input type="number" class="form-control gst" value="${item.gst}" step="0.01" max="15"
                    min="0" required>
                <div class="invalid-feedback">
                    allowed below 15!
                </div>
            </td>
            <td>
                <div class="form-check">
                    <input class="form-check-input item-active" type="checkbox" ${item.isItemActive?'checked':''}>
                    <div class="invalid-feedback">
                        You must agree before submitting.
                    </div>
                </div>
            </td>
            <td>
                <button class="btn btn-outline-danger" onclick="removeRow(this)"
                    ${index<1?'disabled':''}>Remove</button>
            </td>
        </tr>
        
        `
    }).join('')

    submitBtn.setAttribute('data-bs-action','update')
    submitBtn.setAttribute('data-bs-index', index)
}

const updateCategoryToList = ()=>{
    let index = submitBtn.getAttribute('data-bs-index');
    const rows = document.querySelectorAll('#secondary-tbody tr')
    const categoryName = document.getElementById('validationCustom01')
    const categoryDescription = document.getElementById('validationCustom02')
    const launchDate = document.getElementById('validationCustom03')
    const activeStatus = document.getElementById('invalidCheck')
    
    let items = []
    rows.forEach((row)=>{
        let item = {
            itemName: row.querySelector('.item-name').value,
            itemDescription: row.querySelector('.item-description').value,
            foodType:row.querySelector('.food-type').value,
            price:row.querySelector('.price').value,
            discount:row.querySelector('.discount').value,
            gst:row.querySelector('.gst').value,
            isItemActive:row.querySelector('.item-active').checked===true
        }
        items.push(item)
    })

    let category = {
        categoryName: categoryName.value,
        categoryDescription: categoryDescription.value,
        launchDate: launchDate.value,
        activeStatus: activeStatus.checked===true,
        items: items
    }
    categories[index]=category
    console.log(categories)
}

const deleteCategory = (index) => {
    if(confirm('Are you sure you want to delete?')){
        categories.splice(index,1)
        //rerender 
        rerender()
    }
}

const refactorForm = () =>{
    let myForm = document.getElementById('formId')
    myForm.classList.remove('was-validated')
    myForm.reset()
    defaultRow()
}

const rerender = () =>{
    console.log('rerender called')
    // const mainTbody = document.getElementById('main-tbody')
    // mainTbody.innerHTML=categories.map((element,index)=>{

    //     let launchDate = new Date(element.launchDate)
    //     return `
    //     <td></td>
    //     <td>${element.categoryName}</td>
    //     <td>${element.categoryDescription}</td>
    //     <td>${element.activeStatus?'Yes':'No'}</td>
    //     <td>${launchDate>sevenDaysAgo?'New':'Old'}</td>
    //     <td><button class="btn btn-outline-warning btn-sm" onclick="updateCategory(${index})">Update</button><button class="btn btn-outline-danger btn-sm ms-2" onclick="deleteCategory(${index})">Delete</button></td>
    //     `
    // })
    table.clear().draw()
    categories.forEach((category, index)=>{
        let launchDate = new Date(category.launchDate)
        table.row.add([
            `<button class="btn btn-outline-success btn-sm" onclick="showBill(${index}, this)">Bill</button>`,
            category.categoryName,
            category.categoryDescription,
            category.activeStatus?'Yes':'No',
            launchDate>sevenDaysAgo?'New':'Old',
            `<button class="btn btn-outline-warning btn-sm" onclick="updateCategory(${index})">Edit</button><button class="btn btn-outline-danger btn-sm ms-2" onclick="deleteCategory(${index})">Delete</button>`          
        ]).draw(false)
    })
}

const showBill = (index, button) =>{
    const currentCategory = categories[index]
    const tr = button.closest('tr')
    let nestedTable = `
    <h2 class="h2 text-center">Items</h2>
    <div class="table-responsive">
    <table class="table table-primary">
        <thead>
            <tr>
                <th scope="col">Number</th>
                <th scope="col">Item name</th>
                <th scope="col">Food Type</th>
                <th scope="col">Price</th>
                <th scope="col">Discount</th>
                <th scope="col">Discounted Price</th>
            </tr>
        </thead>
        <tbody>`
    let totalDiscountAmount =0
    let totalPrice =0
    currentCategory.items.forEach((item,index)=>{
        let discountedPrice = parseFloat(item.price*item.discount/100).toFixed(2)
        totalDiscountAmount+=discountedPrice
        totalPrice+=parseFloat(item.price)
        nestedTable+=`<tr>
            <td>${index+1}</td>
            <td>${item.itemName}</td>
            <td>${item.foodType}</td>
            <td>${parseFloat(item.price).toFixed(2)}</td>
            <td>${item.discount}%</td>
            <td>${discountedPrice}</td>
        </tr>`
    })
    nestedTable+=`<tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>${parseFloat(totalPrice).toFixed(2)}</td>
            <td></td>
            <td>${parseFloat(totalDiscountAmount).toFixed(2)}</td>
        </tr>
        </tbody>
        </table>
    </div>`

    if(table.row(tr).child.isShown()){
        table.row(tr).child(nestedTable).hide()
    }else{
        table.row(tr).child(nestedTable).show()
    }
}

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