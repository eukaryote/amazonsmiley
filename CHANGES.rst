Changelog
=========

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
