export const getProducts = async (req, res) => {
  try {
    const products = await sql`SELECT id, name, price, description, rating, supply FROM products`;
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
