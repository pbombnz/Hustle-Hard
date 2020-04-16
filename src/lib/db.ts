import knex from 'knex'

import camelcaseKeys from 'camelcase-keys'

export default knex({
    client: 'pg',
    debug: true,
    asyncStackTraces: true,
    connection: {
        user: process.env.PGUSER || 'postgres',
        host: process.env.PGHOST || '192.168.99.100' || '127.0.0.1',
        database: process.env.PGHOST || process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'secrect',
        port: (process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined) || 5432
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postProcessResponse: (result: any, queryContext: any): any => {
        if (Array.isArray(result)) {
            return result.map(row => camelcaseKeys(row))
        } else {
            return camelcaseKeys(result)
        }
    }
})
