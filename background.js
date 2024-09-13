chrome.storage.local.get(["Enabled"]).then((result) => {
    if (result.Enabled === undefined || result.Enabled === true) {
        var prompt = "Disable";
    } else {
        var prompt = "Enable";
    }

    chrome.contextMenus.removeAll(function() {
        chrome.contextMenus.create({
            id: "1",
            title: prompt,
            contexts: ["all"],
            documentUrlPatterns: ["https://x.com/*"]
        });
    })
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    (async () => {
        const response = await chrome.tabs.sendMessage(tab.id, {message: "Enable"});
        chrome.contextMenus.update("1", {title: response});
      })();
})