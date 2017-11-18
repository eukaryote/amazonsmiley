const TARGET_URL_REGEX = new RegExp("^https?://(www\.)?amazon\.(com|co\.uk|de)/?(?!ap/signin$)");

function beforeRequest(requestDetails) {
  if (requestDetails.type === 'main_frame' && requestDetails.method === 'GET') {
    const newUrl = requestDetails.url.replace(TARGET_URL_REGEX, "https://smile.amazon.$2/");
    if (newUrl !== requestDetails.url) {
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
