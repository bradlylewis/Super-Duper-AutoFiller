document.getElementById("fillForm").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"]
      });
  });
});

document.getElementById("settings").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});
