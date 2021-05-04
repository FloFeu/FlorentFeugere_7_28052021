const conn = require('../config/db.config').promise();

executeSql = (sql) => {
    const result = conn.execute(sql);
    return result
};

module.exports = executeSql;