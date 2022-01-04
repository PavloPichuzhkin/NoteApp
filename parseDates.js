// export const parseDates = (string) => {
export function parseDates(string) {
  let myRegExp = /\d{2}[-.\/]\d{2}(?:[-.\/]\d{2}(\d{2})?)?/g; //Check pattern only
  let validDate =
    /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])?|(?:(?:16|[2468][048]|[3579][26])00)?)))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))(\4)?(?:(?:1[6-9]|[2-9]\d)?\d{2})?$/g; //Check the validity of the date

  const stringToArray = string.split(" ");
  let datesArray = [];
  let myDate = [];
  for (let i = 0; i < stringToArray.length; i++) {
    myDate[i] = myRegExp.exec(stringToArray[i]);
    // console.log(myDate);
    myRegExp.exec(stringToArray[i]);
    // console.log(myRegExp.exec(stringToArray[i]));
    if (
      myDate[i] !==
      // && validDate.exec(stringToArray[i])
      null
    ) {
      //   console.log(myRegExp.exec(stringToArray[i]));
      datesArray.push(stringToArray[i]);
    }
  }
  return datesArray;
}

export function addDate(notesArray) {
  return notesArray.map((obj) => {
    return { ...obj, date: parseDates(obj.content).join(" ") };
  });
}
