//create class instance
var myHello = new HelloWorld();
//call method
myHello.DisplayGreeting();
function HelloWorld(hour)
{
    //class "constructor" initializes this.hour field
    if(hour){
        //if hour parameter has a value, store it as a class field
        this.hour = hour;
    } else {
        //if hour parameter doesn't exist, save the current hour
        var date = new Date();
        this.hour = date.getHours();
    }
    //define function that displays greeting
    this.DisplayGreeting = function()
    {
        if(this.hour >= 22 || this.hour <= 5){
            document.write("Goodnight, world!");
        } else {
            document.write("Hello, world!");
        }
    }
}