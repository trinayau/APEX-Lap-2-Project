const axios = require('axios');

async function searchGames(req, res) {
    try {
        axios.post('https://api.igdb.com/v4/games', 'search "apex"; fields name,cover.url; limit 5;', {
            headers: {
                'Client-ID': 'dxk0rvozg2yjrvaylnawg1kh3egd6h',
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
            .then(resp => {
                res.json(resp.data)
            })
            .catch(err => console.log(err))
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { searchGames }
