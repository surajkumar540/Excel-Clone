//font bold,italic and underline
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let select = document.querySelectorAll('select');

//BOLD, ITALIC AND UNDERLINE
bold.addEventListener("click",function()
{
    setFontStyle("bold",bold);
})

italic.addEventListener("click",function()
{
    setFontStyle("italic",italic);
})

underline.addEventListener("click",function()
{
    setFontStyle("underline",underline);
})




for(let i = 0; i<select.length; i++){
    select[i].addEventListener('change',(e)=>{
        console.log(e.target.value);
        setFontOption(e.target,e.target.value);
    })
}


let inputColorOptions = document.querySelectorAll('input[type="color"]');
for(let i = 0; i<inputColorOptions.length; i++){
    inputColorOptions[i].addEventListener('blur',(e)=>{
        console.log(e.target.value);
        setColorOption(e.target,e.target.value);
    })
}

function setColorOption(element,colorOption){
    if(lastSelectedCell){
        const {rowId,colId} = getRowIdColIdFromElement(lastSelectedCell);
        const cellObject = db[rowId][colId];
        if(element.id == 'text-color-palette'){
            lastSelectedCell.style.color = colorOption;
            cellObject.textColor = colorOption;
        }else{
            lastSelectedCell.style.backgroundColor = colorOption;
            cellObject.backgroundColor = colorOption;
        }
    }
}


function setFontOption(element,fontOption){
    if(lastSelectedCell){
        const {rowId,colId} = getRowIdColIdFromElement(lastSelectedCell);
        const cellObject = db[rowId][colId];
        if(element.id == 'font-family'){
            lastSelectedCell.style.fontFamily = fontOption;
            cellObject.fontOption.fontFamily = fontOption;
        }else{
            lastSelectedCell.style.fontSize = fontOption + "px";
            cellObject.fontOption.fontSize = fontOption;
        }
    }
}



//BOLD, ITALIC AND UNDERLINE
function setFontStyle(styleName,element)
{
    if(lastSelectedCell)
    {
        let {rowId,colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        if(cellObject.fontStyle[styleName])
        {
            if(styleName == "bold")
            {
                lastSelectedCell.style.fontWeight = "normal";   
            }
            else if(styleName == "italic")
            {
                lastSelectedCell.style.fontStyle = "normal";
            }
            else
            {
                lastSelectedCell.style.textDecoration = "none";
            }
            element.classList.remove("active-font-style");
        }
        else
        {
            if(styleName == "bold")
            {
                lastSelectedCell.style.fontWeight = "bold";   
            }
            else if(styleName == "italic")
            {
                lastSelectedCell.style.fontStyle = "italic";
            }
            else
            {
                lastSelectedCell.style.textDecoration = "underline";
            }
            element.classList.add("active-font-style");
        }
        cellObject.fontStyle[styleName] = !cellObject.fontStyle[styleName];
    }
}
    
