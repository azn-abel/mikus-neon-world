var audioCtx;
var analyser;
var audioElement;
var sum1 = 0;
var sum2 = 0;
var sum3 = 0;

// const wrapper = () => {
//     initializeAudio(audioElement);
// }

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
            
            console.log(sum1);  
            console.log(sum2);            
            console.log(sum3);            
        }
        x++;

        analyser.getByteFrequencyData(dataArray);
        sum1 = calculateSum(dataArray.slice(0,200));
        sum2 = calculateSum(dataArray.slice(200,500));
        sum3 = calculateSum(dataArray.slice(500,1024)); 

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

                document.addEventListener("click", initializeAudio);

                // Disconnect the observer since we no longer need it
                // observer.disconnect();
                return;
            }
        }
    });
});
  
// Start observing changes to the document

observer.observe(document, { childList: true, subtree: true });

function calculateSum(arr) {
    var s = 0;
    for (var i = 0; i < arr.length; i++) {
        s += arr[i];
    }
    return s;
}
  


