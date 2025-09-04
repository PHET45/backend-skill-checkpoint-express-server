// Create PostgreSQL Connection Pool here !
import { Pool } from "pg";

const connectionPool = new Pool({
  connectionString:
    env.PROSTGRAST_KEY
});

export default connectionPool;
