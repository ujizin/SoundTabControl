const $control = document.querySelector('#control');
const $spanVolume = document.querySelector('#span_control');

chrome.storage.local.get('volume', (result) => {
    if(result.volume) {
        $control.value = result.volume;
        $spanVolume.textContent = result.volume;    
    }
})

const onChangeVolume = (volume = 1.0) => {
    chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        function(tabs) {
            const { id: tabId } = tabs[0];
            const code = `document.querySelectorAll('audio, video').forEach(e => e.volume = ${volume});`
            chrome.tabs.executeScript(tabId, { code }, (result) => {
                realVolume = Math.round(volume * 100)
                chrome.storage.local.set({'volume': realVolume}, () => {})
                $spanVolume.textContent = realVolume
            })
    })  
}

$control.addEventListener('change', e => onChangeVolume($control.value / 100))