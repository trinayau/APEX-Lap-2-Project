const bcrypt = require('bcrypt');
const Schema = require('./Schema');

module.exports = class User {
    constructor() {}

    static async findByEmail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = Schema.User.findOne({ email: email.toLowerCase() });
                resolve(user);
            } catch (err) {
                reject(`User with email: ${email} not found`);
            }
        });
    }

    static async findByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = Schema.User.findOne({ username: username.toLowerCase() });
                resolve(user);
            } catch (err) {
                reject(`User with username: ${username} not found`);
            }
        });
    }

    static async create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await Schema.User.create(data);
                resolve(user);
            } catch (err) {
                console.log(err)
                reject('object could not be created');
            }
        });
    };

    destroy() {
        return new Promise(async (resolve, reject) => {
            try {
                //let result = await // delete from database [this.id]
                //resolve (objected was deleted);
            } catch (err) {
                reject('object could not be deleted')
            }
        })
    };

    static async update(objectData) {
        return new Promise(async (resolve, reject) => {
            try {
                //const {id, title, etc} = objectData
                //let result = await // insert into database [id, title, etc]
                //resolve (result);
            } catch (err) {
                reject('object could not be updated');
            }
        });
    };

    static async login(email, password) {
        const user = await this.findByEmail(email);
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                return user;
            }
            throw Error('Invalid password')
        }
        throw Error('Incorrect email')
    }

    // static async getUser(objectData){
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             const user = this.getById(user => user.name === objectData.body.name)
    //             if (user == null) {
    //                 return error('user could not be found')
    //             }
    //             try {
    //                 if(bcrypt.compare(objectData.body.password, user.password)){
    //                     console.log('woo');
    //                 } else {
    //                     console.log('not allowed')
    //                 }
    //             } catch {
    //                 return error('user could not be found')
    //             }
    //         } catch (err) {
    //             reject('user not found');
    //         }
    //     });
    // };
}
