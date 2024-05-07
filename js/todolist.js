(function () {
	"use strict";

	const inputText = document.getElementById("item-input");
	const inputButton = document.getElementById("add-item");
	const todoAddForm = document.getElementById("todo-add");
	const ul = document.getElementById("todo-list");
	const lis = ul.getElementsByTagName("li");

	function addTask(li) {
		li.addEventListener("click", function () {
			console.log(this);
		});
	}

	function addtask(task) {
		const listItem = document.createElement("li");
		listItem.classList.add("todo-item");

		const paragraph = document.createElement("p");
		paragraph.classList.add("task-name");

		paragraph.textContent = task;

		listItem.appendChild(paragraph);
		ul.appendChild(listItem);

		inputText.value = "";
		inputText.focus();

		listItem.addEventListener("click", function (e) {
			console.log(this);
		});
	}

	todoAddForm.addEventListener("submit", function (e) {
		e.preventDefault();

		addtask(inputText.value);
	});
	[...lis].forEach((li) => {
		addTask(li);
	});
})();
