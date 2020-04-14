import { Pool, QueryResult, PoolClient } from 'pg'

interface PatchedPoolClient extends PoolClient {
    lastQuery: any[];
    timeout: NodeJS.Timeout;
}

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || '192.168.99.100' || '127.0.0.1',
    database: process.env.PGHOST || process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'secrect',
    port: (process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined) || 5432
})

export const query = async (text: string, params?: string[]): Promise<QueryResult> => {
    const start = Date.now()
    try {
        const res = await pool.query(text, params)
        const duration = Date.now() - start
        console.log('QUERY:', { text, duration, rows: res.rowCount })
        return res
    } catch (error) {
        const duration = Date.now() - start
        console.error('QUERY FAILED: ', { text, duration, error: error.stack })
        throw error
    }
}
