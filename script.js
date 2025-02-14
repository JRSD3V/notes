const notes = document.querySelector(".notes");
const createNote = document.getElementById("createNote");
const clearNote = document.getElementById("clearNote");
const lightMode = document.querySelector(".lightMode");

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});


createNote.addEventListener("click", ()=> {
    let newObj = {
        value: ""
    }
    newNote(newObj);
});

clearNote.addEventListener("click", ()=> {
    notes.classList.add("noteDeleted");
    setTimeout(()=> {
        notes.innerHTML = '';
        notes.classList.remove("noteDeleted");
        updateLS();
    }, 300)
});

lightMode.addEventListener("click", lightModeFunc);

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
    createdNote.classList.add("noteCreated");
    setTimeout(() => {
        createdNote.classList.remove("noteCreated");
    }, 350);
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
        createdNote.classList.add("noteDeleted");
        setTimeout(()=> {
            createdNote.remove();
            updateLS();
        }, 300)
    })
}

function lightModeFunc() {
    document.body.classList.toggle("lightModeToggle");
    if(document.body.classList.contains("lightModeToggle")) {
        lightMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
        localStorage.setItem("lightMode", "1")

    } else {
        lightMode.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem("lightMode", "0")
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
}

function getNotes() {
    let note = JSON.parse(localStorage.getItem("notes")) || [];
    note.forEach(noteItem => {
        newNote(noteItem);
    })

    if(JSON.parse(localStorage.getItem("lightMode"))) {
        document.body.classList.add("lightModeToggle");
        lightMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
    } else {
        document.body.classList.remove("lightModeToggle");
        lightMode.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

getNotes();