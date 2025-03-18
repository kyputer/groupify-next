import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const { access_token, refresh_token, expires_in } = data.body;

      // Set the access token and refresh token
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      res.status(200).json({
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
      });
    } catch (error) {
      console.error("Error exchanging authorization code:", error);
      res.status(500).json({ error: "Failed to exchange authorization code" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
