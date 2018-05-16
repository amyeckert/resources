// Notes for Algorhythm Challenges 
// https://www.freecodecamp.org/challenges/get-set-for-our-algorithm-challenges

/**************************************************************
***************************************************************
***************************************************************/

// 1.Reverse the provided string.
// You may need to turn the string into an array before you can reverse it.
// Your result must be a string.

// Answer:
function reverseString(str) {
 var strArray = Array.from(str); //turn string to an array
 strArray.reverse(); 
 strArray = strArray.join(''); // join with no white spaces
 return strArray;
}

reverseString("hello"); //returns "olleh"

/**************************************************************
***************************************************************
***************************************************************/

// 2. Return the factorial of the provided integer.  
// If the integer is represented with the letter n, a factorial is the product of all 
// positive integers less than or equal to n.  
// Factorials are often represented with the shorthand notation n!  
// For example: 5! = 1 * 2 * 3 * 4 * 5 = 120 

// Answer:
function factorialize(num) {
  for (a = 1; num >= 1; num--) {
    a = num * a;
  }
  return a;
}

factorialize(6); // 720

// OR

function factorialize(num) {
	//set the stop condition when number is 0 return 1, when a recursion returns anything it will stop. 
  	if (num === 0) { 
  	return 1; 
  	}
 	return num * factorialize(num-1); 
}

factorialize(5); // 120

/**************************************************************
***************************************************************
***************************************************************/

// 3. Return true if the given string is a palindrome. Otherwise, return false.
// A palindrome is a word or sentence that's spelled the same way both forward and backward, 
// ignoring punctuation, case, and spacing.
// Note: You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) 
// and turn everything lower case in order to check for palindromes.

// Answer:

// THIS IS OK:
function palindrome(str) {
  return str.replace(/[\W_]/g, '').toLowerCase() ===
         str.replace(/[\W_]/g, '').toLowerCase().split('').reverse().join('');
}
// OR
function palindrome(str) {
  str = str.toLowerCase().replace(/[\W_]/g, '');
  for(var i = 0, len = str.length - 1; i < len/2; i++) {
    if(str[i] !== str[len-i]) {
      return false;
    }
  }
  return true;
}

// we set up our for loop and declare an index i to keep track of the loop. 
// We set our escape sequence to when i is greater than the length of the string divided by two, which tells the 
// loop to stop after the halfway point of the string. And finally we set i to increment after every loop.
// Inside of each loop we want to check that the letter in element [i] is equal to the letter 
// in the length of the string minus i, [str.length - i]. 
// Each loop, the element that is checked on both sides of the string moves closer to the center 
// until we have checked all of the letters. If at any point the letters do not match, we return false. 
// If the loop completes successfully, it means we have a palindrome and therefore we return true!

// BEST! source: https://forum.freecodecamp.org/t/freecodecamp-algorithm-challenge-guide-check-for-palindromes/16004
// This solution performs at minimum 7x better, at maximum infinitely better.
// It finds the middle-ish of the word and matches 2 characters at a time until a non-match returns false
//
function palindrome(str) {
  //assign a front and a back pointer
  let front = 0; //find the 
  let back = str.length - 1;

  //back and front pointers won't always meet in the middle, so use (back > front)
  while (back > front) {
    //increments front pointer if current character doesn't meet criteria
    while ( str[front].match(/[\W_]/) ) {
      front++;
      continue;
    }
    //decrements back pointer if current character doesn't meet criteria
    while ( str[back].match(/[\W_]/) ) {
      back--;
      continue;
    }
    //finally does the comparison on the current character
    if ( str[front].toLowerCase() !== str[back].toLowerCase() ) return false
    front++;
    back--;
  }
  
  //if the whole string has been compared without returning false, it's a palindrome!
  return true;
}

// The simpler solutions perform very poorly on long strings because they operate on the whole string multiple times 
// (toLowerCase(), replace(), split(), reverse(), join()) before comparing the whole string twice.
// The beauty of this solution is it never needs to read through the whole string, even once, 
// to know that it’s not a palindrome. Why read through the whole string if you can tell that it’s not a palindrome 
// just by looking at two letters?
// Uses a while loop instead of a for loop as a best practice - because we are using two variables, 
// one is the index starting from the beginning of the string, and the other starts at the end of the string.

