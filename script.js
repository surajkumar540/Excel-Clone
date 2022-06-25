let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;

//scroll
cellsContentDiv.addEventListener("scroll",function(e){
    let scrollFromTop = e.target.scrollTop;
    let scrollFromLeft = e.target.scrollLeft;
    topRow.style.top = scrollFromTop+"px";
    leftCol.style.left = scrollFromLeft+"px";
    topLeftCell.style.top = scrollFromTop+"px";
    topLeftCell.style.left = scrollFromLeft+"px";
})

let rowId;
let colId
for(let i=0;i<allCells.length; i++)
{
    //kisi bhi cells par click karne par uska colId and rowId bata de
    allCells[i].addEventListener("click",function(e)
    {
        if(lastSelectedCell)
        {
            lastSelectedCell.classList.remove("active-cell");
            document.querySelector(`div[trid='${colId}']`).classList.remove("active-row-col");
            document.querySelector(`div[lcid='${rowId}']`).classList.remove("active-row-col");    
        }
        rowId = Number(e.target.getAttribute("rowid"));
        colId = Number(e.target.getAttribute("colid"));
        
        e.target.classList.add("active-cell");
        document.querySelector(`div[trid='${colId}']`).classList.add("active-row-col");
        document.querySelector(`div[lcid='${rowId}']`).classList.add("active-row-col");
        let address = String.fromCharCode(65+colId)+(rowId+1)
        let cellObject = db[rowId][colId];
        addressInput.value = address;     
        // console.log(addressInput.value); 
        formulaInput.value = cellObject.formula;
        

        cellObject.fontStyle.bold?document.querySelector(".bold").classList.add("active-font-style"):
        document.querySelector(".bold").classList.remove("active-font-style");

        cellObject.fontStyle.italic?document.querySelector(".italic").classList.add("active-font-style"):
        document.querySelector(".italic").classList.remove("active-font-style");
        
        cellObject.fontStyle.underline?document.querySelector(".underline").classList.add("active-font-style"):
        document.querySelector(".underline").classList.remove("active-font-style");

        // cellObject.alignStyle.leftAlign?document.querySelector(".leftAlign").classList.add("active-font-style"):
        // document.querySelector(".leftAlign").classList.remove("active-font-style");

        // cellObject.alignStyle.centerAlign?document.querySelector(".centerAlign").classList.add("active-font-style"):
        // document.querySelector(".centerAlign").classList.remove("active-font-style");
        
        // cellObject.alignStyle.rightAlign?document.querySelector(".rightAlign").classList.add("active-font-style"):
        // document.querySelector(".rightAlign").classList.remove("active-font-style");

    })

    //view in cells what value have 
    allCells[i].addEventListener("blur",function(e)
    {
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        // console.log(cellValue);
        let {rowId,colId} = getRowIdColIdFromElement(e.target);
        // console.log({rowId,colId});

        let cellObject = db[rowId][colId];
        if(cellObject.value == cellValue)
        {
            return;
        }
        cellObject.value = cellValue;
        // console.log(cellObject);
        updateChildren(cellObject);
    })

    allCells[i].addEventListener("keydown",function(e){
        if(e.key == 'Backspace'){
            let cell = e.target;
            let {rowId,colId} = getRowIdColIdFromElement(cell);
            let cellObject = db[rowId][colId];
            if(cellObject.formula){
                //update db
                cell.formula = "";
                //update ui 
                formulaInput.value = "";
                cell.textContent = "";
                removeFormula(cellObject);
            }
        }
    })
}

function removeFormula(cellObject)
{
    for(let i=0; i<cellObject.parent.length; i++)
    {
        let parentName = cellObject.parent[i];
        let {rowId,colId} = getRowIdColIdFromAddress(parentName);
        let parentCellObject = db[rowId][colId];
        let updatedChildren = parentCellObject.children.filter(function(child)
        {
            return child != cellObject.name;
        })
        parentCellObject.children = updatedChildren;
        console.log(parentCellObject);
    }
    cellObject.parent = [];
}

formulaInput.addEventListener("blur",function(e)
{
    let formula = e.target.value;
    // A1+B2
    // console.log(formula); 
    if(formula)
    {
        let {rowId,colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        // console.log(cellObject);
        if(cellObject.formula)
        {
            removeFormula(cellObject);
        }
        
        let computedValue = solveFormula(formula,cellObject); 
        //update db
        cellObject.value = computedValue;
        cellObject.formula = formula;
        // console.log(cellObject.value);
        //update ui
        lastSelectedCell.textContent = computedValue;
        updateChildren(cellObject);
    }
})


// check this code in util.js file
// function getRowIdColIdFromElement(element)
// {
//     let rowId = element.getAttribute("rowid");
//     let colId = element.getAttribute("colid");

//     return{
//         rowId,
//         colId
//     }
//     //what they return ^
//     // rowId: rowId(rowid like (1 to 100 tak mai)),
//     // colId: colId(colid like (A to Z mai))
// }
