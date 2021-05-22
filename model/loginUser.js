var db = require('../db/dbConnection');

var loginUser = {
    listUser: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let selectStatement = 'SELECT * FROM user';
                db.query(selectStatement,(error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    },
    User: function (userId) {
        try {
            return new Promise((resolve, reject) => {
                var query = "SELECT name,email,role FROM ?? WHERE ??=?";
                var table = ["user", "id",userId];
                console.log(query,table)
                db.query(query,table,(error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(rows[0]);
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    },
};
module.exports = loginUser;
