window.onload = () => {
    const api = 'https://api.quotable.io/random';

    function getsentence() {
        // var text = document.querySelector("#mysentence");
        return fetch(api).then(res => res.json()).then(data => data.content);
    }
    async function newSentence() {
        const sentence = await getsentence();
        console.log(sentence)
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