/**************************************************************
***************************************************************
***************************************************************/

// 4. RETURN THE LENGTH OF THE LONGEST WORD IN A SENTENCE:
// BASIC 

function findLongestWord(str) {
   var wordArray = [];
   wordArray = str.split(' ');
  var currentLength = 0;
  
  for (var i = 0; i < wordArray.length; i++) {
    if(wordArray[i].length > currentLength) {
      currentLength = wordArray[i].length;
    }
  }
 return currentLength;
  
 }   
                  
findLongestWord("The quick brown fox jumped over the lazy dog");
//
// OR:
//
function findLongestWord(str) {
  return str.split(' ') // first, split string up into words in array
    .reduce(function(x, y) { // array.reduce() method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
      return Math.max(x, y.length) //Math.max returns the largest of zero or more numbers
    }, 0); // the '0' here is used to give an initial value to the x, so that Math.max will know where to start.
}

// BEST:
function findLongestWord(str) {

  //split the string into individual words 
  //(important!!, you'll see why later)
  str = str.split(" ");

  //str only has 1 element left that is the longest element, 
  //return the length of that element
  if(str.length == 1){
    return str[0].length;
  }

  //if the first element's length is greater than the second element's (or equal) 
  //remove the second element and recursively call the function)
  if(str[0].length >= str[1].length){
    str.splice(1,1);
    return findLongestWord(str.join(" "));
  }

  //if the second element's length is greater thant the first element's start 
  //call the function past the first element 
  if(str[0].length <= str[1].length){
    // from the first element to the last element inclusive.
    return findLongestWord(str.slice(1,str.length).join(" "));
  }
}
// The first line splits the string into individual words. 
// Then we check if str only has 1 element left then that is the longest element and we return it. 
// If the first element’s length is greater than the second element’s (or equal), 
// we remove the second element and recursively call the function findLongestWord. 
// However, if the second element’s length is greater thant the first element’s start, 
// then we call the function past the first element.

/**************************************************************
***************************************************************
***************************************************************/

// 5. RETURN A STRING WITH THE FIRST LETTER OF EACH WORD CAPITALIZED

// 1. split string into array
// 2. iterate over array to find first letter of each word
// 3. use .replace() with a regex to replace first letter with capital letter
// 4. use .join() to return the array to a string


function titleCase(str) {
  var sentence = str.toLowerCase().split(' '); //split sentence into array

 var newSentence = sentence.map(function(word) { // iterate over the array and change each item (ex. word is the arg) in it.
    return word.replace(word.charAt(0), word.charAt(0).toUpperCase()); // replaces the character at position (0) with uppercase
  }); return newSentence.join(' ');
}

titleCase("I'm a little tea pot"); 

// ADVANCED:
// The solution works by first lowercasing all the characters in the string and 
// then only uppercasing the first character of each word.
function titleCase(str) {
  return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
}

// Lowercase the whole string using str.toLowerCase().
// Replace every word’s first character to uppercase using .replace.
// Search for character at the beginning of each word i.e. matching any character following a space or matching the first character of the whole string, by using the following pattern.

// Regex explanation:
// Find all non-whitespace characters (\S)
// At the beginning of string (^)
// Or after any whitespace character (\s)
// The g modifier searches for other such word pattern in the whole string and replaces them.
// This solution works with national symbols and accented letters as illustrated by following examples
// international characters: ‘бабушка курит трубку’ // -> ‘Бабушка Курит Трубку’
// accented characters: ‘località àtilacol’ // -> ‘Località Àtilacol’

/**************************************************************
***************************************************************
***************************************************************/

//6. Return an array consisting of the largest number from each provided sub-array. 
// For simplicity, the provided array will contain exactly 4 sub-arrays.

