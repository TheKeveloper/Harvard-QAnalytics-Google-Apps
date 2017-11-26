function setupMain(){
  //Done: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
}

function addCourses(nsheet){
  var srcDocUrl = "https://docs.google.com/spreadsheets/d/1Dxpt_GEnandi16k15hHculhY2bjYRFpL_GdJpeGeVD0/edit#gid=1073495431";
  var outDocUrl = "https://docs.google.com/spreadsheets/d/11tRpkgU0JoV_qTa_KsI8yEO6aLz8KY9wtGmIQXkdaXs/edit#gid=0";
  var srcSheets = SpreadsheetApp.openByUrl(srcDocUrl).getSheets();
  var curSheet = SpreadsheetApp.openByUrl(outDocUrl).getSheets()[0];
  var curValues = curSheet.getRange("A:C").getValues();
  var curCodes = copyColumn(curValues, 0);
  
  //Loops through the sheets, each corresponding to a semester
  var sheet = srcSheets[nsheet];
  Logger.log("Starting sheet: " + nsheet);
  console.log("Starting sheet: " + nsheet);
  //Get codes and names
  var values = sheet.getRange("A:B").getValues();
  //Loop through all of the codes and names
  for(var i = 1; i < values.length; i++){
    //If exists in current list
    var index = curCodes.indexOf(values[i][0]);
    if(i % 100 == 0){
        console.log("Finished " + i.toString() + " of " + values.length + " in " + sheet.getName());
        Logger.log("Finished " + i.toString() + " of " + values.length + " in " + sheet.getName());
    }
    if(index < 0){
      //Format as object
      var course_info = sheet.getName().toString() + "-" + i.toString() + ";";
      curCodes.push(values[i][0]);
      //Add to curValues array
      curValues.push([values[i][0], values[i][1], course_info]);
      //Add to the actual sheet
      curSheet.appendRow([values[i][0], values[i][1], course_info]);
      //Logger.log("Added: " + course_info);
    }
    else{
      //Get existing json array and check if already contains semester
      //Logger.log("curValues " + index + ": " + curValues[index][2]);
      if(curValues[index][2].indexOf(sheet.getName()) < 0){
        curValues[index][2] = curValues[index][2].concat(sheet.getName().toString() + "-" + i.toString() + ";");
        var cell = curSheet.getRange("A:C").getCell(index + 1, 3);
        cell.setValue(curValues[index][2]);
      }
    }
    SpreadsheetApp.flush();
  }
  Logger.log("Finished sheet " + nsheet.toString());
  console.log("Finshed sheet " + nsheet.toString());
  SpreadsheetApp.flush();
}

//Creates an array with the given column number in values
function copyColumn(values, col){
  var arr = [];
  for(var i = 0; i < values.length; i++){
    arr.push(values[i][col]);
  } 
  return arr;
}