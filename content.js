function getSelectedText() {
  let selectedText = '';

  if (window.getSelection) {
    selectedText = window.getSelection().toString();
  };

  return selectedText;
};

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch(message.type) {
      case "getPalavra":
        sendResponse(getSelectedText());
        break;
      default:
        console.error("Unrecognised message: ", message);
    }
  }
);