//
// GOOD ANSWER:
//
function largestOfFour(arr) {
  return arr.map(function(largestNumbersGroup){  // 1.
    return group.reduce(function(prev, current) {  // 2.
      return (current > prev) ? current : prev;  // 3. 
    });
  });
}
largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

// EXPLANATION
// 1. map all items within the main array to a new array ("largestNumbersGroup") using Array.prototype.map() 
// and return this array as the final result. it's the outer-most level. 
// 2. within each inner array, we reduce its contents down to a single value using Array.prototype.reduce()
// The callback function passed to the reduce method takes the previous value and 
// the current value and compares the two values.  

// 3. if the current value is higher than the previous value, we set it as the new previous value for 
// comparison with the next item within the array, or returns it to the map method callback if it’s the last item. 
// If condition is true, the operator returns the value of expr1; otherwise, it returns the value of expr2.

/**************************************************************
***************************************************************
***************************************************************/

// 7. Check if a string, (the first argument, str) ends with the given target string (second argument, target).  

function confirmEnding(str, target) {
   var doesItMatch = true;
   var matchTarget = target.length; //get length of target string
   var endOfString = str.substring( str.length - matchTarget); 
   
  
   if(endOfString === target) {
    return doesItMatch;
    } else {
      doesItMatch = false;  
    }
  return doesItMatch;
}

confirmEnding("Bastian is bigg", "bigg");

// Better answer:
function confirmEnding(str, target) {
  return str.substr(-target.length) === target;
}
 // substr() calculates the index of first matching character from the string’s end if the specified location is negative. Using the - operator in front of target.length makes it negative.

/**************************************************************
***************************************************************
***************************************************************/

//8. Repeat a given string (first argument) num times (second argument). Return an empty string if num is not a positive number.


function repeatStringNumTimes(str, num) {
  // repeat after me
  var newString = ''; 
  while (num > 0 ) { 
    newString += str;
    num--;
  }
   return newString; 
  }

repeatStringNumTimes("abc", 3);

// OK solution:
// while number > 0, add add string to new string and decrement the num until it's 0.

// BETTER:
function repeatStringNumTimes(str, num) {
  return num > 0 ? str.repeat(num) : '';
}
// if num > 0 is true, repeat the string by the (num) otherwise return empty string. 

// OR, using recursion:
function repeatStringNumTimes(str, num) {
  if(num < 0)
    return "";
  if(num === 1)
    return str;
  else
    return str + repeatStringNumTimes(str, num - 1);
}
// We check if num is negative and return an empty string if true.
// Then we check if it’s equal to 1 and in that case we return the string itself.
// If not, we add the string to a call of our function with num being decreased by 1, 
// which will add another str and another… until eventually num is 1. And return that whole process.

/**************************************************************
***************************************************************
***************************************************************/

// 9. Truncate a string (first argument) if it is longer than the given maximum string length (second argument). 
// Return the truncated string with a ... ending.
// Note that inserting the three dots to the end will add to the string length.
// However, if the given maximum string length num is less than or equal to 3, then the addition of 
// the three dots does not add to the string length in determining the truncated string.

function truncateString(str, num) {
  // Clear out that junk in your trunk  
  if(str.length > num ) {
    return str.slice(0, num > 3 ? num-3 : num) + '...';
  }
  return str;
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);

// ANSWER ^^
// We start by writing an if-statement that checks if the length of the string in the first argument 
// is greater than the size limit. If true, we need to use the “slice” method to extract a section of the 
// string and return it as a new string. Here we pass 0 as the starting point for our slice. 
// To determine the endpoint, we use a ternary operator: num > 3 ? num - 3 : num. 
// In our ternary, if num is larger than 3, we must factor in the three dots to our total length, and thus we end our slice at num-3. 
// If num is less than or equal to 3, our slice gets an end variable of just num. 
// Finally, the '...' is appended to the end of our new string and is returned.
// If our if statement above fails, the program will skip over it including the return statement. 
// In this case we are able to skip a follow-up “else” statement and return the original string.

/**************************************************************
***************************************************************
***************************************************************/

// 10. Write a function that splits an array (first argument) into groups the length of size (second argument) 
// and returns them as a two-dimensional array.



