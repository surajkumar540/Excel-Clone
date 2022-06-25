//utilization
function getRowIdColIdFromElement(element)
{
    let rowId = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");

    return{
        rowId,
        colId
    }
    //what they return ^
    // rowId: rowId(rowid like (1 to 100 tak mai)),
    // colId: colId(colid like (A to Z mai))
}

function solveFormula(formula,selfCellObject){
    let formulaComps = formula.split(" "); //giving array
         // ['A1','+', 'C', '-', '2']
    // console.log(formulaComps);
    for(let i=0; i<formulaComps.length; i++)
    {
        let formulaComp = formulaComps[i];
        // console.log(formulaComp); A1  
                                //   +
                                //   B2      
         
        if(formulaComp[0]>= 'A' && formulaComp[0] <='Z') //true hai to yai cell hai
        {
                                                          //formula      
                                                //like - (A1, B2, C4) etc. 
            let {rowId,colId} = getRowIdColIdFromAddress(formulaComp);
        //    console.log({rowId,colId});
            let cellObject = db[rowId][colId];
            // console.log(cellObject); 
            //A1 + B2 => {name: 'A1', value: '1', formula: ''}
                      // {name: 'B2', value: '2', formula: ''}
            let value  = cellObject.value;
            // console.log(value);
            if(selfCellObject)
            {
                cellObject.children.push(selfCellObject.name);
                selfCellObject.parent.push(cellObject.name);
            }
           
            // console.log(cellObject);
            formula = formula.replace(formulaComp,value);
            // console.log(formula);
            // 1 + B1
            // 1 + 3 = formula
        }
     }
     let computedValue = eval(formula);
     return computedValue; //4
}



function getRowIdColIdFromAddress(address)
{
    // address aayega - like - A1
    let colId = address.charCodeAt(0)-65;
    let rowId = Number(address.substring(1))-1;
    //A1 + B2
    // console.log(colId); 00 
    // console.log(rowId); 10
    return{
        rowId,
        colId
    }
}


//updateChildern
function updateChildren(cellObject)
{
    for(let i=0; i<cellObject.children.length; i++)
    {
        let childName = cellObject.children[i];
        let {rowId,colId} = getRowIdColIdFromAddress(childName);
        // console.log({rowId,colId});
        let childCellObject = db[rowId][colId];
        let newValue = solveFormula(childCellObject.formula);

        //update ui
        let cellUi = document.querySelector(`div[rowId = '${rowId}'][colId = '${colId}']`);
        cellUi.textContent = newValue;
        
        //update db
        childCellObject.value = newValue;
        updateChildren(childCellObject);
    }
}
