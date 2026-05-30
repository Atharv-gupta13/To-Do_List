document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('inp');
    const addTaskBtn = document.getElementById('btn');
    const taskList = document.getElementById('to-doList');

    let editingItem = null; // currently editing li (null means "add mode")

    const addTask = (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (!taskText) return;

        // --- EDIT MODE: sirf span update karo, nayi li mat banao ---
        if (editingItem) {
            editingItem.querySelector('span').textContent = taskText;
            editingItem = null;
            addTaskBtn.textContent = 'Add';
            taskInput.value = '';
            taskInput.focus();
            return;
        }

        // --- ADD MODE: nayi task banao ---
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn  = li.querySelector('.edit-btn');

        // Checkbox: task complete karo aur edit disable karo
        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
        });

        // Edit button: text input mein daalo, button "Update" ho jaaye
        editBtn.addEventListener('click', () => {
            if (checkbox.checked) return;
            taskInput.value = li.querySelector('span').textContent;
            editingItem = li;               // yaad rakho kaun edit ho raha hai
            addTaskBtn.textContent = 'Update';
            taskInput.focus();
        });

        // Delete button
        li.querySelector('.delete-btn').addEventListener('click', () => {
            // Agar yahi item edit ho rahi thi toh edit mode cancel karo
            if (editingItem === li) {
                editingItem = null;
                addTaskBtn.textContent = 'Add';
                taskInput.value = '';
            }
            li.remove();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        taskInput.focus();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(e);
    });
});