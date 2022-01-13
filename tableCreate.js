export function tableCreate(notes, callButton = null) {
  let tbl = document.createElement("table");
  notes.map((note) => {
    let tr = tbl.insertRow();
    tr.setAttribute("id", `${note.id}`);
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
