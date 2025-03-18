import { authenticateUser } from '../../../utils/auth'; // Adjust the import path as needed

export default async function handler(req, res) {
  res.redirect("/api/auth/signin");
}
