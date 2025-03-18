import { tracks } from '../../db/tracks'; // Adjust the import path as needed
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log('Loading dashboard');
    try {
      const rows = await tracks.getHot();
      console.log('Hot tracks retrieved:', rows);

      const ids = rows.map((row) => row.SpotifyID);
      if (ids.length === 0) {
        console.log('No hot tracks found');
        return res.status(200).json({ HotJson: [], PlayedJson: [], UserID: req.user?.id });
      }

      const data = await spotifyApi.getTracks(ids);
      res.status(200).json({ HotJson: data.body.tracks, PlayedJson: [], UserID: req.user?.id });
    } catch (err) {
      console.error('Error retrieving dashboard data:', err);
      res.status(500).json({ error: 'Failed to load dashboard' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
