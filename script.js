window.onload = () => {
    const api = 'https://api.quotable.io/random';
    const Sen_to_display = document.getElementById("mysentence");
    const Result_declaration = document.getElementById("Result");

    const Sen_to_type = document.getElementById("TA") //this is what we are typing
    let count = 0;
    let done = true;
    let seconds = 0

    Sen_to_type.addEventListener('input', () => {
        //this function is for 
        //if anychanges is done in 
        //the text box
        timerClock();
        rearrive();
        const fullSentence = Sen_to_display.querySelectorAll('span')
        const eachLetter = Sen_to_type.value.split(''); //took everything and stored in an array

        fullSentence.forEach((charspan, index) => {

            const char = eachLetter[index]; //char is the letter which we have types

            if (char == null) {
                charspan.classList.remove("right");
                charspan.classList.remove("wrong");
                done = false

            } else if (char === charspan.innerText) {
                charspan.classList.add("right");
                charspan.classList.remove("wrong");
                done = true
            } else {
                charspan.classList.add("wrong");
                charspan.classList.remove("right");
                done = false
            }
        })

        if (done) {
            newSentence();
            clearInterval(intervalId);
            executed = false;
            over = false;
            min = seconds / 60
            WPM = count / min;
            document.querySelector('#time').innerHTML = "00:00"
            Result_declaration.innerHTML = "   ...........Wait Loading.................."
            setTimeout(() => {
                Result_declaration.classList.add("result_color")
                Result_declaration.innerHTML = "Your Speed was : " + Math.round(WPM) + " WPM" + "<br> Time taken : " + seconds + " secs";
            }, 3000)


        }

    })
    let over = false;

    function rearrive() {
        if (!over) {
            over = true;
            Result_declaration.innerHTML = "Calculating wpm....."
        }
    }
    let executed = false;
    var timerClock = (() => {
            if (!executed) {
                executed = true;
                start();
            }
        }) //this function is call the timer once

    function getsentence() {
        // var text = document.querySelector("#mysentence");
        return fetch(api).then(res => res.json()).then(data => data.content);
    }
    async function newSentence() {
        const sentence = await getsentence();
        CountWords(sentence);
        Sen_to_display.innerHTML = '';
        sentence.split('').forEach(element => {
            const charspan = document.createElement('span') //create a span for each element

            charspan.innerHTML = element //adds those characters in the span 
            Sen_to_display.appendChild(charspan); //appends by one child
        });
        Sen_to_type.value = null;
    }
    newSentence();
    //*******This function is used to count the number of words******** */

    function CountWords(str) {
        count = str.split(" ").length;
    }

    //***************************************************************** */
    //this is the counter
    const start = () => {
            var display;
            display = document.querySelector('#time') //getting the display


            Timer(0, display); //passing the function
        }
        //updating the value of timer to count it for calculation
    function updatetimer(time) {
        seconds = time;
    }
    let startTimer;

    function Timer(timer, display) {
        var min, sec;

        startTimer = new Date();
        intervalId = setInterval(() => {
            min = parseInt(timer / 60, 10); //converting the timer to int to convert in min
            sec = parseInt(timer % 60, 10); // converting the timer to secs to convert in secs
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            display.textContent = min + ":" + sec; //Changing the text content

            timer = getTime(); //incrementing the timer
            updatetimer(timer);

        }, 1000);


    }
    // start();
    function getTime() {
        return Math.floor((new Date() - startTimer) / 1000)
    }
}