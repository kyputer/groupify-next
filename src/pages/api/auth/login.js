import { authenticateUser } from '../../utils/auth'; // Corrected path

export default async function handler(req, res) {
  res.redirect("/api/auth/signin");
}
