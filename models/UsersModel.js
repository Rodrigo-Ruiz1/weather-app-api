const pool = require('./conn');

class UsersModel {
    constructor(id, username, email, password, profile_pic) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profile_pic = profile_pic;
    }


    static async addProfilePic(url, user_id) {
        try {
            const response = await pool.query(`UPDATE users SET profile_pic = ${url} WHERE id = ${user_id};`);
            return response;
        } catch (error) {
            console.log('ERROR: ', error)
            return error;
        }
    }

    static async getAllFavorites(user_id) {
        try {
            const response = await pool.query(`SELECT * FROM favorites WHERE user_id = ${user_id};`);
            return response;
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }

    static async addFavorite(city, state, user_id) {
        try {
            const response = await pool.query(`INSERT INTO favorites (city, state, user_id) VALUES ('${city}', '${state}', '${user_id}') RETURNING id;`);
            return response;
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }

    static async deleteFavorite(favorite_id) {
        try {
            const response = await pool.query(`DELETE FROM favorites WHERE id = ${favorite_id}`);
            return response
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }
}
module.exports = UsersModel;