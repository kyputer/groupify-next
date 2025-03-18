import { tracks } from '../../../db/tracks'; // Adjust the import path as needed

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Downvote request received');
    console.log(req.body.SpotifyID);

    const userId = req.body.UserID; // Adjust based on your frontend payload
    if (!userId) {
      console.error('User ID is missing in the request body');
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      // Implement the downvote logic here
      await tracks.downvote(req.body.SpotifyID, userId); // Ensure this method exists in groupify-next
      res.status(200).json({ message: 'Downvote successful' });
    } catch (err) {
      console.error('Error during downvote:', err);
      res.status(500).json({ error: 'Downvote failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
