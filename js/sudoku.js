let fullArray = [];
//An array that is created in the reset function and initially mapped in resolve function. It specifically and predictably represents the initial state of the puzzle and includes an index for each cell in the 81 cell puzzle. See the resolve() function for further information.

let cellSchema = {};
//Object: 81 property keys named after each index of fullArray. Each Property key's value is an array of three numbers. The first number represents the box that the cell belongs to, the second represents the column the cell belongs to and the third represents the row it belongs to. Each number can be used to look up which indexes in the fullArray make up the box, column and row the cell belongs to in the boxSchema, colSchema and rowSchema respectively. See below.
let boxSchema = {};
//Object: 9 property keys (numbers) that represent the 9 boxes of 9 cells in the puzzle. Each property or box is named after the index of the fullArray that represents the cell that falls in its top left most cell considering that the array is created according to the above description.  Each properties value is an array of numbers which are the indexes of the fullArray that make up each box.
let colSchema = {};
//Object: 9 property keys (numbers) that represent the 9 columns in the puzzle. Each property or column is named after the index of the fullArray that represents the cell that is at the top of the column considering that the array is created according to the above description.  Each properties value is an array of numbers which are the indexes of the fullArray that make up each column.
let rowSchema = {};
//Object: 9 property keys (numbers) that represent the 9 rows in the puzzle. Each property or row is named after the index of the fullArray that represents the left most cell of the row considering that the array is created according to the above description.  Each properties value is an array of numbers which are the indexes of the fullArray that make up each row.

reset();

function setUp(){
	//function called when if using the text box and "set up" button method to enter initial puzzle data
	reset();
	clearGrid();
	let newArray = $(".setUp").val().split(',').map(ele => Number.parseInt(ele));
	newArray.map((ele,ind)=>{
		if(ele){
		$("input[name="+ind+"]").val(ele);
		//$("input[name="+ind+"]").css("background-color","#0F0");
		}
	});
}

function reset(){
//create cellSchema and initialise box,col,row schemas. Same result every time.
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
 
//build box,col,row schemas.  Same result every time.

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
	//create array where each index/cell is an array of all the possible end results.  As the starting set of numbers has yet to be passed into the application all indexes contain the same full array of possabilities. Same result every time.
	for (let i = 0;i<81;i++){
		fullArray.push([1,2,3,4,5,6,7,8,9]);
	}
}
console.log(cellSchema);
console.log(boxSchema);
console.log(colSchema);
console.log(rowSchema);

function resolve (){
	//iterate input fields to extract initial data and update the initial puzzle fullArray where input element name determines at which index in the puzzle fullArray each number will be located.  This is important because the application will attempt to solve the puzzle and present the solution with reference to the fullArray (or puzzle array). Therefore the array must predictably represent the initial puzzle. The top row (left to Right) being index 0 to 8 the second row being index 9 to 17 and so on down to the 9th row.  
	$(".cell").each(function (index, ele) {
	if(this.value){
		fullArray[this.name]=Number.parseInt(this.value);
		}
	});
	//Solve puzzle
	const endArray = process(fullArray);
	//Print solution to the page
	printSolution(endArray);
}

function process(targetArray){	
	// A function that systematically calls other functions and recalls itself in an effort, by process of elimination, to reduce all elements (indexes) of the current puzzle array from arrays of possibile Numbers to a single resolved Number (integer) in a way that satisfies the rules of sudoku.
	const reducedArraysArray = possiblesReduce(targetArray);
		
	const convertedToNumbersArray = checkForArraysOfOne(reducedArraysArray);
		
	if(arraysEqual(reducedArraysArray, convertedToNumbersArray)){
		const setCheckedArray = bcrSetCheckForLoneNumbers(convertedToNumbersArray);
			
		if(arraysEqual(setCheckedArray, convertedToNumbersArray)){
			const deepSetCheckedArray = findIsolatedArrayPairs(setCheckedArray);
				
			if(arraysEqual(setCheckedArray,deepSetCheckedArray)){
				//returns an updated deep copied array that has exhausted all current processes of elimination.
				return deepSetCheckedArray;
			}
			else{
				return process(deepSetCheckedArray);
			}
		}
		else{
			return process(setCheckedArray);
		}
	}
	else{
		return process(convertedToNumbersArray);
	}
}


 
function possiblesReduce(targetArray){
	//Iterates the puzzle array to detect resolved indexes (or cells.) These are represented by primitive numbers in the array. There is then three calls to a function that will search all of the indexes in puzzle array that represent the box, column and row the index (or cell) belongs to to eliminate that number from the arrays of possibilities found there in. It returns an updated deep copy of the passed in puzzle array.
	let myArray = targetArray.map(ele=>Array.isArray(ele)?ele.slice():ele);
	let startArray=targetArray.map(ele=>Array.isArray(ele)?ele.slice():ele);;

	for(let i = 0;i<startArray.length;i++){
		if(typeof startArray[i] === "number"){
			myArray = searchAndDestroy(myArray,boxSchema[cellSchema[i][0]],startArray[i]);
			myArray = searchAndDestroy(myArray,colSchema[cellSchema[i][1]],startArray[i]);
			myArray = searchAndDestroy(myArray,rowSchema[cellSchema[i][2]],startArray[i]);
		}

	}
	return myArray;
	
}

