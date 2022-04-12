const form = document.querySelector('.form');
const alert = document.querySelector('.alert');
const clearLists = document.querySelector('.clear-lists');
const submit = document.querySelector('.button');
const input = document.querySelector('.input');
const listContainer = document.querySelector('.list-container');


editElement = '';
editState= false;



form.addEventListener('submit', setDefaultForm);


// *******FUNCTIONS *************
function alertTime( text, color){
    alert.textContent = text;
    alert.classList.add(`alert-${color}`)
    
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${color}`)
    }, 1000)
}

// Preventing default on form 
function setDefaultForm(e){
    e.preventDefault();
    const value = input.value;
    const id = new Date().getTime().toString();
    const newItem = {value, id};
    // console.log(id);

    if( value && !editState){
        // console.log('value entered');
        const element = document.createElement('div')
        element.classList.add('list');
        
        element.innerHTML= `<p class="input-value"> ${value}</p>
        <div class="btn-container">
            <button type="button" class="edit">O</button>
            <button type="button" class="delete">X</button>
        </div>`


        //  deleteBtn***********
        const deleteBtn = element.querySelector('.delete');
        deleteBtn.addEventListener('click', deleteItem)


        //edit Button******
        const editBtn = element.querySelector('.edit')
        editBtn.addEventListener('click', editItem);



        listContainer.appendChild(element);
        clearLists.classList.add('show-clear-lists');
    alertTime('new item added', 'success');
    addToLocalStorage(newItem);
    setToDefault();
        
    }else if(value && editState){
      editElement.innerHTML = value;
      alertTime('item edited!', 'success');
      setToDefault();

    }else{
        alertTime('No Value entered!', 'danger');
    }
    
};


clearLists.addEventListener('click', function(){
    const items = document.querySelectorAll('.list');
    console.log(items);

    if(items.length > 0){
        items.forEach(function(item){
            listContainer.removeChild(item);
        });
    }
    alertTime('All items cleared', 'success');
    clearLists.classList.remove('show-clear-lists');


});

//********* Delete Finction ************ 

function deleteItem(e){
    const parentElement = e.currentTarget.parentElement.parentElement.parentElement;
    console.log(parentElement);
    const delIcon = e.currentTarget.parentElement.parentElement;
    parentElement.removeChild(delIcon);
    // console.log(delIcon);
    clearLists.classList.remove('show-clear-lists');
    alertTime('item removed', 'danger');
    setToDefault();
    
}

//******Edit Function************* */
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    input.value = editElement.innerHTML
    submit.textContent= 'Edit';
    editState = true;  
    // setToDefault();
}
// ********SET BACK TO DEFAULT*******

function setToDefault(){
    editElement = '';
    editState = false;
    input.value= ''
    submit.textContent = 'Submit';
}


// Universal Local Storage

function universalAddToLS(){
    
}

// Add To Local storage

function addToLocalStorage(newItem){
    JSON.parse(localStorage.getItem(list)) ? JSON.stringify(localStorage.setItem("list", [...JSON.parse(localStorage.getItem(list)), newItem])): JSON.stringify(localStorage.setItem("list", []));
    // if (localStorage.getItem(list) === undefine){
    //     localStorage.setItem("list", []);
    // }else{
    //     JSON.parse(localStorage.getItem(list));
    // }
    // list.push(items)
    // localStorage.setItem('list', JSON.stringify(list))
}

// Clear From Local Storage

function clearFromLocalStorage(){

}