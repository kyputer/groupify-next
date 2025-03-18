export default async function handler(req, res) {
  if (req.method === 'GET') {
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