function searchAndDestroy(targetArray,searchArr,val){
	//A function called by the possiblesReduce() function to filter out a specified number (integer)from qualified second level arrays potentially found at each index of current puzzle array that are specified by the searchArr parameter. It returns an updated deep copied array to its calling function.
	let myArray = targetArray.map(ele=>Array.isArray(ele)?ele.slice():ele);
	searchArr.map((ele)=>{
		if(Array.isArray(myArray[ele]) && myArray[ele].length > 1){
			myArray[ele]  = myArray[ele].filter((elle)=>{return elle != val;});
		}	
	});
	return myArray;
}

function checkForArraysOfOne(arr){
	//Iterates a deep copy of the current puzzle array to convert arrays of length one to Numbers (integers) that represent resolved indexes.  It returns the updated version of the deep copied array to the main function.
	let repeat = false;
	let newArray = arr.map((ele,ind)=>{
		if(Array.isArray(ele) && ele.length==1){
			repeat = true;
			return ele[0];
		}else{return ele;}
	});
	if(repeat){
		checkForArraysOfOne(newArray);
	}
	return newArray;
}

function bcrSetCheckForLoneNumbers(targetArray){
	// a function that systematically checks all box, col and row schema sets for the presence of a cell within that schema that holds within its array the only representation of a Number. Having found such a instance it converts that second level array to a Number (integer) which then represents a resolved index of the current puzzle array.  The function returns an updated deep copy of the array to the main function.
	let myArray = targetArray.map(ele=>Array.isArray(ele)?ele.slice():ele);

	let upDatedArray = function(schema){
		for(let schematic in schema){
			let set = {};
			let numCount = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
			for(i=0;i<9;i++){
					set[schema[schematic][i]] = myArray[schema[schematic][i]];
				}
			for(let cell in set){
				if(Array.isArray(set[cell])){
					set[cell].map(ele=>numCount[ele]++);
				}
			}
			for(let num in numCount){
				if(numCount[num]===1){
					for(let cell in set){
						if(Array.isArray(set[cell])) {
							if(set[cell].some(elle=>elle===Number.parseInt(num))){
								myArray[cell]=Number.parseInt(num);
								return true; 							}
						}
					}
				}
			} 
		}
		return false;
	}

	return upDatedArray(boxSchema) ? myArray:upDatedArray(colSchema)?myArray:upDatedArray(rowSchema)?myArray:myArray;
}


function printSolution(targetArray){
	//This function prints the current and hopefully resolved array to puzzle graphic
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

  for (var i = 0; i < a.length; ++i) {
  	if(Array.isArray(a[i])){
  		if(!arraysEqual(a[i],b[i])){
  			return false;
  		}
  	}else if(a[i] !== b[i]) {
  		return false;
  	}
  }
  return true;
}

function consolePrintSolution(arr){
	//used for debugging
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


function findIsolatedArrayPairs(arr){

	//A complex logic that creates a set of index/value pairs for each schema (9 boxes, 9 columns and 9 rows) of the current puzzle array and searches for instances where there are only two indexes in that schema set containing arrays of the same two numbers.  From this discovery a function is called that takes the set of index/value pairs and uses the references to remove each of the two numbers from every other array at indexes in a deeply copied version of the current puzzle array that are represented by that schema set.  An updated version of the deep copied puzzle array is then returned recursively until all isolated pairs have been acted upon (including those that have been created by the function) after which the final array is returned to the main process() function.

	let myArray = arr.map(ele=>Array.isArray(ele)?ele.slice():ele);

	let subFunction = function(schema){
		
		for(let schematic in schema){
			let set = {};
			let isoPairsSet = {}
			for(i=0;i<9;i++){
					set[schema[schematic][i]] = myArray[schema[schematic][i]];
				}

			if(isoPairs(set)){
				if(isoPairReduce(isoPairsSet)){
					return true;
				}
			}

			function isoPairs(thisSet){
				for(let cell in thisSet){ 
					isoPairsSet = {};
					if(Array.isArray(thisSet[cell])&&thisSet[cell].length===2){
						for(let repeatcells in thisSet){
							if(Array.isArray(thisSet[repeatcells])&&arraysEqual([...thisSet[repeatcells]],[...set[cell]])){
								isoPairsSet[repeatcells]=[...thisSet[repeatcells]];
							}
						}
						if(Object.entries(isoPairsSet).length===2){return true;}
					}
				}
				return false;
			}

			function isoPairReduce(IPS){
				let result = false;
				let nums = Object.values(IPS)[0];
				for(let cell in set){
					if(Array.isArray(set[cell])&&!arraysEqual(set[cell],nums)){
						let testArray = [...myArray[cell]];
						if(set[cell].includes(nums[0])) {
							myArray[cell]=myArray[cell].filter((elle)=>{return elle != nums[0];});
							if(!arraysEqual(testArray,myArray[cell])){ result = true;}						}
						if(set[cell].includes(nums[1])) {
							myArray[cell]=myArray[cell].filter((elle)=>{return elle != nums[1];});
							if(!arraysEqual(testArray,myArray[cell])){ result = true;}
						}
					}
				}
				return result;
			}

		}
		return false;
	}

	return subFunction(boxSchema) ? findIsolatedArrayPairs(myArray):subFunction(colSchema)?findIsolatedArrayPairs(myArray):subFunction(rowSchema)?findIsolatedArrayPairs(myArray):myArray;

}
