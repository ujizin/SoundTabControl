chrome.tabs.onActivated.addListener((currentTab) => {
    
    chrome.tabs.executeScript(currentTab.tabId, { 
        code: "document.querySelectorAll('audio, video')[0].volume;" 
    }, (volume) => {
        var realVolume = Math.round(volume * 100)
        chrome.storage.local.set({'volume': realVolume}, () => {})
    })
});

