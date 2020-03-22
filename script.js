window.onload = () => {
    const api = 'https://api.quotable.io/random';
    const Sen_to_display = document.getElementById("mysentence");
    const Sen_to_type = document.getElementById("TA") //this is what we are typing
    let done = true;
    const changes = document.addEventListener('input', () => {
        //this function is for 
        //if anychanges is done in 
        //the text box

        const fullSentence = Sen_to_display.querySelectorAll('span')
        const eachLetter = Sen_to_type.value.split(''); //took everything and stored in an array
        fullSentence.forEach((charspan, index) => {
            const char = eachLetter[index]; //char is the letter which we have types

            if (char === null) {
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

        if (done)
            newSentence();
    })

    function getsentence() {
        // var text = document.querySelector("#mysentence");
        return fetch(api).then(res => res.json()).then(data => data.content);
    }
    async function newSentence() {
        const sentence = await getsentence();

        Sen_to_display.innerHTML = '';
        sentence.split('').forEach(element => {
            const charspan = document.createElement('span') //create a span for each element

            charspan.innerHTML = element //adds those characters in the span 
            Sen_to_display.appendChild(charspan); //appends by one child
        });
        Sen_to_type.value = null;
    }
    newSentence();
    //this is the counter
    const start = () => {
        var display;
        display = document.querySelector('#time') //getting the display


        Timer(0, display); //passing the function
    }

    function Timer(timer, display) {
        var min, sec;
        setInterval(() => {
            min = parseInt(timer / 60, 10); //converting the timer to int to convert in min
            sec = parseInt(timer % 60, 10); // converting the timer to secs to convert in secs
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            display.textContent = min + ":" + sec; //Changing the text content
            timer++; //incrementing the timer
        }, 1000);


    }
    // start();
}