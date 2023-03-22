// Listen for text selection events
document.addEventListener("selectionchange", function() {
  var selection = window.getSelection().toString();
  // Send selected text to background service worker for processing
  chrome.runtime.sendMessage({type: "textSelection", text: selection});
});

// Listen for "N" key press
document.addEventListener("keydown", function(event) {
  if (event.key === "n") {
    // Send message to background service worker to open popup
    chrome.runtime.sendMessage({type: "openPopup"});
  }
});

// Listen for "Nubio" voice command
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  if (request === "Nubio") {
    // Send message to background service worker to open popup
    chrome.runtime.sendMessage({type: "openPopup"});
    sendResponse(true);
  }
});
