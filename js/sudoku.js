
let numSet = [1,2,3,4,5,6,7,8,9];
let fullArray = [];
let resultArray = [];
let numberCount = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,"blank":0};
let cellSchema = {};
let boxSchema = {};
let colSchema = {};
let rowSchema = {};

reset();
 
function setUp(){
	console.log("setUp");
	reset();
	clearGrid();
	let newArray = $(".setUp").val().split(',').map(ele => Number.parseInt(ele));
	console.log(newArray);
	newArray.map((ele,ind)=>{
		if(ele){
		$("input[name="+ind+"]").val(ele);
		//$("input[name="+ind+"]").css("background-color","#0F0");
		}
	});
}

function reset(){
	console.log("reset");
//create cellSchema and initialise boc,col,row schemas
	for( let i = 0; i<81;i++){
		let row = i-(i%9);
		let col = i%9
		let other = ((i%27)-((i%27)%9));
		let box = i-(i%3)-other;
		cellSchema[i] = [box,col,row];
		boxSchema[box]=[];
		colSchema[col]=[];
		rowSchema[row]=[];
	}
 
//build box,col,row schemas

	Object.keys(boxSchema).map((ele,ind)=>{
		numEle = Number.parseInt(ele);
		for(let i=0;i<3;i++){
			for(let j=0;j<3;j++){
				boxSchema[ele].push((numEle+(9*i))+j);
			}
		}
	});

	Object.keys(colSchema).map((ele,ind)=>{
		numEle = Number.parseInt(ele);
		for(let i=0;i<9;i++){
			colSchema[ele].push(numEle+(9*i));
		}
	});


	Object.keys(rowSchema).map((ele,ind)=>{
		numEle = Number.parseInt(ele);
		for(let i=0;i<9;i++){
			rowSchema[ele].push(numEle+i);
		}
	});

	fullArray = [];
	//create array of full possability
	for (let i = 0;i<81;i++){
		fullArray.push(numSet);
	}
}

function resolve (){
	console.log(cellSchema);
	console.log(rowSchema);
	//iterate input fields to extract initial data and begin reporting
	$(".cell").each(function (index, ele) {
	//get arrays from input boxe
	if(this.value){
		fullArray[this.name]=Number.parseInt(this.value);
		numberCount[this.value]++;
		}
	});
	fullArray = process(fullArray);
	printSolution(fullArray);
}

function process(targetArray){	
		//consolePrintSolution(targetArray);
		console.log("restart process ____________");
		console.log("start possiblesReduce");
	let reducedArraysArray = possiblesReduce(targetArray);
		//console.log("end possiblesReduce");	
		//consolePrintSolution(reducedArraysArray);
		console.log("start checkForArraysOfOne");
	let convertedToNumbersArray = checkForArraysOfOne(reducedArraysArray);
		//console.log("end checkForArraysOfOne");
		//consolePrintSolution(convertedToNumbersArray);
	//return convertedToNumbersArray;
	if(!arraysEqual(reducedArraysArray, convertedToNumbersArray)){
		process(convertedToNumbersArray);
	}
	else{
		//return convertedToNumbersArray;
			console.log("start bcrSetCheckForLoneNumbers");
		let setCheckedArray = bcrSetCheckForLoneNumbers(convertedToNumbersArray);
			//console.log("end bcrSetCheckForLoneNumbers");
			//consolePrintSolution(setCheckedArray);
		//return setCheckedArray;
		if(!arraysEqual(setCheckedArray, convertedToNumbersArray)){
			process(setCheckedArray);
		}
		else{
				console.log("end process");
				//consolePrintSolution(convertedToNumbersArray);
			return setCheckedArray;
		}
	}
	
}


//determines cells box, col and row schemas for the index and calls destroy function 
function possiblesReduce(targetArray){
	//consolePrintSolution(targetArray);
	let myArray = [...targetArray];
	let boxReduced=[];
	let colReduced=[];
	let rowReduced=[...targetArray];
	//consolePrintSolution(myArray);
	for(let i = 0;i<myArray.length;i++){
		if(typeof myArray[i] === "number"){
			boxReduced = searchAndDestroy(rowReduced,boxSchema[cellSchema[i][0]],myArray[i]);
			colReduced = searchAndDestroy(boxReduced,colSchema[cellSchema[i][1]],myArray[i]);
			rowReduced = searchAndDestroy(colReduced,rowSchema[cellSchema[i][2]],myArray[i]);
		}
	}
	printSolution(rowReduced);
	return rowReduced;
	
}
//reports to each in the schema and destroys invalid numbers within the array (for non resolved cells)
function searchAndDestroy(targetArray,searchArr,val){
	let myArray =[...targetArray];
	let startArray = [...targetArray];
	searchArr.map((ele)=>{
		if(Array.isArray(myArray[ele]) && myArray[ele].length > 1){
			
			myArray[ele]  = myArray[ele].filter((elle)=>{return elle != val;});
		}	
	});
	if(!arraysEqual(startArray.slice(45,54),myArray.slice(45,54))){
	}
	return myArray;
}

