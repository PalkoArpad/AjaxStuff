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

function process()
{
    if(xmlHttp){
        try {
            //get the two calues entered by the user
            var firstNumber = document.getElementById("firstNumber").value;
            var secondNumber = document.getElementById("secondNumber").value;
            var params = "firstNumber=" + firstNumber
                        + "&secondNumber=" + secondNumber;
            xmlHttp.open("GET", "divide.php?" + params, true);
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

function handleServerResponse()
{
    //retrieve the server's response packaged as an XML DOM object
    var xmlResponse = xmlHttp.responseXML;
    //catching server-side errors
    if(!xmlResponse || !xmlResponse.documentElement)
        throw("Invalid XML structure:\n" + xmlHttp.responseText);
    //catching server-side errors(firefox)
    var rootNodeName = xmlResponse.documentElement.nodeName;
    if(rootNodeName == "parsererror")
        throw("Invalid XML structure:\n" + xmlHttp.responseText);
    //getting the root element
    xmlRoot = xmlResponse.documentElement;
    //testing that we received the XML document we expect
    if(rootNodeName != "response" || !xmlRoot.firstChild)
        throw("Invalid XML structure:\n" + xmlHttp.responseText);
    //the value we need to display is the child of the root <response> el
    responseText = xmlRoot.firstChild.data;
    //display the user message
    myDiv = document.getElementById("myDivElement");
    myDiv.innerHTML = "Server says the answer is: " + responseText;
}