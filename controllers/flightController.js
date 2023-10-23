
exports.addFlight = async (req, res) => {
  try {
    let flight = req.body;
    let flightURL = process.env.MONSTER_SERVICE_API;

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
