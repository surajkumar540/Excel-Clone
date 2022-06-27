let cellsContentDiv = document.querySelector(".cells-content");


function initCells(){
    let cellsContent = "<div class='top-left-cell'></div>";
    //top-row
    cellsContent+="<div class='top-row'>"
    for(let i=0;i<26;i++){
        cellsContent+=`<div class='top-row-cell' trid='${i}'>${String.fromCharCode(65+i)}</div>`;
    }
    cellsContent+="</div>"

    //left-col
    cellsContent+="<div class='left-col'>"
    for(let i=0;i<100;i++){
        cellsContent+=`<div class='left-col-cell' lcid='${i}'>${i+1}</div>`
    }
    cellsContent+="</div>"
    cellsContent+="<div class='cells'>"
    for(let i=0;i<100;i++){
        cellsContent+="<div class = 'row'>";
        //column
        for(let j=0;j<26;j++){
                                                      //0          //0           
            cellsContent+=`<div class = 'cell' rowid='${i}' colid='${j}' contentEditable></div>`
        }
        cellsContent+="</div>"
    }
    cellsContent+="</div>"
    cellsContentDiv.innerHTML = cellsContent;
}

initCells();

let sheetsDB = [];
let db;

function initDb(){
    let newsheetDB = [];
    for(let i=0;i<100;i++){
        let row = [];
        for(let j=0;j<26;j++){
            let name = String.fromCharCode(65+j)+(i+1)+"";
            let cellObject = {
                name:name,
                value:"",
                formula:"",
                children:[],
                parent:[],
                fontStyle:{
                    bold:false,
                    italic:false,
                    underline:false
                },
                fontOption:{
                    fontFamily:"sans-serif",
                    fontSize:"13"
                },
                textColor:"#000000",
                backgroundColor:"#ffffff"
            }
            row.push(cellObject);
        }
        newsheetDB.push(row);
    }
    db = newsheetDB;
    sheetsDB.push(newsheetDB);
    console.log(sheetsDB);
}
initDb();

console.log(db);