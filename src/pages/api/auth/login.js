import passport from 'passport';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(`Login attempt for user: ${req.body.username}`);
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!user) {
        console.log('Login failed:', info.message);
        return res.status(401).json({ error: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Error during login:', err);
          return res.status(500).json({ error: 'Login failed' });
        }
        console.log('Login successful');
        res.status(200).json({ message: 'Login successful', user });
      });
    })(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
