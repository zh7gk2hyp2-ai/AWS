/* ============================================================
   كود Google Apps Script لمربط الواصلية
   انسخ هذا الكود كاملاً والصقه في محرر Apps Script
   (راجع ملف دليل-الإعداد.md للخطوات بالصور)
   ============================================================ */

const SHEET_NAME = 'الحجوزات';

// ترتيب الأعمدة في الجدول
const COLS = [
  'ref','name','phone','arrive','category','horseName','horseGender',
  'horseAge','horseBreed','horseCount','duration','payment','notes',
  'items','total','status','createdAt'
];

function getSheet_(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if(!sh){
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(COLS);
  }
  if(sh.getLastRow() === 0) sh.appendRow(COLS);
  return sh;
}

// قراءة كل الحجوزات (GET)
function doGet(e){
  const sh = getSheet_();
  const values = sh.getDataRange().getValues();
  const header = values.shift() || [];
  const rows = values.map(r => {
    const o = {};
    header.forEach((h, i) => o[h] = r[i]);
    return o;
  });
  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}

// إضافة / تحديث / حذف (POST)
function doPost(e){
  const sh = getSheet_();
  const data = JSON.parse(e.postData.contents);

  if(data.action === 'add'){
    const b = data.booking || {};
    sh.appendRow(COLS.map(c => b[c] !== undefined ? b[c] : ''));
  }

  else if(data.action === 'status'){
    const refCol = COLS.indexOf('ref') + 1;
    const statusCol = COLS.indexOf('status') + 1;
    const refs = sh.getRange(2, refCol, Math.max(sh.getLastRow()-1,1), 1).getValues();
    for(let i=0;i<refs.length;i++){
      if(refs[i][0] === data.ref){
        sh.getRange(i+2, statusCol).setValue(data.status);
        break;
      }
    }
  }

  else if(data.action === 'delete'){
    const refCol = COLS.indexOf('ref') + 1;
    const refs = sh.getRange(2, refCol, Math.max(sh.getLastRow()-1,1), 1).getValues();
    for(let i=0;i<refs.length;i++){
      if(refs[i][0] === data.ref){
        sh.deleteRow(i+2);
        break;
      }
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok:true }))
    .setMimeType(ContentService.MimeType.JSON);
}
