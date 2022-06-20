const form = document.querySelector(".form");
const alert = document.querySelector(".alert");
const clearLists = document.querySelector(".clear-lists");
const submit = document.querySelector(".button");
const input = document.querySelector(".input");
const listContainer = document.querySelector(".list-container");

editElement = "";
editState = false;

window.addEventListener("DOMContentLoaded", function () {
	dislplayLocalStorage();
});

form.addEventListener("submit", setDefaultForm);

// *******FUNCTIONS *************
function alertTime(text, color) {
	alert.textContent = text;
	alert.classList.add(`alert-${color}`);

	setTimeout(function () {
		alert.textContent = "";
		alert.classList.remove(`alert-${color}`);
	}, 1000);
}

// Preventing default on form
function setDefaultForm(e) {
	e.preventDefault();
	const value = input.value;
	const id = String(new Date().getTime());

	// console.log(id);

	if (value && !editState) {
		// console.log('value entered');
		displayItem(id, value);
		addToLocalStorage(id, value);
		setToDefault();
	} else if (value && editState) {
		editElement.innerHTML = value;
		alertTime("item edited!", "success");
		editFromLocalStorage(editId, value);
		setToDefault();
	} else {
		alertTime("No Value entered!", "danger");
	}
}

clearLists.addEventListener("click", function () {
	const items = document.querySelectorAll(".list");
	console.log(items);

	if (items.length > 0) {
		items.forEach(function (item) {
			listContainer.removeChild(item);
		});
	}
	alertTime("All items cleared", "success");
	clearLists.classList.remove("show-clear-lists");
	localStorage.removeItem("lists");
});

//********* Delete Finction ************

function deleteItem(e) {
	const parentElement =
		e.currentTarget.parentElement.parentElement.parentElement;
	console.log(parentElement);
	const delIcon = e.currentTarget.parentElement.parentElement;
	console.log(delIcon);
	const id = delIcon.dataset.id;
	console.log(id);
	parentElement.removeChild(delIcon);
	// console.log(delIcon);
	clearLists.classList.remove("show-clear-lists");
	alertTime("item removed", "danger");
	removeFromLocalStorage(id);
	setToDefault();
}

//******Edit Function************* */
function editItem(e) {
	const element = e.currentTarget.parentElement.parentElement.parentElement;
	editElement = e.currentTarget.parentElement.previousElementSibling;
	editEl = e.currentTarget.parentElement.parentElement;
	input.value = editElement.innerHTML;
	editState = true;
	editId = editEl.dataset.id;
	console.log(editId);
	submit.textContent = "Edit";
}
// ********SET BACK TO DEFAULT*******

function setToDefault() {
	editElement = "";
	editState = false;
	input.value = "";
	submit.textContent = "Submit";
}

function addToLocalStorage(id, value) {
	const items = { id, value };
	let lists;
	if (localStorage.getItem("lists") === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem("lists"));
	}
	lists.push(items);
	localStorage.setItem("lists", JSON.stringify(lists));
}

function removeFromLocalStorage(id) {
	let lists;
	if (localStorage.getItem("lists") === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem("lists"));
	}
	lists = lists.filter(function (list) {
		if (list.id !== id) {
			return list;
		}
	});
	localStorage.setItem("lists", JSON.stringify(lists));
}

function editFromLocalStorage(id, value) {
	let lists;
	if (localStorage.getItem("lists") === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem("lists"));
	}
	lists = lists.map(function (list) {
		if (list.id === id) {
			list.value = value;
		}
		return list;
	});
	localStorage.setItem("lists", JSON.stringify(lists));
}

//********DISPLAYONG ITEM FROM LOCAL STRAGE */

function dislplayLocalStorage() {
	let lists;
	if (localStorage.getItem("lists") === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem("lists"));
	}
	if (lists.length > 0) {
		lists.forEach(function (list) {
			displayItem(list.id, list.value);
		});
	}
}

function displayItem(id, value) {
	const element = document.createElement("div");
	element.classList.add("list");
	console.log(id);
	const attr = document.createAttribute("data-id");
	attr.value = id;
	element.setAttributeNode(attr);
	element.innerHTML = `<p class="input-value"> ${value}</p>
        <div class="btn-container">
            <button type="button" class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>`;

	//  deleteBtn***********
	const deleteBtn = element.querySelector(".delete");
	deleteBtn.addEventListener("click", deleteItem);

	//edit Button******
	const editBtn = element.querySelector(".edit");
	editBtn.addEventListener("click", editItem);

	listContainer.appendChild(element);
	clearLists.classList.add("show-clear-lists");
	alertTime("new item added", "success");
}
