import { parseDates, addDate } from "./parseDates.js";

export const categInp = document.querySelector("select");
export const contInp = document.querySelector("#contInp");
const btn = document.querySelector("#btn");
const out1 = document.querySelector("#out1");
const out2 = document.querySelector("#out2");
const out3 = document.querySelector("#out3");
export let idCounter = 3;

export let noteApp = {
  notes: [
    {
      id: 1,
      created: "30.12.2021",
      category: categInp.value,
      content: "Buy tomatoes, bread 30.12.2021 and 31/12/2021",
    },
    {
      id: 2,
      created: "30.12.2021",
      category: categInp.value,
      content: "Travel to Egypt 05.01.2022",
    },
  ],
  archivedNotes: [],
};

out1.append(tableCreate(addDate(noteApp.notes), addButton));

btn.addEventListener("click", () => {
  addNote(noteApp);
  updateTable(out1);
});

function addNote(notes) {
  let newNote = {
    id: idCounter++,
    created: new Date(),
    category: categInp.value,
    content: contInp.value,
  };
  return (noteApp = { ...notes, notes: [...notes.notes, newNote] });
}

function removeNote(deleteNoteId) {
  noteApp = {
    ...noteApp,
    notes: [...noteApp.notes.filter((note) => note.id !== deleteNoteId)],
  };
  return noteApp;
}

function removeNoteFromArchive(deleteNoteId) {
  noteApp = {
    ...noteApp,
    archivedNotes: [
      ...noteApp.archivedNotes.filter((note) => note.id !== deleteNoteId),
    ],
  };
  return noteApp;
}

function editNote(editNoteId) {
  let editNote = {
    created: new Date(),
    category: categInp.value,
    content: contInp.value,
  };
  return (noteApp = {
    ...noteApp,
    notes: [
      ...noteApp.notes.map((note) => {
        if (note.id == editNoteId) {
          // console.log(note);
          return { ...note, ...editNote };
        } else return note;
      }),
    ],
  });
}

function archiveNote(archiveNoteId) {
  noteApp = {
    ...noteApp,
    archivedNotes: [
      ...noteApp.archivedNotes,
      ...noteApp.notes.filter((note) => note.id == archiveNoteId),
    ],
  };
  removeNote(archiveNoteId);
  return noteApp;
}

function unzipNote(archiveNoteId) {
  noteApp = {
    ...noteApp,
    notes: [
      ...noteApp.notes,
      ...noteApp.archivedNotes.filter((note) => note.id == archiveNoteId),
    ],
  };
  removeNoteFromArchive(archiveNoteId);
  return noteApp;
}

function tableCreate(notes, callButton) {
  let tbl = document.createElement("table");
  notes.map((note) => {
    let tr = tbl.insertRow();
    tr.setAttribute("id", `${note.id}`);
    // tr.setAttribute("name", `${note.id}`);
    for (let key in note) {
      if (key !== "id") {
        let td = tr.insertCell();
        td.innerHTML = note[key];
        td.style.width = "230px";
        td.style.border = "1px solid black";
        td.setAttribute("id", `td${key}`);
      }
    }
    callButton(tr);
  });
  return tbl;
}
function updateTable(out, tableName = noteApp.notes, callButton = addButton) {
  out.querySelectorAll("table")[1].remove();
  out.append(tableCreate(addDate(tableName), callButton));
}

function addButton(tr) {
  const btnDel = document.createElement("button");
  const btnEdit = document.createElement("button");
  const btnArchive = document.createElement("button");
  btnDel.textContent = "Delete";
  btnEdit.textContent = "Edit";
  btnArchive.textContent = "Archive";

  let td = tr.insertCell();
  td.appendChild(btnDel);
  td.appendChild(btnEdit);
  td.appendChild(btnArchive);

  btnDel.addEventListener("click", function () {
    let deleteNoteId = +this.parentNode.parentNode.getAttribute("id");
    // removeNote(deleteNoteId, noteApp["notes"]);
    removeNote(deleteNoteId);
    updateTable(out1);
    // console.log(noteApp);
    // console.log(noteApp["notes"]);
  });
  btnEdit.addEventListener("click", function () {
    let editNoteId = +this.parentNode.parentNode.getAttribute("id");
    editNote(editNoteId);
    updateTable(out1);
    // console.log(noteApp);
  });
  btnArchive.addEventListener("click", function () {
    let archiveNoteId = +this.parentNode.parentNode.getAttribute("id");

    archiveNote(archiveNoteId);
    updateTable(out1);

    updateTable(out3, noteApp.archivedNotes, addButtonForArchive);
  });
}

function addButtonForArchive(tr) {
  const btnDel = document.createElement("button");
  const btnUnzip = document.createElement("button");
  btnDel.textContent = "Delete";
  btnUnzip.textContent = "Unzip";

  let td = tr.insertCell();
  td.appendChild(btnDel);
  td.appendChild(btnUnzip);

  btnDel.addEventListener("click", function () {
    let deleteNoteId = +this.parentNode.parentNode.getAttribute("id");
    removeNoteFromArchive(deleteNoteId);
    updateTable(out3, noteApp.archivedNotes, addButtonForArchive);
    // console.log(noteApp);
  });
  btnUnzip.addEventListener("click", function () {
    let archiveNoteId = +this.parentNode.parentNode.getAttribute("id");

    unzipNote(archiveNoteId);
    updateTable(out1);
    updateTable(out3, noteApp.archivedNotes, addButtonForArchive);
  });
}
