const server = require('./server')
const mongoose = require('mongoose');

// const mongodbURI = process.env.DB_CONNECTION;
const mongodbURI = 'mongodb+srv://apex-test:Test12@cluster0.8m7wy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const port = process.env.PORT || 3000;

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('Connected to DB');
        server.listen(port, () => console.log(`\nServer listening on port http://localhost:${port}\n`));
    })
    .catch(err => console.log(err));

