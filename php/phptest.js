//holds an instance of XMLHttpRequest
var xmlHttp = createXmlHttpRequestObject();

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

//read file from server
function process()
{
    if(xmlHttp){
        try {
            //initiate reading a file from server
            xmlHttp.open("GET","phptest.php",true);
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send(null);
        } catch (e) {
            alert("Can't connect to the server:\n" + e.toString());
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
    //read the messages from the server
    var xmlResponse = xmlHttp.responseXML;
    //obtain the XML's document element
    xmlRoot = xmlResponse.documentElement;
    //obtain arrays with book titles and ISBNs
    titleArray = xmlRoot.getElementsByTagName("title");
    isbnArray = xmlRoot.getElementsByTagName("isbn");
    //generate HTML output
    var html = "";
    //iterate through the arrays and create an HTML structure
    for(var i = 0; i<titleArray.length; i++){
        html += titleArray.item(i).firstChild.data + ", " +
            isbnArray.item(i).firstChild.data + "<br/>"
    }
    //obtain a reference to the <div> element on the page
    myDiv = document.getElementById("myDivElement");
    //display the HTML output
    myDiv.innerHTML = "<p>Server says: </p>" + html;
}