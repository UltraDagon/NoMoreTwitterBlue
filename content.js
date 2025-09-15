var enabled;
var excluding = false;
let exclusions = [];

function isExcluded(account_name) {
    return (exclusions.includes(account_name));
}

chrome.storage.local.get(["Enabled"]).then((result) => {
    if (result.Enabled === undefined) {
        enabled = true;
    } else {
        enabled = result.Enabled;
    }
});

chrome.storage.local.get(["Exclusions"]).then((result) => {
    if (result.Exclusions === undefined) {
        exclusions = [];
    } else {
        exclusions = result.Exclusions;
    }
    //console.log("Exclusions:")
    //console.log(exclusions)
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == "Enable") {
            //console.log(enabled);

            enabled = !enabled;

            if (enabled) {
                sendResponse("Disable");
            } else {
                sendResponse("Enable");
            }

            chrome.storage.local.set({ "Enabled": enabled });
        }
});


// ADD FUNCTION WHERE WHEN YOU CLICK THE SHARE BUTTON ON A TWEET IT REPLACES
// SHARE POST VIA WITH COPY FXTWITTER LINK


// https://x.com/neddieofficial/status/1865500709304532992

window.onwheel = e => {
    if (enabled && e.deltaY >= 0) { // Only delete posts while scrolling down.
        var nodeArray = document.querySelectorAll('svg[aria-label="Verified account"]');
        for (let i = 0; i < nodeArray.length; i++) {
            var remove = true;
            node = nodeArray[i];

            if (node !== null) {
                for (let k = 0; k < 18; k++)
                {
                    node = node.parentNode;
                    //console.log(k);
                    //console.log(node);
                    if (((k === 0 || k === 10) && node.nodeName === "BUTTON") ||
                        (k === 3 && (node.nodeName === "DIV" || isExcluded(String(node.href).slice(14))))) {
                        remove = false; break;
                    }
                    //console.log(String(node.href).slice(14));
                    //console.log(isExcluded(String(node.href).slice(14)))
                }
                if (remove)
                { 
                    node.parentNode.removeChild(node);
                    //node.style.backgroundColor = "red";
                    //console.log("remove^")
                }
                //console.log("----------");
            }
        }
    }
}