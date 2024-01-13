var translucentDiv = document.createElement("div");

// Style the div to be translucent and positioned absolutely
translucentDiv.style.position = "absolute";
translucentDiv.style.width = "50px"; // Adjust width as needed
translucentDiv.style.height = "50px"; // Adjust height as needed
translucentDiv.style.backgroundColor = "rgba(255, 0, 0, 0.3)"; // Red color with 50% opacity
translucentDiv.style.borderRadius = "50%"; // Add rounded corners if desired
translucentDiv.style.zIndex = "9999";
translucentDiv.style.transition = "400ms";

document.addEventListener("click", function (e) {
  chrome.runtime.sendMessage({ action: "takeScreenshot" });
  // Send a message to the background script requesting a screenshot
  console.log("sending message now");
  // Create a new div element
  // Set the position of the div at the mouse coordinates\
  //this works but its too fucking slow
  translucentDiv.style.display = "block";
  translucentDiv.style.left = e.clientX + "px";
  translucentDiv.style.top = e.clientY + "px";

  // Append the div to the document body
  document.body.appendChild(translucentDiv);

  // Optional: You may want to remove the div after a certain duration or on some other event
  setTimeout(function () {
    translucentDiv.style.display = "none";
  }, 2000); // Remove the div after 3 seconds (adjust as needed)
});
