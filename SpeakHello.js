(function (window) {
    let speakWord = "Hello";
    let helloGreeter = {};
    helloGreeter.speak = function (name) {
        console.log(speakWord + " " + name);
    };
    window.helloGreeter = helloGreeter;
})(window);