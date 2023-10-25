exports.addFlight = async (req, res) => {
  try {
    let flight = req.body;
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MONSTER_SERVICE_TOKEN}`,
        'candidate' : process.env.CANDIDATE,
        'token': process.env.MONSTER_SERVICE_TOKEN
      },
      body: JSON.stringify(flight)
    }
    try {
      const response = await fetch(process.env.MONSTER_SERVICE_API, options);
      if(response.status === 200) {
        const jsonResponse = await response.json();
        if(jsonResponse === true) {
          return res.status(200).json(flight);
        } else {
          return res.status(2000).json({message: jsonResponse});
        }
      } else {
        return res.status(401).json({error: 'Something went wrong!'})
      }
    } catch(err) {
      return res.status(500).json({error: err.error.message});
    }
  } catch (err) {
    return res.status(500).json({ error: err.error.message });
  }
}
