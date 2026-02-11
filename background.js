let activeTabId = null;

// Track focused/active tab
chrome.tabs.onActivated.addListener(activeInfo => {
    activeTabId = activeInfo.tabId;
});

chrome.windows.onFocusChanged.addListener(windowId => {
    chrome.tabs.query({ active: true, windowId: windowId }, tabs => {
        if (tabs.length) activeTabId = tabs[0].id;
    });
});

// Respond to content script checking tab focus
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "checkFocus") {
        sendResponse({ isFocused: sender.tab?.id === activeTabId });
    }
});
