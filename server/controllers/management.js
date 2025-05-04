import connectDB from '../../database/connect.js';
const sql = connectDB();
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch user and affiliate stats using JOIN
    const userWithStats = await sql`
      SELECT
        u.id AS user_id,
        /* other user fields */,
        ast.affiliateSales AS affiliate_sales /* Assuming affiliateSales is a JSON array in your affiliateStats table */
      FROM
        users u
      LEFT JOIN
        affiliatestats ast ON u.id = ast.userId
      WHERE
        u.id = ${id}
    `;

    if (!userWithStats || userWithStats.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const affiliateSalesIds = userWithStats[0].affiliate_sales || [];

    // Fetch sales transactions based on the IDs
    const salesTransactions = await Promise.all(
      affiliateSalesIds.map(async (transactionId) => {
        const [transaction] = await sql`SELECT * FROM transactions WHERE id = ${transactionId}`;
        return transaction;
      })
    );

    const filterSalesTransactions = salesTransactions.filter((transaction) => transaction !== undefined);

    res.status(200).json({
      user: userWithStats[0],
      sales: filterSalesTransactions,
    });
  } catch (error) {
    console.error("Error fetching user performance:", error);
    res.status(500).json({ message: "Error fetching user performance" });
  }
};
