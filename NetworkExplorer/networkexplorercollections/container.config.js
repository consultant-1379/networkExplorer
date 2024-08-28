define({
    "defaultApp": "networkexplorercollections",
    "name": "ENM",
    "properties": {
        "help": {
            "helpCenter": true,
            "search": true,
            "i18n": {
                "locales": [
                    "en-us"
                ]
            }
        },
        "helpbutton": {
            "helpCenter": true,
            "aboutDialog": true,
            "i18n": {
                "locales": [
                    "en-us"
                ]
            }
        },
        "helpsearch": {
            "url": "/help-search/rest/help/search",
            "i18n": {
                "locales": [
                    "en-us"
                ]
            }
        },
        "helplib": {
            "i18n": {
                "locales": [
                    "en-us"
                ]
            }
        }
    },
    "components": [{
            "path": "helpbutton"
        },
        {
            "path": "flyout"
        },
        {
            "path": "contextmenu"
        },
        {
            "path": "navigation"
        }
    ]
});