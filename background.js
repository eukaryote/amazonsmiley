/* Only the US, UK and German Amazon sites support Smile currently. */
const NON_SMILE_AMAZON = new RegExp("^https?://(www\.)?amazon\.(com|co\.uk|de)/?(?!ap/signin$)");

/* Track id of the last request we redirected for in order to avoid redirect loops. */
let lastRequestId;


function beforeRequest(requestDetails) {
  const currentUrl = requestDetails.url,
        currentRequestId = requestDetails.requestId;
  if (currentRequestId !== lastRequestId) {
      const newUrl = currentUrl.replace(NON_SMILE_AMAZON, "https://smile.amazon.$2/");
      if (newUrl !== currentUrl) {
          lastRequestId = currentRequestId;
          return {redirectUrl: newUrl};
      }
  }
}

browser.webRequest.onBeforeRequest.addListener(
  beforeRequest,
  {
    urls: [
      "*://amazon.com/*",
      "*://www.amazon.com/*",
      "*://amazon.co.uk/*",
      "*://www.amazon.co.uk/*",
      "*://amazon.de/*",
      "*://www.amazon.de/*"
    ],
    types: ["main_frame"]
  },
  ["blocking"]
);
