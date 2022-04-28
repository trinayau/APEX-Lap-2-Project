const server = require('./server');
const axios = require('axios');
const mongoose = require('mongoose');

//const mongodbURI = process.env.DB_CONNECTION;
const mongodbURI = 'mongodb+srv://apex-test:Test12@cluster0.8m7wy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const port = process.env.PORT || 3000;

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('Connected to DB');
        const params = new URLSearchParams({
            client_id: "dxk0rvozg2yjrvaylnawg1kh3egd6h",
            client_secret: "j58stlrvw317jjispg3wdgdotwnc6f",
            grant_type: "client_credentials"
        })
        axios.post(`https://id.twitch.tv/oauth2/token?${params.toString()}`)
            .then(resp => {
                process.env['ACCESS_TOKEN'] = resp.data['access_token'];
            })
        server.listen(port, () => console.log(`\nServer listening on port http://localhost:${port}\n`));
    })
    .catch(err => console.log(err));

