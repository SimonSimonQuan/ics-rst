function randInt(min, max) {                                                                                //random number generator helps pick word
    return Math.floor(Math.random() * (max - min + 1)) + min;                                               //returns the number
}
function user_guess() {                                                                         //picks a random word as the answer
    let list = ["Tiger", "Coach", "Equal", "Fraud", "field", "mayor", "third", "worth", "might", "unity", "waste", "quick", "rural", "rival", "meant", "input", "earth", "night", "dozen", "guard", "juicy", "dizzy", "jazzy", "music", "piano", "habit", "kabab", "label", "macaw", "oasis", "vague", "yacht", "clone", "prove", "spice", "mercy", "saucy", "eagle", "aisle", "ounce", "outro", "actor", "apply", "bride", "bloom", "blush", "candy", "chair", "check", "clamp", "clean", "clerk", "cloud", "dance", "flame", "flick", "flock", "force", "fresh", "grasp", "grind", "grape", "grief", "haste", "hitch", "hover", "jolly", "joint", "latch", "liver", "lemon", "lunar", "lapse", "lolly", "melon", "mocha", "march", "molar", "mount", "noble", "ocean", "piano", "plaza", "proud", "pulse", "quake", "quick", "quiet", "rival", "roast", "sharp", "sheer", "swoop", "shook", "stare", "straw", "spike", "stone", "style", "stung", "taste", "tiger", "tired", "vivid", "vapor", "vocal", "vowel", "waste", "wrist", "widen", "whisk", "wager", "water", "weary", "worse", "yield", "youth", "zesty", "angel", "bingo", "blaze", "blink", "blink", "brace", "candy", "clamp", "creek", "drift", "eager", "elite", "frown", "grate", "gloom", "happy", "lapse", "lemon", "latch", "liven", "moist", "mirth", "nudge", "oiled", "plumb", "prone", "roast", "spine", "tiger", "toast", "wager", "wrist"]
    let word = list[randInt(1, list.length)];                       //picks a word from the list and sets it as the answer
    return word;
}
var answer = user_guess().toUpperCase(); //makes the answer uppercase just so everything is uppercase
var guess_number = 1; //keeps track of guess number so words are shown in the right row
var timeout = 0;        //weird way to make the invalid word text spam proof
var letterNumber = 0;                   //keeps track of which box in the row is being changed


