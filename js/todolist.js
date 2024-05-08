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

		paragraph.textContent = obj.name;

		listItem.appendChild(paragraph);

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
