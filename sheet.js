let addSheet = document.querySelector(".add-sheet");
let sheetList = document.querySelector(".sheets-list");
let sheetId = 0;
let firstSheet = document.querySelector(".sheet");
sheetLisner(firstSheet);

addSheet.addEventListener("click",function()
{
    sheetId++;
    let activeSheet = document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    let sheetDiv = document.createElement("div");
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.setAttribute("sheetId",sheetId);
    sheetDiv.innerText = `Sheet ${sheetId+1}`;
    // console.log(sheetDiv.innerText);
    sheetList.append(sheetDiv);
    sheetLisner(sheetDiv);
    initUi();//emptycell
    initDb();//create DB
        if(lastSelectedCell)
        {
            lastSelectedCell.classList.remove("active-cell");
            document.querySelector(`div[trid='${colId}']`).classList.remove("active-row-col");
            document.querySelector(`div[lcid='${rowId}']`).classList.remove("active-row-col");    
        }

            document.querySelector(`.bold`).classList.remove("active-font-style");
            document.querySelector(`.italic`).classList.remove("active-font-style");
            document.querySelector(`.underline`).classList.remove("active-font-style");    
})

//active class add or remove 
function sheetLisner(sheet)
{
    sheet.addEventListener("click",function()
    {
        if(sheet.classList.contains("active-sheet"))
        {
            return;
        }

        initUi();//empty all cells
        let activeSheet = document.querySelector(".active-sheet");
        activeSheet.classList.remove("active-sheet");
        
        sheet.classList.add("active-sheet");
        let sheetId = sheet.getAttribute("sheetId");
        db = sheetsDB[sheetId];
        setUi();
        if(lastSelectedCell)
        {
            lastSelectedCell.classList.remove("active-cell");
            document.querySelector(`div[trid='${colId}']`).classList.remove("active-row-col");
            document.querySelector(`div[lcid='${rowId}']`).classList.remove("active-row-col");    
        }

            document.querySelector(`.bold`).classList.remove("active-font-style");
            document.querySelector(`.italic`).classList.remove("active-font-style");
            document.querySelector(`.underline`).classList.remove("active-font-style");
    })
}

function setUi()
{
    for(let i=0; i<100; i++)
    {
        for(let j=0; j<26; j++)
        {
            let cell = document.querySelector(`div[rowid="${i}"][colid="${j}"]`);
           let cellObject = db[i][j];
            cell.innerHTML = cellObject.value;
        }   
    }
}

function initUi()
{
    for(let i=0; i<100; i++)
    {
        for(let j=0; j<26; j++)
        {
            let cell = document.querySelector(`div[rowid="${i}"][colid="${j}"]`);
            cell.innerHTML = "";
        }   
    }
}