define({
    "defaultApp": "networkexplorer",
    "name": "CDT serve",
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
        "systemtime": {
            "url": "/rest/system/time"
        },
        "helplib": {
            "i18n": {
                "locales": [
                    "en-us"
                ]
            }
        }
    },
    "webpush": {
        "urls": {
            "stream": "/web-push/oss/push",
            "id": "/web-push/rest/oss/push/id",
            "subscriptions": "/web-push/rest/oss/push/subscriptions"
        }
    },
    "logger": {
        "url": '/rest/service/log',
        "sendFrequency": 5000,
        "autoLog": false,
        "autoSend": 5,
        "logLevel": 'ERROR',
        "maxCache": 10
    },
    "components": [
        {
            "path": "UserProfileMenu"
        },
        {
            "path": "enmcontainerhelper"
        },
        {
            "path": "helpbutton"
        },
        {
            "path": "systemtime"
        },
        {
            "path": "flyout"
        },
        {
            "path": "contextmenu"
        },
        {
            "path": "systemidentifier"
        },
        {
            "path": "navigation"
        }
    ]
});