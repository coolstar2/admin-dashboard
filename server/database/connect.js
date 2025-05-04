import postgres from 'postgres';

let sql; // Declare a variable to hold the connection pool

const connectDB = () => {
  try {
    if (!sql) {
      sql = postgres(process.env.POSTGRES_URL, {
        ssl: {
          rejectUnauthorized: false, // Important for Render's SSL
        },
      });

      // Test the connection (optional)
      sql`SELECT NOW()`
        .then(() => console.log('PostgreSQL connected'))
        .catch((err) => console.error('PostgreSQL connection error:', err));
    }
    return sql; // Return the connection pool
  } catch (error) {
    console.error('Error during connection setup:', error || 'Connection setup error.');
    // You might want to handle this error more gracefully,
    // perhaps by retrying the connection or exiting the process.
  }
};

export default connectDB;

// You can then use the 'sql' object returned by connectDB() to run queries
// in your application code, for example:
//
// import connectDB from './database';
//
// const sql = connectDB();
//
// async function fetchUsers() {
//   try {
//     const users = await sql`SELECT * FROM users`;
//     console.log(users);
//     return users;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return [];
//   }
// }
