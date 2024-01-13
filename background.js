chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  if (prevState === "OFF") {
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: "ON",
    });
    const response = await chrome.tabs.sendMessage(tab.id, {
      state: "ON",
    });
  } else {
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: "OFF",
    });
    const response = await chrome.tabs.sendMessage(tab.id, {
      state: "OFF",
    });
  }
});
//this is just bait cos we just need the user to click on our badge
//I wonder if this turns off when we swap tabs (if it doesn't, it should)

// Listen for messages from content script
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "takeScreenshot") {
    console.log("message received. taking screenshot now");
    chrome.tabs.captureVisibleTab({ format: "png" }, function (dataUrl) {
      // Handle the screenshot dataUrl as needed
      //this is weird because it only works when the user clicks on the icon first
      //very hard to crop via chrome api unlike mozilla, we can use canvases but that seems abit dumb also
      //there is no cursor, i added a translucent div in the backend
      console.log(dataUrl);
      sendResponse({ screenshot: "taken" });
    });
  }
});
