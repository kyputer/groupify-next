import { users } from '../../../db/users'; // Adjust the import path as needed

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Signup request received');
    console.log(req.body);

    try {
      const user = await users.register(req.body.username, req.body.password);
      req.logIn(user, (err) => {
        if (err) {
          console.error('Error during login after signup:', err);
          return res.status(500).json({ error: 'Login after signup failed' });
        }
        res.status(200).json({ message: 'Signup and login successful', user });
      });
    } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).json({ error: 'Signup failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
