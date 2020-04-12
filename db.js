const { Pool } = require('pg')
const format = require('pg-format');
const camelcaseKeys = require('camelcase-keys');

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || '192.168.99.100' || '127.0.0.1',
    database: process.env.PGHOST || process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'secrect',
    port: process.env.PGPORT || 5432,
});

const _query = async (text, params) => {
    const start = Date.now()
    try {
        const res = await pool.query(text, params)
        const duration = Date.now() - start
        console.log('QUERY:', { text, duration, rows: res.rowCount })
        return res;
    } catch (error) {
        const duration = Date.now() - start
        console.error('QUERY FAILED: ', { text, duration, error: error.stack })
    }
}

const _getUser = async (idColumn, idValue) => {
    const sql = format(
        'SELECT u.id, uatt.value as login_method, u.username, u.password, u.given_name, u.family_name, u.email, u.address, u.phone_number_e164, u.created_on, u.banned, u.banned_by, u.banned_reason FROM users u ' +
        'INNER JOIN user_account_types_t uatt ON uatt.id = u.account_type ' +
        'WHERE u.%I = %L'
        , idColumn, idValue)
    const userResults = await _query(sql)
    if (userResults.rowCount === 0) { return null } 
    const user = userResults.rows[0]
    const userRolesResults = await _query(
        'SELECT urt.value as role ' +
        'FROM user_roles ur ' +
        'INNER JOIN user_roles_t urt ON ur.role_id = urt.id ' +
        'WHERE ur.user_id = $1', [user.id])
    user.roles = userRolesResults.rows.map((value) => value.role)
    return camelcaseKeys(user, { deep: true})
}


module.exports = {
    // Overriden query method 
    query: _query,
    getClient: async () => {
        const client = await pool.connect();
        const queryFn = client.query;
        const releaseFn = client.release;

        // monkey patch the query method to keep track of the last query executed
        client.query = (...args) => {
            client.lastQuery = args;
            return queryFn.apply(client, args);
        };

        // set a timeout of 5 seconds, after which we will log this client's last query
        client.timeout = setTimeout(() => {
            console.error('A client has been checked out for more than 5 seconds!');
            console.error(`The last executed query on this client was: ${client.lastQuery}`);
        }, 5000);

        client.release = () => {
            // clear our timeout
            clearTimeout(timeout);
            // Revert monkey-patched versions of functions
            client.query = queryFn;
            client.release = releaseFn;
            client.release();
        };           
    },

    // Custom
    getUserById: async (value) =>  _getUser('id', value),
    getUserByUsername: async (value) => _getUser('username', value),
    getUserByEmail: async (value) => _getUser('email', value)


};