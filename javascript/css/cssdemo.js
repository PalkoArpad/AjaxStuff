//change table style to style 1
function setStyle1()
{
    //obtain references to HTML elements
    oTable = document.getElementById("table");
    oTableHead = document.getElementById("tableHead");
    oTableFirstLine = document.getElementById("tableFirstLine");
    oTableSecondLine = document.getElementById("tableSecondLine");
    //set styles
    oTable.className = "Table1";
    oTableHead.className = "TableHead1";
    oTableFirstLine = "TableContent1";
    oTableSecondLine = "TableContent1";
}

function setStyle2()
{
    //obtain references to HTML elements
    oTable = document.getElementById("table");
    oTableHead = document.getElementById("tableHead");
    oTableFirstLine = document.getElementById("tableFirstLine");
    oTableSecondLine = document.getElementById("tableSecondLine");
    //set styles
    oTable.className = "Table2";
    oTableHead.className = "TableHead2";
    oTableFirstLine = "TableContent2";
    oTableSecondLine = "TableContent2";
}