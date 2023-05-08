let currentStep = '';
let adventureData = {};
selectImage();
function selectImage(){

    const imageFiles = [
        "1",
        "2",
        "3",
        "4"
    ];

    // Select a random image from the list
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    console.log("Image", randomImage);
    document.getElementById("imageid").src= randomImage+".png";
}


// Helper function to show the dialog box
function showDialog(text, callback) {
    document.getElementById('dialog-text').innerText += '\n' + text;
    document.getElementById('dialog').style.display = 'block';
    // document.getElementById('dialog-btn').onclick = function() {
    //     document.getElementById('dialog').style.display = 'none';
    //     callback();
    // };
}

function endit() {
    showDialog('Congratulations, you have completed the adventure!');
    document.getElementById('option-A').style.display = 'none';
    document.getElementById('option-B').style.display = 'none';

}
// Helper function to display the current step
function displayStep(step) {
    if (step === 'end') {
        endit();
        showDecisionTree()
    }
	currentStep = step;
	const stepData = adventureData[step];
    console.log("Test3", step);
    //console.log("Test2",  stepData.options[Object.keys(stepData.options)[0]]);

	document.getElementById('story-text').innerText = stepData.text;
	document.getElementById('option-A').innerText = stepData.options[Object.keys(stepData.options)[0]].text;
	document.getElementById('option-B').innerText =stepData.options[Object.keys(stepData.options)[1]].text;
}

// Start the game
document.getElementById('start-btn').addEventListener('click', function() {
    document.getElementById('option-A').style.display = 'inline-block';
    document.getElementById('option-B').style.display = 'inline-block';
    document.getElementById('dialog-text').innerText = "";
    document.getElementById("imageid").style.display = "none";

	// Load the adventure data
	fetch('formatted_adventure.json')
		.then(response => response.json())
		.then(data => {
			adventureData = data;
			displayStep('step1');
		});
});

// Handle option A click
document.getElementById('option-A').addEventListener('click', function() {
    console.log("Test: ", currentStep);
	const stepData = adventureData[currentStep];
	const nextStep = stepData.options[Object.keys(stepData.options)[0]].nextStep;
	displayStep(nextStep);
	showDialog(stepData.options[Object.keys(stepData.options)[0]].text, function() {
	    if (nextStep === 'end') {
	        endit();
            showDecisionTree()
	    }
	});
});

// Handle option B click
document.getElementById('option-B').addEventListener('click', function() {
	const stepData = adventureData[currentStep];
	const nextStep = stepData.options[Object.keys(stepData.options)[1]].nextStep;
	displayStep(nextStep);
	showDialog(stepData.options[Object.keys(stepData.options)[1]].text, function() {
	    if (nextStep === 'end') {
	        endit();
            showDecisionTree()
	    }
	});
});
