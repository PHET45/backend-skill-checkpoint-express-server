// Create PostgreSQL Connection Pool here !
import { Pool } from "pg";

const connectionPool = new Pool({
  connectionString:
    "postgresql://postgres:123456789@localhost:5432/questions",
});

export default connectionPool;
