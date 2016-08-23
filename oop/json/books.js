//holds an instance of XMLHttpRequest
var xmlHttp = createXmlHttpRequestObject();
//create XMLHttpRequest instance
function createXmlHttpRequestObject()
{
    var xmlHttp;
    try{
        xmlHttp = new XMLHttpRequest();
    } catch(e){
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
        } catch(e){}
    }
    if(!xmlHttp){
        alert("Error creating the XMLHttpRequest object.");
    } else {
        return xmlHttp;
    }
}

function process()
{
    if(xmlHttp){
        try {
            xmlHttp.open("GET","books.txt",true);
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send(null);
        } catch(e) {
            alert("Can't connect to server:\n" + e.toString());
        }
    }
}

function handleRequestStateChange()
{
    //when readyState is 4, we can read the server response
    if(xmlHttp.readyState == 4){
        if(xmlHttp.status == 200){
            try {
                handleServerResponse();
            } catch(e) {
                alert("Error reading the response: " + e.toString());
            }
        } else {
            alert("There was a problem retrievend the date:\n " +
                xmlHttp.statusText);
        }
    }
}

//handles the response received from the server
function handleServerResponse()
{
    //build the JSON object without a parser
    var jsonResponse = eval('(' + xmlHttp.responseText +')');
    var html = "";
    //iterate through the array of books and create HTML structure
    for(var i = 0; i<jsonResponse.books.length; i++){
        html += jsonResponse.books[i].title + ". "
                + jsonResponse.books[i].isbn + "<br/>";
    }
    myDiv = document.getElementById("myDivElement");
    myDiv.innerHTML = "<p>Server says: </p>" + html;
}