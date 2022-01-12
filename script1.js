import { parseDates, addDate } from "./parseDates.js";

export const categInp = document.querySelector("select");
export const contInp = document.querySelector("#contInp");
const btn = document.querySelector("#btn");
const out1 = document.querySelector("#out1");
const out2 = document.querySelector("#out-2");
const out3 = document.querySelector("#out3");
export let idCounter = 8;

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
    created: new Date().toLocaleDateString(),
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

function tableCreate(notes, callButton = null) {
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
    if (callButton) {
      callButton(tr);
    }
  });
  return tbl;
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
    // removeNote(deleteNoteId, noteApp["notes"]);
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
    // console.log(noteApp);
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

function calcCategory(notes) {
  let [taskCount, taskActiveCount, taskArchivedCount] = [0, 0, 0];
  let [ideaCount, ideaActiveCount, ideaArchivedCount] = [0, 0, 0];
  let [
    randomThoughtCount,
    randomThoughtActiveCount,
    randomThoughtArchivedCount,
  ] = [0, 0, 0];
  for (let i = 0; i < notes.archivedNotes.length; i++) {
    if (notes.archivedNotes[i].category === "Task") {
      taskArchivedCount++;
    }
    if (notes.archivedNotes[i].category === "Idea") {
      ideaArchivedCount++;
    }
    if (notes.archivedNotes[i].category === "Random Thought") {
      randomThoughtArchivedCount++;
    }
  }
  for (let i = 0; i < notes.notes.length; i++) {
    if (notes.notes[i].category === "Task") {
      taskActiveCount++;
    }
    if (notes.notes[i].category === "Idea") {
      ideaActiveCount++;
    }
    if (notes.notes[i].category === "Random Thought") {
      randomThoughtActiveCount++;
    }
  }
  taskCount = taskActiveCount + taskArchivedCount;
  ideaCount = ideaActiveCount + ideaArchivedCount;
  randomThoughtCount = randomThoughtActiveCount + randomThoughtArchivedCount;
  // console.log(
  //   `taskActive-${taskActiveCount}   ideaActive-${ideaActiveCount}    randomThoughtActive-${randomThoughtActiveCount}`
  // );
  // console.log(
  //   `taskArchived-${taskArchivedCount}   ideaAArchived-${ideaArchivedCount}    randomThoughtArchived-${randomThoughtArchivedCount}`
  // );
  // console.log(
  //   `task-${taskCount}       idea-${ideaCount}          randomThought-${randomThoughtCount}`
  // );
  // console.log("--------------------------------");
  return [
    {
      id: 1,
      category: "Task",
      total: taskCount,
      active: taskActiveCount,
      archived: taskArchivedCount,
    },
    {
      id: 2,
      category: "Idea",
      total: ideaCount,
      active: ideaActiveCount,
      archived: ideaArchivedCount,
    },
    {
      id: 3,
      category: "Random Thought",
      total: randomThoughtCount,
      active: randomThoughtActiveCount,
      archived: randomThoughtArchivedCount,
    },
  ];
}
// console.log(calcCategory(noteApp));
