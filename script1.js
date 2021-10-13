const categInp = document.querySelector("select");
const contInp = document.querySelector("#contInp");
const dateInp = document.querySelector("#dateInp");
const btn = document.querySelector("#btn");

let note1 = ["13.10.2021", categInp.value, "Buy tomatoes, bread", "14.10.2021"];
let note2 = ["13.10.2021", categInp.value, "Travel to Egypt", "30.10.2021"];

let note = {
  note1: ["13.10.2021", categInp.value, "Buy tomatoes, bread", "14.10.2021"],
  note2: ["13.10.2021", categInp.value, "Travel to Egypt", "30.10.2021"],
};
let tSumm = 0;
let tAct = 0;
let tArch = 0;
let iSumm = 0;
let iAct = 0;
let iArch = 0;
let rSumm = 0;
let rAct = 0;
let rArch = 0;
let s1 = document.querySelector(".s1");
let s2 = document.querySelector(".s2");
let s3 = document.querySelector(".s3");
// let task = [s1.value, tSumm, tAct, (tSumm - tAct)];
// let idea = [s2.value, iSumm, iAct, (iSumm - iAct)];
// let randomThought = [s3.value, rSumm, rAct, (rSumm - rAct)];

let out1 = document.querySelector("#out1");
let out2 = document.querySelector("#out2");
let out3 = document.querySelector("#out3");
// let a = 3;
// console.log(a+++3);
// console.log(a);

function tableCreate(not) {
  if (categInp.value == "Task") {
    tSumm++;
    tAct++;
    console.log(tSumm + "   Act " + tAct);
  }
  if (categInp.value == "Idea") {
    iSumm++;
    iAct++;
    console.log(iSumm + "   Act " + iAct);
  }
  if (categInp.value == "Random Thought") {
    rSumm++;
    rAct++;
    console.log(rSumm + "   Act " + rAct);
  }
  let tbl = document.createElement("table");
  let tr = tbl.insertRow();
  for (let j = 0; j < note.note1.length; j++) {
    td = tr.insertCell(); // где инициализируется td???????
    td.innerHTML = not[j];
    td.style.width = "220px";
    td.style.border = "1px solid black";
    td.setAttribute("id", `td${j}`);
  }
  td = tr.insertCell();
  addButt();
  out1.append(tbl);

  tableSummary();
}
tableCreate(note1);
tableCreate(note2);

function tableSummary() {
  out2.innerHTML = "";
  task = [s1.value, tSumm, tAct, tSumm - tAct]; //как проинициализировался????
  let idea = [s2.value, iSumm, iAct, iSumm - iAct];
  let randomThought = [s3.value, rSumm, rAct, rSumm - rAct];
  let tbl = document.createElement("table");
  // let tr = tbl.insertRow();
  function createSummary(arr) {
    tr = tbl.insertRow();
    for (let j = 0; j < arr.length; j++) {
      td = tr.insertCell();
      td.innerHTML = arr[j];
      td.style.width = "230px";
      td.style.border = "1px solid black";
    }
  }
  createSummary(task);
  createSummary(idea);
  createSummary(randomThought);
  out2.appendChild(tbl);
  // console.log(out2.children);
}

btn.addEventListener("click", () => {
  tableCreate(noteAddArr());
});

function noteAddArr() {
  let noteAdd = [new Date()];
  noteAdd.push(...[categInp.value, contInp.value, dateInp.value]);
  return noteAdd;
}