function enter() {
    let dc1 = 0;            //these keep track of duplicate letters and how many are left in the word GOD THIS WAS SUC A PAIN 
    let dc2 = 0;
    let duplicateCharacter1 = '';           //keeps track of which letters are duplicated in the guess
    let duplicateCharacter2 = '';
    document.getElementById("msg").innerText = "";               //just a message to tell u if a word is not actually a word
    let word = "";              //this represents what the user guessed
    for (let index = 1; index <= 5; index++) {
        let box = document.querySelector(`body > center:nth-child(4) > table.table > tbody > tr:nth-child(${guess_number}) > td:nth-child(${index})`);   //finds which box to change based on guessnumber(row) and letter placement(column)
        word += box.innerText;                  //makes the word
    }

    console.log(word);              //shows word to console for debugging
    let remainingLetters = word;        //represents the remaining letterss ESSENTIAL FOR THE DUPLICATEE LETTERS CHECK
    if (httpGet(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).includes("No Definitions Found") && answer != word) {         //searches free dictionary api if valid word
        document.getElementById("msg").innerText = "invalid word u donut";                      //guys why cant u spell the word adieu 
        timeout++;                      //spam proof text
        setTimeout(() => {             //spam proof text
            timeout--;             //spam proof text
        }, 900);             //spam proof text
        setTimeout(() => {             //spam proof text
            if (timeout == 0) {             //spam proof text
                document.getElementById("msg").innerText = "";             //spam proof text
            }             //spam proof text
        }, 1000);             //spam proof text
        return;             //stops from entering word (BECAUSE THE ENTERED WORD ISNT A REAL WORD)
    }
    for (let index = 1; index <= 5; index++) {                              //for each letter checks to see if it should be green yellow or grey
        remainingLetters = word.slice(index);                            //updates remaining letters not including current letter
        console.log("remaining letters: " + remainingLetters);               //for debugging
        let box = document.querySelector(`body > center:nth-child(4) > table.table > tbody > tr:nth-child(${guess_number}) > td:nth-child(${index})`);   //finds which box to change based on guessnumber(row) and letter placement(column)
        box.style.color = "white";                                       //makes text white
        if (charCount(box.innerText, word) > 1) {                          //for duplicate letters
            if (duplicateCharacter1 == '') {                                                                //saves what letters are duplicated and how many
                duplicateCharacter1 = box.innerText;                             //stores the duplicate letter
                dc1 = charCount(box.innerText, answer);                          //stores the amoun of duplicate
            } else if (duplicateCharacter1 != box.innerText && duplicateCharacter2 == "") {                 //i used 2 different variables fro this because the most amount of different duplicate letters in a 5 letter wor is only 2
                duplicateCharacter2 = box.innerText;
                dc2 = charCount(box.innerText, answer);
            }
            if (duplicateCharacter1 == box.innerText) {                     //i guess this is inefficient but i just copy pasted the code for each pair incase there are 2 pairs (or a pair and a triplet) of letters
                box.style.backgroundColor = "#cacaca";                           //automatically makes the background grey, but will be updated to yelow or green if need be
                keyboard(box.innerText, "#cacaca");                                  //also updates keyboard
                if (answer[index - 1] == box.innerText) {                         //check if it is in the right place
                    box.style.backgroundColor = "#58a351";                  //make it green
                    keyboard(box.innerText, "#58a351");
                    dc1--;                                                   //subtracts the number of duplicate letters used THIS IS SO IF THE ANSWER IS "ABCDE" AND I ENTEER "AAAAA" ITS NOT JUST ONE GREEN A AND FOUR YELLOWS, THE NUMBER OF COLOURED LETTERS REFLECT THE NUMBER OF LETTERS ACUALLY IN THE wORD SO LIKE IF ThERE ARE 2 T'S IN A WORD THERE WILL MAXIMUM BE TWO T'S THAT ARE COLOURED  EG  ONE GREEN ONE YELLOW, IF THERe ARE EXTRAS THEy WILL BE GRAY. GOD THIS WAS SO ANNOYING AND I WANT TO DIW

                }
                else if (answer.includes(box.innerText)) {                  //check if it is right letter wrong place
                    if (charCount(box.innerText, remainingLetters) < dc1) {
                        box.style.backgroundColor = "#c9b458";                   //make it yellow
                        keyboard(box.innerText, "#c9b458");
                        dc1--;

                    }
                }
            } else if (duplicateCharacter2 == box.innerText) {
                box.style.backgroundColor = "#cacaca";
                keyboard(box.innerText, "#cacaca");
                if (answer[index - 1] == box.innerText) {                         //check if it is in the right place
                    box.style.backgroundColor = "#58a351";                  //make it green
                    keyboard(box.innerText, "#58a351");
                    dc2--;

                } else if (answer.includes(box.innerText)) {                  //check if it is right letter wrong place
                    if (charCount(box.innerText, remainingLetters) < dc2) {
                        box.style.backgroundColor = "#c9b458";                   //make it yellow
                        keyboard(box.innerText, "#c9b458");
                        dc2--;

                    }
                }
            }
        } else if (answer[index - 1] == box.innerText) {                         //check if it is in the right place
            box.style.backgroundColor = "#58a351";                  //make it green
            keyboard(box.innerText, "#58a351");
        } else if (answer.includes(box.innerText)) {                  //check if it is right letter wrong place
            box.style.backgroundColor = "#c9b458";                   //make it yellow
            keyboard(box.innerText, "#c9b458");

        } else {
            box.style.backgroundColor = "#cacaca"
            keyboard(box.innerText, "#cacaca");
        }

    }
    guess_number++;                                 //adds one to guess number, making it go to the next row
    letterNumber = 0;                                           //go to the first box
    document.getElementById("input").value = "";                    //set the input box to nothing again
    if (answer == word) {                                               //check if you win
        document.getElementById("msg").innerText = "yay you win";                                   //if it is right you win
        guess_number = 7;                                         //to stop from playing after win
    } else if (guess_number == 7) {
        document.getElementById("msg").innerText = "the answer was " + answer;      //tells u answer when u lose
    }
}


function keyPressed(event) {                //tells when a key is pressed in the inuput
    let key = event.key.toUpperCase();          //make it UPPERCASE
    actualKeyPress(key);                        //go to the actual key press handler (it will say what to do)
}
setInterval(() => {                                 //people keep complaining about having to selcect the text box so this SELECTS IT FOR YOU! LIFE HAS NEVER BEEN SO EASY
    document.querySelector("#input").select()
}, 200);
function actualKeyPress(key) {                  //does stuff when a key is entered whether thru text or virtual keyboard
    
    setTimeout(() => {                              //set input text box to nothing
        document.getElementById("input").value = "";                    //set the input box to nothing again
    }, 10);
    if (guess_number > 6) {                 //NO MORE GUESSES FOR U
        return;
    }
    if (key == "ENTER") {                                                                       //enter
        if (letterNumber == 5) {                        //if all the letters are filled out you can check it
            enter();
            return;
        }
    } else if (key == "BACKSPACE") {                //backspace
        if (letterNumber > 0) {                     //check if theres actually something to delete
            let box = document.querySelector(`body > center:nth-child(4) > table.table > tbody > tr:nth-child(${guess_number}) > td:nth-child(${letterNumber})`);   //finds which box to change based on guessnumber(row) and letter placement(column)
            box.innerText = " ";                                                                  //deletes a space
            letterNumber--;                                                                            //goes back a space
        }
    } else if (letterNumber < 5 && "QWERTYUIOPASDFGHJKLZXCVBNM".includes(key)) {       //make sure its a letter
        letterNumber++;             //essentially moves to the nect box
        let box = document.querySelector(`body > center:nth-child(4) > table.table > tbody > tr:nth-child(${guess_number}) > td:nth-child(${letterNumber})`);   //finds which box to change based on guessnumber(row) and letter placement(column)
        console.log(guess_number, letterNumber, key);           //for debugging but shows what key was pressed, and which row and box
        box.innerText = key;                                    //put the letter in the box
    }
}

