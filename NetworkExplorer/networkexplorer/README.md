# Running the app against a local web server using cdt2 serve
Run the following when running cdt2 serve
    cdt2 serve -m <mock-server>.js

# Running the app against a remote web server using cdt2 serve
If you want to use cdt2 serve's proxy functionality, you can run the following command
    cdt2 serve -m proxyServer.js

Or alternatively:
    ./runWithProxy.sh

This will use the configuration settings in proxyConfig.json to set the target domain and authorisation parameters.