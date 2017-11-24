/**
 * Background javascript, which runs once upon extension load and has access
 * to a background page that FF will autogenerate (since we don't supply one).
 *
 * We just register an onBeforeRequest listener that checks the URL to be
 * loaded and redirects to the smile equivalent if needed.
 */

 (function(browser) {

  /* Base regex (scheme plus hostname) for URLs to be checked. */
  const BASE_URL = "https?://(www\\.)?amazon\.(com|co\\.uk|de)";

  /* Path (regex strings) that should not trigger a smile redirect. */
  const EXCLUSIONS = [
    '/ap/signin',
    '/exec/obidos/account-access-login',
    '/exec/obidos/change-style',
    '/exec/obidos/dt/assoc/handle-buy-box',
    '/exec/obidos/flex-sign-in',
    '/exec/obidos/handle-buy-box',
    '/exec/obidos/refer-a-friend-login',
    '/exec/obidos/subst/associates/join',
    '/exec/obidos/subst/marketplace/sell-your-stuff\\.html',
    '/forum/kindle',
    '/gp/[^/]+/settings',
    '/gp/aag',
    '/gp/aw/so\\.html',
    '/gp/aw/sp\\.html',
    '/gp/customer-reviews/write-a-review\\.html',
    '/gp/flex/sign-out\\.html',
    '/gp/navigation-country',
    '/gp/navigation/redirector\\.html',
    '/gp/rate-it',
    '/gp/redirect\\.html',
    '/gp/rentallist',
    '/gp/sign-in',
    '/gp/socialmedia/giveaways',
    '/gp/switch-language',
    '/gp/video/library',
    '/gp/video/watchlist',
    '/gp/wishlist/universal',
    '/gp/yourstore',
    '/local/ajax/',
    '/wishlist/get-button',
    '/wishlist/universal'
  ];

  /* Regex object for full URL, with negative lookaheads for exclusions. */
  const SMILE_URL_REGEX = new RegExp(BASE_URL + EXCLUSIONS.map(str => '(?!' + str + ')').join(''));

  /* Request ID of last request we redirected for, used to avoid redirect loops. */
  let lastRequestId;

  function beforeRequest(requestDetails) {
    const currentUrl = requestDetails.url,
          currentRequestId = requestDetails.requestId;

    // console.debug('1', {currentRequestId: currentRequestId, lastRequestId: lastRequestId, currentUrl: currentUrl});
    if (currentRequestId !== lastRequestId) {
      const newUrl = currentUrl.replace(SMILE_URL_REGEX, "https://smile.amazon.$2");
    //   console.debug('2', {newUrl: newUrl, currentUrl: currentUrl, equal: newUrl === currentUrl});
      if (newUrl !== currentUrl) {
          lastRequestId = currentRequestId;
        //   console.debug('3', {redirectUrl: newUrl});
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

 } (browser));