function keyboard(letter, colour) {                   //make virtual keyboard change to show what letters have been picked
    let box = document.getElementById(letter);          //represent big words with small words
    box.style.color = "white";              //make text white
    if (box.style.backgroundColor != 'rgb(88, 163, 81)') {                           //if its green it stays green
        box.style.backgroundColor = colour;                                          //but if its yellow it can become green
    }
}




function httpGet(theUrl)          //checks url dictionalry
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}



const move = document.getElementById("move");       //the CURSOR

document.body.onpointermove = event => {        //everytime mouse move
    const { clientX, clientY } = event;             //get mouse x and y

    move.animate({
        left: `${clientX}px`,                   //go there
        top: `${clientY}px`             //go there

    }, { duration: 300, fill: "forwards" });

}


function charCount(letter, word) {                  //counts number of a certain character in the word useful for duplicate letters
    let count = 0;  
    for (let index = 0; index < 5; index++) {
        if (word[index] == letter) {
            count++;
        }
    }
    console.log(count, letter, word);           //prints to console to debug
    return count;
}





//  ⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠴⠶⠛⠛⠛⠶⠶⢦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⣿⢋⢹⣿⣄⢹⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣄⣠⣴⣆⣠⣶⣀⣀⢠⡀⠈⠉⠳⢦⣀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⣽⣧⡎⢹⣿⣧⢹⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⠿⠿⠿⠿⠻⠿⣿⣯⣿⡔⣦⡄⠀⠙⢧⡀⠀⠀
//  ⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⡜⠿⣿⣆⢻⣟⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⣝⢦⣀⠈⢻⡄⠀
//  ⠀⠀⠀⣠⣾⣿⡯⠑⠀⠉⠁⠂⠀⠁⠸⢏⡿⣽⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣌⠣⠀⢿⡄
//  ⠀⠀⢰⣟⠇⣼⣶⣄⣀⡤⠖⠠⠉⠘⡐⠬⣸⢹⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣎⡗⡠⡜⣇
//  ⢀⣴⠟⢁⣠⣿⣿⠟⠋⠀⠠⢀⠁⠒⢀⠒⣥⣫⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⣜⠡⠇⣿
//  ⣿⣇⡀⣿⠃⠀⠄⠀⠀⢀⠀⢀⠘⢠⠘⣼⡼⠟⢿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡧⣜⠣⢸⣿
//  ⣿⠃⠀⠀⠀⡁⠂⠄⢡⢀⠢⢄⡊⢴⡿⠛⢀⣴⡿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⡿⣱⠻⢃⣾⠇
//  ⠹⣦⣄⣤⣴⠿⣎⡜⣢⢎⣱⣶⠿⠋⢁⡴⢿⡳⣽⣹⡿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣿⢫⡗⣧⢓⣼⠏⠀
//  ⠀⠙⢿⣥⣶⣾⣷⣿⣷⣾⠟⠁⠀⠰⠋⠁⠮⠑⠂⠓⠀⠛⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣠⣤⣤⣤⣤⣶⣶⣶⣶⣶⣶⣶⣾⡿⣏⠿⣜⡣⠚⣡⣾⠋⠀⠀
//  ⠀⠀⠀⠈⠉⠹⣿⡧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣷⣿⣶⣤⣀⣀⣀⣀⣀⣀⣤⣤⣴⣶⣿⢿⣟⡿⣫⢯⣟⣻⡽⣳⢯⣻⣭⣟⣿⣻⢿⣿⣭⢛⣥⣳⡿⠟⠁⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⢻⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠻⣜⣳⢯⣿⣿⢿⣻⣿⢿⡿⣟⣯⢿⣱⢯⣟⢾⡹⣽⢻⣎⢷⣹⢏⣯⢳⡞⡿⣖⢯⢻⡼⣷⣿⡾⠋⠁⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠈⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠇⠑⢨⡟⣽⠲⣏⣿⢳⣭⢯⣽⣻⡜⢯⠳⣏⡾⢣⢻⣜⠿⣘⢮⡳⣏⢮⢳⣝⡳⡹⢎⡳⢭⣻⣿⣇⠀⠀⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⠏⠀⠀⢰⠏⢆⠹⡜⣾⠳⡘⢎⠶⣽⠘⣃⠻⣜⡱⢉⠶⣹⠚⡄⣣⠝⢢⢎⢣⠧⠱⡙⢬⣱⢯⡟⣿⣿⡄⠀⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣏⠀⠀⠀⡹⠊⠀⠀⢼⣣⠃⠈⡌⢻⡬⠑⠠⠑⣎⠱⢈⠺⡅⠒⡨⢅⡫⡐⢌⠦⢃⠱⡈⢖⡡⢎⡽⣯⣿⣷⠀⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⠸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢃⠀⠀⠀⠵⠁⠀⠈⠲⣍⠂⠀⠀⠓⡌⠀⠀⠰⠠⠁⠀⠳⠄⠀⠑⢎⠰⠁⡌⡘⡀⢢⢑⠮⡗⢯⢻⡽⣿⣿⠀⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠎⠀⠀⠀⠐⡄⠀⠀⠀⠈⠐⠀⠀⠀⠀⠀⠀⠁⠀⠀⠈⠄⢂⠡⠐⠁⠀⠀⠈⡐⢌⣣⣧⣿⣿⣿⠀⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⠀⢿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⣠⣐⠧⠛⠭⠻⣜⢷⣿⣿⠀⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⣠⠴⣹⣞⣿⣿⠀⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠀⠀⠀⠀⠀⠈⠉⠁⠉⠓⡽⣿⢿⡄⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣤⠀⡀⠀⠀⠀⠀⠀⠀⠀⢹⣦⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⢀⠠⢤⡰⣄⢦⡸⣽⢶⡀⠀⠀⠀⠀⠀⠀⢤⣙⣼⣻⣿⡇⠀⠀⠀⠀⠀
//  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣦⡁⠀⠀⠀⠀⠀⠀⠀⢸⣿⣣⣛⡴⣉⢦⡱⣌⡶⣱⣲⢦⣳⣽⣞⣷⣯⣿⣷⣿⣾⣿⣿⣿⣷⣻⢦⣄⠀⡀⠀⠀⠀⠉⠀⣩⢿⣳⡀⠀⠀⠀⠀
//   ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣷⠀⠀⠀⠀⠀⠀⣤⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠛⠛⠛⠛⠋⠙⣿⣿⣿⣿⣿⣿⣿⣮⣷⡜⣤⢠⠀⠀⠀⠛⣾⣯⣷⡄⠀⠀⠀
//   ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡇⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⠿⠟⠛⠛⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣷⣷⡭⣆⠣⢆⡀⠀⠀⠈⠻⣽⣦⡀⠀
//    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⡿⠛⠿⣿⣽⣢⣜⣁⡀⠀⠀⠰⠉⣿⡀
//     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⢸⣿⡿⠽⠾⣽⣻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣟⢿⣻⢿⣇⡿⠀⠀⠀⠉⠛⠿⣷⣯⡄⠀⠀⠀⢹⡇
//    ⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⣸⠃⠀⠀⢀⣿⣿⡗⢩⠓⡼⣹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⢊⠣⢜⣻⣼⠇⠀⠀⠀⠀⠀⠀⠀⢹⣷⠀⠀⠀⢘⡇
//    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠀⠀⠀⣸⣿⠏⣿⡀⠒⠠⢻⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠏⠀⠐⢢⣿⠟⠀⠀⠀⠀⠀⠀⠀⢀⣸⡯⠀⠀⠀⢸⡇
//  ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⡴⠟⠁⠀⠀⢀⣿⣯⣦⣼⠷⠀⠀⢙⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡶⠶⠞⠋⠀⠀⠀⣼⡏⠀⠀⠀⠀⠀⠀⣠⣴⢾⡿⠃⠀⠀⠀⣼⡇
//  ⠀⠀⠀⠀⠀⠀⠀⢰⡏⠁⠀⠀⠀⠀⠀⢀⣾⣿⡟⡆⠀⠀⠐⠀⣸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡀⠀⠀⠀⠀⠀⣼⠟⠀⠀⠀⠀⠀⠀⢸⣏⠀⠀⠀⠀⠀⠀⢠⣿⠁
// ⠀⠀⠀⠀⠀⠀⠀⢘⡷⢦⣤⣤⣴⣶⣿⠿⢻⣿⣿⡷⠶⠶⠾⠿⠟⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠒⠒⠲⠒⠟⠋⠀⠀⠀⠀⠀⠀⠀⠈⡿⠷⠶⠤⢤⣴⣶⢿⢃⠀
