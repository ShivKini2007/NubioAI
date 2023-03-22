// Create a new SpeechRecognition object
const recognition = new window.SpeechRecognition();

// Set properties of the recognition object
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "textSelection") {
    // Process selected text using your AI assistant and respond with answer
    var answer = myAIAssistant.processText(request.text);
    sendResponse({answer: answer});
  }
});

// Add a listener for the "speech" command
chrome.commands.onCommand.addListener(function(command) {
  if (command === "speech") {
    // Start listening for speech
    recognition.start();

    // When speech is recognized, send the text to the content script
    recognition.onresult = function(event) {
      const text = event.results[0][0].transcript;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "speechRecognition", text: text});
      });
    };

    // When speech recognition stops, stop the recognition object
    recognition.onend = function() {
      recognition.stop();
    };
  }
});
