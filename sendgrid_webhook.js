var localtunnel = require('localtunnel');
localtunnel(5000, 
    { subdomain: 'mithu89' }, function(err, tunnel) {
        console.log('LT running')
    });