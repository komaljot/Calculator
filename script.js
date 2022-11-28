function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
    //if the value is empty
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
function getFormattedNumber(num){
    //corner case---if input is -sign, we return empty value
	if(num=="-"){
		return "";
	}
    //for adding commas
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
//back to normal char without commas
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}


//accesing operator---what action ww need to perform when the user clicks the operator
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
        //if clear is pressed both history and output is cleared
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}

        // backspace CE is pressed
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();

            //the output is converted to string and length is reduced
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
            //test case--if last char is an opeartor--then remove last char
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}

			if(output!="" || history!=""){
				output= output==""?
                output:reverseNumberFormat(output);
				history=history+output;
                //if user clicks on = sign the  output is evaluated and history is set to empty
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
                    //for other operators gets added to the history and output is set to empty
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
        //if output is a number, the value user enters just gets conactenated to the existing value
		if(output!=NaN){ 
			output=output+this.id;
			printOutput(output);
		}
	});
}