var audio = new Audio('To_live.mp3');
var audioCtx;
var analyser;
var audioElement;
var dataArray;
var sum = 0;

const wrapper = () => {
    initializeAudio(audioElement);
}

const initializeAudio = () => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    handleAudioElement(audioElement);
    try {
        document.removeEventListener('click', initializeAudio);
    } catch {

    }
}
 
const handleAudioElement = (audioElement) => { 
    console.log(audioElement); 
    audioElement.src = 'audio/' + currentIdx + '.mp3';
    // Connect the audio element to the analyser node
    var source = audioCtx.createMediaElementSource(audioElement);
    console.log(audioCtx.sampleRate);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    // Set the FFT size (frequency bin count)
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    // Function to update frequency data
    var x = 0;
    function updateFrequencyData() {
        if (x % 100 == 0) {
            // console.log(JSON.stringify(dataArray));
            console.log(sum);              
        }
        x++;

        analyser.getByteFrequencyData(dataArray);
        sum = calculateSum(dataArray);

        // Process the frequency data
        // Here, you can access the frequency data in the dataArray
        // Each index in the array represents a specific frequency bin
        requestAnimationFrame(updateFrequencyData);
    }

    // Start updating frequency data
    updateFrequencyData();
}

// Create a mutation observer
var observer = new MutationObserver(function(mutationsList) {
    // Check each mutation for added nodes
    mutationsList.forEach(function(mutation) {
        var addedNodes = mutation.addedNodes;
    
        // Check if any of the added nodes are <audio> elements
        for (var i = 0; i < addedNodes.length; i++) {
            if (addedNodes[i].nodeName === 'AUDIO') {
                audioElement = addedNodes[i];

                document.addEventListener("click", initializeAudio());

                // Disconnect the observer since we no longer need it
                // observer.disconnect();
                return;
            }
        }
    });
});
  
  // Start observing changes to the document
function observe() {
    observer.observe(document, { childList: true, subtree: true });
    try {
        document.removeEventListener('click', observe);
    } catch {

    }
}
// observer.observe(document, { childList: true, subtree: true });

document.addEventListener('click', observe);

function calculateSum(arr) {
    var s = 0;
    for (var i = 0; i < arr.length; i++) {
        s += arr[i];
    }
    return s;
}
  

