const express = require('express');
const cors = require('cors');
const KiteConnect = require('kiteconnect').KiteConnect;

const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
const api_key = '7oq0bsmd9aca57du';
const api_secret = 'o41du1myizhzmxu91g9dqw5nn0uq7an5';
const access_token = '';

app.get('/authenticate/:request_token', (req, res) => {
    const request_token = req.params.request_token
    console.log('Request Token ####', request_token)

    const kc = new KiteConnect({ api_key: api_key, debug: true });
    // kc.setSessionExpiryHook(sessionHook);

    if (access_token) {
        console.log('IF ### Access Token:', access_token)
        kc.generateSession(request_token, api_secret)
            .then(function (response) {
                console.log('Response: ', response);
                init();
            })
            .catch(function (err) {
                console.log('Error:', err);
            })
    } else {
        kc.setAccessToken(access_token);
        console.log('ELSE ### Access Token:', access_token)
        init();
    }

    function init() {
        console.log('Profile:', getProfile());
    }

    function sessionHook() {
        console.log('User logged out');
    }

    function getProfile() {
        kc.getProfile()
            .then(function (response) {
                console.log(response)
            }).catch(function (err) {
                console.log(err);
            });
    }

    console.log('Authentication in progress...');
    res.send({ message: 'Authentication in progress...' })
})


// app.get('/authenticate/:request_token', (req, res) => {
//     console.log('Authentication in progress...');
//     res.send(req.params.request_token)
//     // res.send(req.query.request_token)
// })

const PORT = 4200;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
