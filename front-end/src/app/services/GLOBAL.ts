let today = new Date();
let day : any = today.getDay();
let month: any = today.getMonth()+1;
let year = today.getFullYear();

if (day < 10) {
  day = '0' + day;
}
if (month < 10) {
  month = '0' + month;
}

let dates = year + '-' + month + '-' + day;

export const GLOBAL = {
  url: 'http://localhost:3001/api/',
  dates : dates
};


// http://127.0.0.1:3000/api/
