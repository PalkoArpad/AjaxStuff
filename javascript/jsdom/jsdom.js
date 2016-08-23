//declaring new variables
    var date = new Date();
    var hour = date.getHours();
//demonstrating the if statement to get the current time
    if(hour >= 22 || hour <= 5){
        document.write("Go to sleep!");
    } else {
        document.write("Hello world!");
    }