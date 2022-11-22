function onOpen() {
  SpreadsheetApp.getUi().createMenu("Script")
    .addItem("画像", "image")
    .addToUi();
}
function image(){
  let namedRanges = SpreadsheetApp.getActiveSpreadsheet().getNamedRanges();
  SpreadsheetApp.getUi().showSidebar(Object.assign(
    HtmlService.createTemplateFromFile("image.html"),{
      data: JSON.stringify({
      }),
      nameList: namedRanges.map(range => range.getName())
    }
  ).evaluate().setTitle("画像"));
}
function setImage(data, type){
  let range = SpreadsheetApp.getActiveSheet().getActiveRange();
  if(type == 1){
    range.offset(0, 0, 1, 1).setValue(
      SpreadsheetApp.newCellImage().setSourceUrl(data).build()
    );
  }else if(type == 2){
    SpreadsheetApp.getActiveSheet().insertImage(data, range.getColumn(), range.getRow());
  }
}
function importData(name){
  let range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(name);
  return JSON.stringify(range.getValues());
}
function cellSize(){
  let sheet = SpreadsheetApp.getActiveSheet();
  let range = sheet.getActiveRange();
  let width = sheet.getColumnWidth(range.getColumn());
  let height = sheet.getRowHeight(range.getRow()) - 1;
  return `${width},${height}`;
}