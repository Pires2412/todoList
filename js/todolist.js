(function () {
	"use strict";

	const inputText = document.getElementById("item-input");
	const todoAddForm = document.getElementById("todo-add");
	const ul = document.getElementById("todo-list");
	const lis = document.getElementsByTagName("li");

	let taskList = [];

	function addTask(task) {
		taskList.push({
			name: task,
			createdAt: Date.now(),
			completed: false,
		});
	}

	function clickedUl(e) {
		console.log(e.target);
		console.log(e.target.getAttribute("data-action"));

		if (!e.target.getAttribute("data-action")) {
			console.log("clicou em nada");
			return;
		}

		let currentLi = e.target;
		while (currentLi.nodeName !== "LI") {
			currentLi = currentLi.parentElement;
		}
		console.log(currentLi);

		const currentLiIndex = [...lis].indexOf(currentLi);
		console.log(currentLiIndex);

		switch (e.target.getAttribute("data-action")) {
			case "check":
				taskList[currentLiIndex].completed =
					!taskList[currentLiIndex].completed;
				if (taskList[currentLiIndex].completed) {
					currentLi.querySelector(".fa-check").classList.remove("displayNone");
				} else {
					currentLi.querySelector(".fa-check").classList.add("displayNone");
				}
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
				taskList[currentLiIndex].name = val;
				renderTasks();

				break;

			case "containerCancelButton":
				const btnCancel = document.querySelector(".cancelButton");
				const containerEdit = document.querySelector(".editContainer");
				containerEdit.style.display = "none";
				break;

			case "deleteButton":
				taskList.splice(currentLiIndex, 1);
				renderTasks();
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
			'<i class="fas fa-check displayNone"  data-action="check"></i>';
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
		taskList.forEach((task) => {
			ul.appendChild(genereteLiTask(task));
		});
	}

	todoAddForm.addEventListener("submit", function (e) {
		e.preventDefault();
		if (!inputText.value) return;

		addTask(inputText.value);
		renderTasks();
	});

	ul.addEventListener("click", clickedUl);
})();
