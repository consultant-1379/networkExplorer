# Unit Tests
In order to run Network Explorer unit tests, there are a few options.

# Using a desktop browser
**Unit**

Run `cdt2 serve` and navigate to http://localhost:8585/test/unit  

**BIT**

Run `cdt2 serve -m .cdt/grammarparsinglibrary/serveGrammarModule.js` and navigate to http://localhost:8585/test/bit  

# Using a headless browser
This is currently unused, but is hoped to become part of cdt2 build.

# Using cdt2 build
`cdt2 build --use-external-phantomjs`

This is the command used by the CI jobs to build an RPM. It requires installation on the phantom 2 headless browser
through cdt (details available in cdt documentation).