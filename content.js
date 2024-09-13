var enabled;
let exclusions = [];
exclusions[exclusions.length] = "LeagueOfLegends"; //

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
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == "Enable") {
            console.log(enabled);

            enabled = !enabled;

            if (enabled) {
                sendResponse("Disable");
            } else {
                sendResponse("Enable");
            }

            chrome.storage.local.set({ "Enabled": enabled });
        }
});

window.onwheel = e => {
    if (enabled && e.deltaY >= 0) { // Only delete posts while scrolling down.
        var nodeArray = document.querySelectorAll('svg[aria-label="Verified account"]');
        for (let i = 0; i < nodeArray.length; i++) {
        //for (let i = 0; i < 2; i++) {
            var remove = true;
            node = nodeArray[i];

            if (node !== null) {
                for (let k = 0; k < 18; k++)
                {
                    node = node.parentNode;
                    console.log(k);
                    console.log(node);
                    if (((k === 0 || k === 10) && node.nodeName === "BUTTON") ||
                        (k === 3 && (node.nodeName === "DIV" || isExcluded(String(node.href).slice(14))))) {
                        remove = false; break;
                    }
                    console.log(String(node.href).slice(14));
                    console.log(isExcluded(String(node.href).slice(14)))
                }
                if (remove)
                { 
                    //node.parentNode.removeChild(node);
                    node.style.backgroundColor = "red";
                    console.log("remove^")
                }
                console.log("----------");
            }
        }
    }
}