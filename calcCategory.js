import { select1, select2, select3 } from "./script1.js";

export function calcCategory(notes) {
  let [taskCount, taskActiveCount, taskArchivedCount] = [0, 0, 0];
  let [ideaCount, ideaActiveCount, ideaArchivedCount] = [0, 0, 0];
  let [
    randomThoughtCount,
    randomThoughtActiveCount,
    randomThoughtArchivedCount,
  ] = [0, 0, 0];
  for (let i = 0; i < notes.archivedNotes.length; i++) {
    if (notes.archivedNotes[i].category === select1) {
      taskArchivedCount++;
    }
    if (notes.archivedNotes[i].category === select2) {
      ideaArchivedCount++;
    }
    if (notes.archivedNotes[i].category === select3) {
      randomThoughtArchivedCount++;
    }
  }
  for (let i = 0; i < notes.notes.length; i++) {
    if (notes.notes[i].category === select1) {
      taskActiveCount++;
    }
    if (notes.notes[i].category === select2) {
      ideaActiveCount++;
    }
    if (notes.notes[i].category === select3) {
      randomThoughtActiveCount++;
    }
  }
  taskCount = taskActiveCount + taskArchivedCount;
  ideaCount = ideaActiveCount + ideaArchivedCount;
  randomThoughtCount = randomThoughtActiveCount + randomThoughtArchivedCount;
  return [
    {
      id: 1,
      category: select1,
      total: taskCount,
      active: taskActiveCount,
      archived: taskArchivedCount,
    },
    {
      id: 2,
      category: select2,
      total: ideaCount,
      active: ideaActiveCount,
      archived: ideaArchivedCount,
    },
    {
      id: 3,
      category: select3,
      total: randomThoughtCount,
      active: randomThoughtActiveCount,
      archived: randomThoughtArchivedCount,
    },
  ];
}
