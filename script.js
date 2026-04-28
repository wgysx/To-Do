const taskBtn = document.querySelector("#taskBtn")
const taskList = document.querySelector("#taskList")
const taskInput = document.querySelector("#taskInput")
const clearAllBtn = document.querySelector("#clearAllBtn")
const clearCompletedBtn = document.querySelector("#clearCompletedBtn")
const taskCounter = document.querySelector("#taskCounter")

function updateCounter(){
    const total = document.querySelectorAll("#taskList li").length;
    const completed = document.querySelectorAll(".completed").length;

    taskCounter.textContent = `${completed} de ${total} tarefas concluídas`;
}

function createSpan(taskInputValue){
    const span = document.createElement('span');
    span.textContent = taskInputValue;

    span.addEventListener("click", function(){
        span.classList.toggle('completed');
        updateCounter();
    })

    return span;
}

function createDeleteButton(li){
    const button = document.createElement('button');
    button.textContent = 'Excluir';

    button.addEventListener('click', function(){
        li.remove();
        updateCounter();
    })

    return button;
}

function createEditButton(span){
    const button = document.createElement('button');
    button.textContent = 'Editar';

    button.addEventListener('click', function(){
        const newTask = prompt("Editar tarefa:", span.textContent);
        if(newTask !== null && newTask !== ''){
            span.textContent = newTask;
        }
    })

    return button;
}

function addTask(){
    const li = document.createElement('li');
    const taskInputValue = taskInput.value.trim();

    if (taskInputValue === ''){
        return;
    }

    const span = createSpan(taskInputValue);
    const deleteBtn = createDeleteButton(li);
    const editBtn = createEditButton(span);

    li.appendChild(span)
    li.appendChild(editBtn)
    li.appendChild(deleteBtn)

    taskList.appendChild(li);

    // ✅ Limpar input
    taskInput.value = '';

    updateCounter();
}

// Clique no botão
taskBtn.addEventListener("click", addTask)

// ✅ Enter adiciona tarefa
taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
})

// ✅ Limpar todas
clearAllBtn.addEventListener("click", function(){
    taskList.innerHTML = '';
    updateCounter();
})

// ✅ Limpar apenas concluídas
clearCompletedBtn.addEventListener("click", function(){
    const completedTasks = document.querySelectorAll(".completed");

    completedTasks.forEach(task => {
        task.parentElement.remove();
    });

    updateCounter();
})