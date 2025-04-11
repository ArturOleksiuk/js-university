(function(){
    let names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
    for (let name of names) {
        if (name.charAt(0).toLowerCase() === "j") {
          byeSpeaker.speak(name);
        } else {
          helloGreeter.speak(name);
        }
    }
    console.log("\nAdditional selection based on name length:");
    const LENGTH_TRESHOLD = 5;
    for(let name of names){
        if (name.length > LENGTH_THRESHOLD) {
            console.log(`Long name detected: Hello ${name}`);
        } else {
            console.log(`Short name detected: Goodbye ${name}`);
        }
    }
})();
