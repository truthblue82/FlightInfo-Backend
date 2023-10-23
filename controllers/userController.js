const bcrypt = require('bcrypt');
const firebase = require('firebase-admin');
const jwt = require('jsonwebtoken');
const { getDatabase } = require('firebase-admin/database');

const serviceAccount = require("../firebaseAccountKey.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_databaseURL,
  databaseAuthVariableOverride: {
    uid: process.env.FIREBASE_REALTIME_DB_KEY
  }
});

const db = getDatabase();

exports.signup = async (req, res) => {
  try {
    let user = req.body;
    bcrypt.hash(user.password, 10)
    .then(hash => {
      user = {
        ...user,
        password: hash
      };
      //save to database
      const tmp = user.email.replace(/[\@\.]/g,'');
      const dbRef = db.ref(`/users/${tmp}`);
      dbRef.get( '/')
      .then((snapshot) => {
        if(snapshot.exists()) {
          return res.status(409).json({ error: `User ${user.email} already exists!` });
        } else {
          dbRef.set(user, error => {
            if(error) {
              return res.status(500).json({ error: `User ${user.email} could not be save!` });
            }
            return res.status(200).json(user);
          });
        }
      }).catch(err => {
        return res.status(500).json({ error: err.toString() });
      })
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
exports.login = async(req, res) => {
  try {
    let { email, password } = req.body;
    const tmp = email.replace(/[\@\.]/g,'');
    const dbRef = db.ref(`/users/${tmp}`);
    dbRef.get('/')
    .then(async (snapshot) => {
      if(snapshot.exists()) {
        const user = snapshot.val();
        const match = await bcrypt.compare('' + password, user.password);

        if(match) {
          const token = jwt.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
          return res.status(200).json({ token: token });
        } else {
          return res.status(401).json({ error: 'Unauthorize: password does not match!' });
        }
      } else {
        return res.status(401).json({ error: 'Unauthorize: user is not found!' });
      }
    }).catch((err) => {
      return res.status(500).json({ error: err.toString() });
    })
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

exports.getUserByEmail = async (req, res) => {
  try {
    let email = req.params.email;
    const tmp = email.replace(/[\@\.]/g,'');
    const dbRef = db.ref(`/users/${tmp}`);
    dbRef.once('value')
    .then( (snapshot) => {
      if (snapshot.exists()) {
        return res.status(200).json(snapshot.val());
      } else {
        return res.status(401).json({ error: "No data available" });
      }
    }).catch((error) => {
      return res.status(500).json({ error: error.code });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
