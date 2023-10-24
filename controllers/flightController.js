const instance = require('../instancAxios');

const axios = require('axios');
exports.addFlight = async (req, res) => {
  try {
    let flight = req.body;
    console.log(flight);
    // instance.post('/', flight)
    //         .then(result => {
    //           console.log('result',result);
    //           return res.status(200).json(result);
    //         }).catch(err => {
    //           console.log('error', err);
    //         });
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MONSTER_SERVICE_TOKEN}`,
        'candidate' : process.env.CANDIDATE
      },
      body: JSON.stringify(flight)
    }
    try {
      const response = await fetch(process.env.MONSTER_SERVICE_API, options);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch(err) {
      console.log('ERROR', err);
    }
    
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
