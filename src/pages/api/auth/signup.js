import { registerUser } from '../../utils/auth'; // Corrected path

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Signup request received");
    console.log(req.body);

    try {
      const user = await registerUser(req.body.username, req.body.password);
      if (!user) {
        console.error("Signup failed: User already exists");
        return res.status(400).json({ error: "User already exists" });
      }
      res.redirect("/api/auth/signin");
    } catch (err) {
      console.error("Error during signup:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
