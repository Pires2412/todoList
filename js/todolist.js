(function () {
	"use strict";

	const inputText = document.getElementById("item-input");
	const todoAddForm = document.getElementById("todo-add");
	const ul = document.getElementById("todo-list");
	const lis = document.getElementsByTagName("li");

	let taskList = getSavedData();

	let taskListMaped = taskList.map((element) => {
		element = new Task(element.name);
		return element;
	});

	function getSavedData() {
		let taskData = localStorage.getItem("task");
		taskData = JSON.parse(taskData);

		return taskData && taskData.length ? taskData : [];
	}

	function setNewData() {
		localStorage.setItem("task", JSON.stringify(taskListMaped));
	}

	setNewData();

	function Task(name, completed, createdAt, updatedAt) {
		this.name = name;
		this.completed = completed || false;
		this.createdAt = createdAt || Date.now();
		this.updatedAt = updatedAt || null;
		this.update = update;
		this.toggleDone = toggleDone;

		function update() {
			this.updatedAt = Date.now();
			setNewData();
		}

		function toggleDone() {
			if (this.completed === true) {
				this.completed = false;
			} else {
				this.completed = true;
			}
		}

		return this;
	}
	/*
	function addTask(task) {
		taskList.push({
			name: task,
			createdAt: Date.now(),
			completed: false,
		});

		setNewData();
	}
	*/

	function clickedUl(e) {
		let currentLi = e.target;
		while (currentLi.nodeName !== "LI") {
			currentLi = currentLi.parentElement;
		}

		const currentLiIndex = [...lis].indexOf(currentLi);

		switch (e.target.getAttribute("data-action")) {
			case "check":
				taskListMaped[currentLiIndex].toggleDone();
				if (taskListMaped[currentLiIndex].completed === true) {
					currentLi.querySelector(".fa-check").classList.remove("displayNone");
				} else {
					currentLi.querySelector(".fa-check").classList.add("displayNone");
				}

				setNewData();
				break;

			case "editButton":
				const editContainer = currentLi.querySelector(".editContainer");

				[...ul.querySelectorAll(".editContainer")].forEach((element) => {
					element.removeAttribute("style");
				});

				editContainer.style.display = "flex";
				const edit = document.querySelector(".editInput");
				edit.value = taskList[currentLiIndex].name;
				break;

			case "containerEditButton":
				const val = currentLi.querySelector(".editInput").value;
				taskListMaped[currentLiIndex].name = val;
				taskListMaped[currentLiIndex].update();
				renderTasks();
				setNewData();

				break;

			case "containerCancelButton":
				const btnCancel = document.querySelector(".cancelButton");
				const containerEdit = document.querySelector(".editContainer");
				containerEdit.style.display = "none";
				break;

			case "deleteButton":
				taskListMaped.splice(currentLiIndex, 1);
				renderTasks();
				setNewData();
				break;

			default:
				return;
		}
	}

	function genereteLiTask(obj) {
		const listItem = document.createElement("li");
		listItem.classList.add("todo-item");

		const checkButton = document.createElement("button");
		checkButton.setAttribute("data-action", "check");
		checkButton.className = "button-check";
		checkButton.innerHTML =
			'<i class="fas fa-check displayNone" data-action="check"></i>';
		listItem.appendChild(checkButton);

		const paragraph = document.createElement("p");
		paragraph.classList.add("task-name");
		paragraph.textContent = obj.name;
		listItem.appendChild(paragraph);

		const editButton = document.createElement("i");
		editButton.setAttribute("data-action", "editButton");
		editButton.className = "fas fa-edit";
		listItem.appendChild(editButton);

		const containerEdit = document.createElement("div");
		containerEdit.className = "editContainer";
		const inputEdit = document.createElement("input");
		inputEdit.setAttribute("type", "text");
		inputEdit.className = "editInput";
		containerEdit.appendChild(inputEdit);

		const containerEditButton = document.createElement("button");
		containerEditButton.setAttribute("data-action", "containerEditButton");
		containerEditButton.className = "editButton";
		containerEditButton.textContent = "edit";
		containerEdit.appendChild(containerEditButton);
		const containerCancelButton = document.createElement("button");
		containerCancelButton.setAttribute("data-action", "containerCancelButton");
		containerCancelButton.className = "cancelButton";
		containerCancelButton.textContent = "cancel";
		containerEdit.appendChild(containerCancelButton);

		listItem.appendChild(containerEdit);

		const deleteButton = document.createElement("i");
		deleteButton.setAttribute("data-action", "deleteButton");
		deleteButton.classList.add("fas", "fa-trash-alt");
		listItem.appendChild(deleteButton);

		inputText.value = "";
		inputText.focus();

		return listItem;
	}

	function renderTasks() {
		ul.innerHTML = "";
		taskListMaped.forEach((task) => {
			ul.appendChild(genereteLiTask(task));
		});
	}

	todoAddForm.addEventListener("submit", function (e) {
		e.preventDefault();
		if (!inputText.value) return;

		let task = new Task(inputText.value);
		taskListMaped.push(task);
		renderTasks();
		setNewData();
	});

	ul.addEventListener("click", clickedUl);
	renderTasks();

	console.log(taskList);
})();
