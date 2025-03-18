import SpotifyWebApi from 'spotify-web-api-node';
import { users } from '../../../db/users'; // Adjust the import path as needed

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const user = await users.findById(req.user.id);
      if (user.spotify_authorized) {
        console.log('User is already authorized with Spotify');
        return res.status(200).json({ message: 'Already authorized' });
      }

      const scopes = ['playlist-modify-public', 'playlist-modify-private', 'user-read-private', 'user-read-email'];
      const authorizeURL = spotifyApi.createAuthorizeURL(scopes, req.session.spotifyAuthState);
      res.status(200).json({ url: authorizeURL });
    } catch (err) {
      console.error('Error during Spotify authorization:', err);
      res.status(500).json({ error: 'Authorization failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