function checkForArraysOfOne(arr){
	let repeat = false;
	let newArray = arr.map((ele,ind)=>{
		if(Array.isArray(ele) && ele.length==1){
			repeat = true;
			return ele[0];
		}else{return ele;}
	});
	if(repeat){
		checkForArraysOfOne(newArray);
	}/*else if(checkForCompleteness()){
		//printSolution();
	}else{
		globalSchemaReview();
	}*/
	return newArray;
}
// a function to check a box,col or row schema set (arr) for the presence of a single cell having potential for a given number which will then convert that cell from an array to the given number and return true to trigger a possiblesReduce function.  If more than one cell has potential for the given number or the given number already exists in the schema set returns false.
function bcrSetCheckForLoneNumbers(targetArray){
	let myArray = [...targetArray];
	for(let props in boxSchema){
		let set = {};
		let numCount = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0}
		for(i=0;i<9;i++){
				set[boxSchema[props][i]] = myArray[boxSchema[props][i]];
			}
		for(let setProp1 in set){
			if(Array.isArray(set[setProp1])){
				set[setProp1].map(ele=>numCount[ele]++);
			}
		}console.log("numCount: ");console.log(numCount);console.log("Search set: ");console.log(set);			
		for(let num in numCount){
			if(numCount[num]===1){
				for(let setProp2 in set){
					if(Array.isArray(set[setProp2])) {
						if(set[setProp2].some(elle=>elle===Number.parseInt(num))){
							console.log("Number: "+num+":"+numCount[num]);console.log("index: "+setProp2+":"+set[setProp2]);
							consolePrintSolution(myArray);console.log("box box box box box box box box box box box box -- "+setProp2);	
							myArray[setProp2]=Number.parseInt(num);
							consolePrintSolution(myArray);
							return myArray; 
						}
					}
				}
			}
		}
	}
	
	for(let props in colSchema){
		let set = {};
		let numCount = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0}
		for(i=0;i<9;i++){
				set[colSchema[props][i]] = myArray[colSchema[props][i]];
			}
		for(let setProp1 in set){
			if(Array.isArray(set[setProp1])){
				set[setProp1].map(ele=>numCount[ele]++);
			}
		}			
		for(let num in numCount){
			if(numCount[num]===1){
				for(let setProp2 in set){
					if(Array.isArray(set[setProp2])) {
						if(set[setProp2].some(elle=>elle===Number.parseInt(num))){
							consolePrintSolution(myArray);	console.log("col col col col col col col col col col col-- "+setProp2);
							myArray[setProp2]=Number.parseInt(num);
							consolePrintSolution(myArray);
							return myArray; 
						}
					}
				}
			}
		}
	}
	for(let props in rowSchema){
		let set = {};
		let numCount = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0}
		for(i=0;i<9;i++){
				set[rowSchema[props][i]] = myArray[rowSchema[props][i]];
			}
		for(let setProp1 in set){
			if(Array.isArray(set[setProp1])){
				set[setProp1].map(ele=>numCount[ele]++);
			}
		}				
		for(let num in numCount){
			if(numCount[num]===1){
				for(let setProp2 in set){
					if(Array.isArray(set[setProp2])) {
						if(set[setProp2].some(elle=>elle===Number.parseInt(num))) {
							consolePrintSolution(myArray);	console.log("row row row row row row row row row row row row row-- "+setProp2);
							myArray[setProp2]=Number.parseInt(num);
							consolePrintSolution(myArray); 
							return myArray; 
						}
					}
				}
			}
		}
	}
	return myArray;
}


//function to check for completeness i.e. all cells are a whole number (needs to be inserted in the main function)
function checkForCompleteness(arr){
	//fullArray review to check for each if (non number values){continue resolution process}
	return arr.every((ele)=>{return !Array.isArray(ele);});
}
//exit point
function printSolution(targetArray){
	targetArray.map((ele,ind)=>{
		$("input[name="+ind+"]").prop('type','text');
		$("input[name="+ind+"]").val(ele);
		//}
	});
}
function clearGrid(){
	$(".cell").each(function (index, ele) {
	//clear input boxes and reset arrays
		this.value = "";
		reset();
	});
}
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function consolePrintSolution(arr){
	console.log(arr.slice(0,9));
	console.log(arr.slice(9,18));
	console.log(arr.slice(18,27));
	console.log(arr.slice(27,36));
	console.log(arr.slice(36,45));
	console.log(arr.slice(45,54));
	console.log(arr.slice(54,63));
	console.log(arr.slice(63,72));
	console.log(arr.slice(72));
}

function testFunction(){
	console.log(typeof [1]);
	console.log(typeof 1);
}


