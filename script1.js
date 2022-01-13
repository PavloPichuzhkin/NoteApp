import { calcCategory } from "./calcCategory.js";
import { addDate } from "./parseDates.js";
import { tableCreate } from "./tableCreate.js";

export const categInp = document.querySelector("select");
export const contInp = document.querySelector("#contInp");
const btn = document.querySelector("#btn");
const out1 = document.querySelector("#out1");
const out2 = document.querySelector("#out-2");
const out3 = document.querySelector("#out3");
export let idCounter = 8;
export const select1 = document.querySelector(".s1").value;
export const select2 = document.querySelector(".s2").value;
export const select3 = document.querySelector(".s3").value;
// console.log(typeof select1);
// console.log(select1.value);

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
    {
      id: 3,
      created: "13.10.2021",
      category: "Idea",
      content: "Read Gary Potter Deathly Hallows",
    },
    {
      id: 4,
      created: "13.10.2021",
      category: "Random Thought",
      content: "To find new interesting film 14/01/2022",
    },
    {
      id: 5,
      created: "13.10.2021",
      category: "Task",
      content: "change tyres 15.10.2021",
    },
    {
      id: 6,
      created: "13.10.2021",
      category: "Idea",
      content: "maybe some sleep",
    },
    {
      id: 7,
      created: "13.10.2021",
      category: "Random Thought",
      content: "Take a walk in the park",
    },
  ],
  archivedNotes: [],
};

out1.append(tableCreate(addDate(noteApp.notes), addButton));
out2.append(tableCreate(calcCategory(noteApp)));
btn.addEventListener("click", () => {
  addNote(noteApp);
  updateTable(out1);
  updateTable(out2, tableCreate, calcCategory(noteApp), null);
});

function addNote(notes) {
  let newNote = {
    id: idCounter++,
    created: new Date().toLocaleDateString(),
    category: categInp.value,
    content: contInp.value,
  };
  return (noteApp = { ...notes, notes: [...notes.notes, newNote] });
}

export function removeNote(deleteNoteId) {
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
    created: new Date().toLocaleDateString(),
    category: categInp.value,
    content: contInp.value,
  };
  return (noteApp = {
    ...noteApp,
    notes: [
      ...noteApp.notes.map((note) => {
        if (note.id == editNoteId) {
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

function tableCreateCallback(tableName, callButton = addButton) {
  return tableCreate(addDate(tableName), callButton);
}

function updateTable(
  out,
  callTableCreate = tableCreateCallback,
  tableName = noteApp.notes,
  callButton = addButton
) {
  out.querySelectorAll("table")[1].remove();
  out.append(callTableCreate(tableName, callButton));
  calcCategory(noteApp);
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
    removeNote(deleteNoteId);
    updateTable(out1);
    updateTable(out2, tableCreate, calcCategory(noteApp), null);
  });
  btnEdit.addEventListener("click", function () {
    let editNoteId = +this.parentNode.parentNode.getAttribute("id");
    editNote(editNoteId);
    updateTable(out1);
    updateTable(out2, tableCreate, calcCategory(noteApp), null);
  });
  btnArchive.addEventListener("click", function () {
    let archiveNoteId = +this.parentNode.parentNode.getAttribute("id");

    archiveNote(archiveNoteId);
    updateTable(out1);
    updateTable(
      out3,
      tableCreateCallback,
      noteApp.archivedNotes,
      addButtonForArchive
    );
    updateTable(out2, tableCreate, calcCategory(noteApp), null);
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
    updateTable(
      out3,
      tableCreateCallback,
      noteApp.archivedNotes,
      addButtonForArchive
    );
    updateTable(out2, tableCreate, calcCategory(noteApp), null);
  });
  btnUnzip.addEventListener("click", function () {
    let archiveNoteId = +this.parentNode.parentNode.getAttribute("id");

    unzipNote(archiveNoteId);
    updateTable(out1);
    updateTable(
      out3,
      tableCreateCallback,
      noteApp.archivedNotes,
      addButtonForArchive
    );
    updateTable(out2, tableCreate, calcCategory(noteApp), null);
  });
}
