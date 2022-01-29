document.addEventListener("DOMContentLoaded", function(event) {

  const wordElement = document.getElementById("word");
  const definitionElement = document.getElementById("definition")
  
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "getPalavra"}, (palavra) => {
  
      if(typeof palavra == "undefined") {
        // That's kind of bad
        if(chrome.runtime.lastError) {
          // We couldn't talk to the content script, probably it's not there
        }
      } else {
        const dStyle = document.querySelector('style');
  
        if (palavra.trim() != "" && palavra.trim().split(" ").length == 1){
          wordElement.textContent = `${palavra}`;
          
          const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`;
          definitionElement.textContent = "Loading...";
  
          fetch(url).then(function(response) {
            return response.json();
          }).then(function(data) {
  
            if (data.title == "No Definitions Found"){
              definitionElement.textContent = "No Definitions Found";
            } else {

              const meanings = data[0].meanings;
              
              const definition = data[0].meanings[0].definitions[0].definition;
              definitionElement.textContent = definition;
  
            }
  
          }).catch(function(err) {
            console.log(err);
          });
  
          dStyle.innerHTML = `
            h2 {font-size: 25px;}
  
          `;
  
        } else {
          wordElement.textContent = 'Select a single word on the webpage.';
          dStyle.innerHTML = `
            h2 {font-size: 16px;}
          `;
        }
      }
    });
  });

});
