Changelog
=========

Version 1.9
-----------

Added an icon. No code changes.


Version 1.8
-----------

Fix for Chrome, which doesn't allow a Promise to be returned from an
`onBeforeRequest` handler.


Version 1.7
-----------

Updated description. No code changes.


Version 1.6
-----------

Added a configuration option to support not redirecting to Smile in
a Private/Incognito-mode window or tab.


Version 1.5
-----------

Works with Chrome now (as well as Firefox).


Version 1.4
-----------

Avoid redirecting for special Amazon URLs that don't handle the smile redirect nicely.


Version 1.3
-----------

Don't redirect if we just did a redirect for the current request,
because it's probably Amazon sending a non-logged in user away
from Smile.


Version 1.2
-----------

Removed seemingly unnecessary logic to prevent redirect loops.


Version 1.1
-----------

Bugfix release for a regex bug when the full URL was something like
'www.amazon.com' rather than 'www.amazon.com/' or 'www.amazon.com/...'.


Version 1.0
-----------

First version