function addButt() {
  const btn2 = document.createElement("button");
  btn2.textContent = "Del";
  td.append(btn2);

  btn2.addEventListener("click", function () {
    let tr = this.parentNode.parentNode;
    let tdCateg = tr.querySelector("#td1");
    tr.remove();
    if (tdCateg.textContent == "Task") {
      tSumm--;
      if (btn5.style.display == "none") {
        tAct--;
      }
      console.log(tSumm + "   Act " + tAct);
    }
    if (tdCateg.textContent == "Idea") {
      iSumm--;
      if (btn5.style.display == "none") {
        iAct--;
      }
      console.log(iSumm + "   Act " + iAct);
    }
    if (tdCateg.textContent == "Random Thought") {
      rSumm--;
      if (btn5.style.display == "none") {
        rAct--;
      }
      console.log(rSumm + "   Act " + rAct);
    }
    tableSummary();
  });
  const btn3 = document.createElement("button");
  btn3.textContent = "Edit ";
  td.appendChild(btn3);
  btn3.addEventListener("click", function () {
    let tr = this.parentNode.parentNode;
    let tdCateg = tr.querySelector("#td1");
    tr = this.parentNode.parentNode.parentElement.insertRow();

    console.log(task);
    this.parentNode.parentNode.remove();

    for (let j = 0; j < note1.length; j++) {
      td = tr.insertCell();
      td.innerHTML = noteAddArr()[j];
      td.style.width = "230px";
      td.style.border = "1px solid black";
      td.setAttribute("id", `td${j}`);
    }
    td = tr.insertCell();
    addButt();
    if (tdCateg.textContent == categInp.value) return;
    if (tdCateg.textContent == "Task" && categInp.value == "Idea") {
      tSumm--;
      tAct--;
      iSumm++;
      iAct++;
      console.log(iSumm + "   Act " + iAct);
    }
    if (tdCateg.textContent == "Task" && categInp.value == "Random Thought") {
      tSumm--;
      tAct--;
      rSumm++;
      rAct++;
      console.log(rSumm + "   Act " + rAct);
    }
    if (tdCateg.textContent == "Idea" && categInp.value == "Task") {
      iSumm--;
      iAct--;
      tSumm++;
      tAct++;
      console.log(tSumm + "   Act " + rAct);
    }
    if (tdCateg.textContent == "Idea" && categInp.value == "Random Thought") {
      iSumm--;
      iAct--;
      rSumm++;
      rAct++;
      console.log(rSumm + "   Act " + rAct);
    }
    if (tdCateg.textContent == "Random Thought" && categInp.value == "Task") {
      rSumm--;
      rAct--;
      tSumm++;
      tAct++;
      console.log(tSumm + "   Act " + tAct);
    }
    if (tdCateg.textContent == "Random Thought" && categInp.value == "Idea") {
      rSumm--;
      rAct--;
      iSumm++;
      iAct++;
      console.log(iSumm + "   Act " + iAct);
    }
    tableSummary();
  });

  const btn4 = document.createElement("button");
  btn4.textContent = "Archive";
  td.appendChild(btn4);

  btn4.addEventListener("click", function () {
    let tr = this.parentNode.parentNode;
    let tdCateg = tr.querySelector("#td1");
    let tbl = this.parentElement.parentElement.parentNode.parentNode;
    out3.append(tbl);
    btn5.style.display = "inline";
    btn4.style.display = "none";
    btn3.style.display = "none";
    if (tdCateg.textContent == "Task") {
      tAct--;
      console.log(tSumm + "   Act " + tAct);
    }
    if (tdCateg.textContent == "Idea") {
      iAct--;
      console.log(iSumm + "   Act " + iAct);
    }
    if (tdCateg.textContent == "Random Thought") {
      rAct--;
      console.log(rSumm + "   Act " + rAct);
    }
    tableSummary();
  });
  const btn5 = document.createElement("button");
  btn5.textContent = "Unzip";
  btn5.style.display = "none";
  td.appendChild(btn5);

  btn5.addEventListener("click", function () {
    let tr = this.parentNode.parentNode;
    let tdCateg = tr.querySelector("#td1");
    let tbl = this.parentElement.parentElement.parentNode.parentNode;
    out1.append(tbl);
    btn4.style.display = "inline";
    btn5.style.display = "none";
    btn3.style.display = "inline";
    if (tdCateg.textContent == "Task") {
      tAct++;
      console.log(tSumm + "   Act " + tAct);
    }
    if (tdCateg.textContent == "Idea") {
      iAct++;
      console.log(iSumm + "   Act " + iAct);
    }
    if (tdCateg.textContent == "Random Thought") {
      rAct++;
      console.log(rSumm + "   Act " + rAct);
    }
    tableSummary();
  });
}
