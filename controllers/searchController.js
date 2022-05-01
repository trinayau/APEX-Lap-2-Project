const axios = require('axios');

async function searchGames(req, res) {
    try {
        const search = JSON.parse(req.body);
        console.log(search);
        axios.post('https://api.igdb.com/v4/games', `search "${search}"; fields name,cover.url; limit 5;`, {
            headers: {
                'Client-ID': 'dxk0rvozg2yjrvaylnawg1kh3egd6h',
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
            .then(resp => {
                console.log(resp.data)
                res.json(resp.data)
            })
            .catch(err => console.log(err))
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { searchGames }
//returns 5
//make new element called 'add game' with id="gameId"
//add.eventlistener(click, () => { post to game create (with title and Id), then redirect to habit page with {gameId}})
