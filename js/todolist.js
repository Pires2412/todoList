(function () {
	"use strict";

	const inputText = document.getElementById("item-input");
	const todoAddForm = document.getElementById("todo-add");
	const ul = document.getElementById("todo-list");

	let taskList = [];

	function addTask(task) {
		taskList.push({
			name: task,
			createdAt: Date.now(),
			completed: false,
		});
	}

	function genereteLiTask(obj) {
		const listItem = document.createElement("li");
		listItem.classList.add("todo-item");
		const paragraph = document.createElement("p");
		paragraph.classList.add("task-name");
		const checkButton = document.createElement("button");
		const editButton = document.createElement("i");
		const deleteButton = document.createElement("i");

		checkButton.className = "button-check";
		checkButton.innerHTML = '<i class="fas fa-check displayNone"></i>';

		editButton.className = "fas fa-edit";

		deleteButton.classList.add("fas", "fa-trash-alt");

		listItem.appendChild(checkButton);
		paragraph.textContent = obj.name;
		listItem.appendChild(paragraph);
		listItem.appendChild(editButton);
		listItem.appendChild(deleteButton);

		inputText.value = "";
		inputText.focus();

		listItem.addEventListener("click", function (e) {
			console.log(this);
		});

		return listItem;
	}

	function renderTasks() {
		ul.innerHTML = "";
		taskList.forEach((task) => {
			ul.appendChild(genereteLiTask(task));
		});
	}

	todoAddForm.addEventListener("submit", function (e) {
		e.preventDefault();

		addTask(inputText.value);
		renderTasks();
	});
})();
