import { tracks } from '../../../db/tracks'; // Adjust the import path as needed

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Upvote request received');
    console.log(req.body.SpotifyID);

    try {
      const userId = req.body.UserID; // Adjust based on your frontend payload
      // Implement the upvote logic here
      await tracks.upvote({ id: req.body.SpotifyID }, userId); // Ensure this method exists in groupify-next
      res.status(200).json({ message: 'Upvote successful' });
    } catch (err) {
      console.error('Error during upvote:', err);
      res.status(500).json({ error: 'Upvote failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
