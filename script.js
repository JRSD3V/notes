const notes = document.querySelector(".notes");
const createNote = document.getElementById("createNote");
const clearNote = document.getElementById("clearNote");
const lightMode = document.querySelector(".lightMode");

createNote.addEventListener("click", ()=> {
    let newObj = {
        value: ""
    }
    newNote(newObj);
});

clearNote.addEventListener("click", ()=> {
    notes.innerHTML = '';
    updateLS();
})

function newNote(newObj) {
    let createdNote = document.createElement("div");
    createdNote.classList.add("note");
    if(!newObj.value) {
        createdNote.innerHTML = `<textarea name="noteContent" class="noteContent" placeholder="Type something...">${newObj.value}</textarea>
        <div class="noteAppend hidden">${newObj.value ? newObj.value : ""}</div>
        <div class="tools">
            <button class="saveEdit"><i class="fa-solid fa-floppy-disk"></i></button>
            <button class="trash"><i class="fa-solid fa-trash"></i></button>
        </div>`;
    } else {
        createdNote.innerHTML = `<textarea name="noteContent" class="noteContent hidden" placeholder="Type something...">${newObj.value}</textarea>
        <div class="noteAppend">${newObj.value ? newObj.value : ""}</div>
        <div class="tools">
            <button class="saveEdit"><i class="fa-solid fa-pencil"></i></button>
            <button class="trash"><i class="fa-solid fa-trash"></i></button>
        </div>`;
    }
    const noteText = createdNote.querySelector(".noteAppend");
    const noteContent = createdNote.querySelector(".noteContent");
    const saveEdit = createdNote.querySelector(".saveEdit");
    const trash = createdNote.querySelector(".trash");

    notes.appendChild(createdNote);
    updateLS();

    saveEdit.addEventListener("click", ()=> {
        noteText.innerText = noteContent.value;
        if(!noteContent.classList.contains("hidden")) {
            noteContent.classList.add("hidden");
            noteText.classList.remove("hidden");
        } else {
            noteContent.classList.remove("hidden");
            noteText.classList.add("hidden");
        }
        updateLS();
        if(noteContent.classList.contains("hidden")) {
            saveEdit.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        } else {
            saveEdit.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
        }
    });

    trash.addEventListener("click", ()=> {
        createdNote.remove();
        updateLS();
    })
}

lightMode.addEventListener("click", lightModeFunc);

function lightModeFunc() {
    document.body.classList.toggle("lightModeToggle");
    if(document.body.classList.contains("lightModeToggle")) {
        lightMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
        localStorage.setItem("lightMode", "1")
        console.log(localStorage);

    } else {
        lightMode.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem("lightMode", "0")
        console.log(localStorage);
    }
}

function updateLS() {
    const allNotes = document.querySelectorAll(".note");
    const arr = [];

    allNotes.forEach(note => {
        const noteSave = note.querySelector(".noteAppend");
        const noteArea = note.querySelector(".noteContent");
        let newObjLS = {
            value: noteArea.value
        }
        arr.push(newObjLS);
    })
    localStorage.setItem("notes", JSON.stringify(arr));
    console.log(localStorage);
}

function getNotes() {
    let note = JSON.parse(localStorage.getItem("notes")) || [];
    note.forEach(noteItem => {
        newNote(noteItem);
    })

    console.log(JSON.parse(localStorage.getItem("lightMode")))
    if(JSON.parse(localStorage.getItem("lightMode"))) {
        document.body.classList.add("lightModeToggle");
        lightMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
    } else {
        document.body.classList.remove("lightModeToggle");
        lightMode.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

getNotes();