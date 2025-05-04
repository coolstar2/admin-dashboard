import connectDB from '../database/connect.js';
const sql = connectDB();

export const getAdmins = async (req, res) => {
  try {
    const admins = await sql`SELECT id, username, email /* Add other admin fields */ FROM users WHERE role = 'admin'`;
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Error fetching admins" });
  }
};
