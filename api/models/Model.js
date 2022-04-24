//require database

//require other classes if needed

moudle.exports = class ClassExample {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
    }

    static get all(){
        return new Promise(async (resolve, reject) => {
            try {
                console.log("hello");
                //let objectData = await // query database
                //let object = objectData.map(o => new Object(o));
                //resolve(object);
            } catch (err) {
                reject(err);
            }
        })
    }

    static getById(id){
        return new Promise (async (resolve, reject) => {
            try {
                //let objectData = await // query database by [id]
                //let object = objectData.map(o => new Object(o));
                //resolve (object);
            } catch (err) {
                reject('object not found id');
            }
        });
    }

    static async create(objectData){
        return new Promise (async (resolve, reject) => {
            try {
                //const {id, title, etc} = objectData
                //let result = await // insert into database [id, title, etc]
                //resolve (result);
            } catch (err) {
                reject('object could not be created');
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {                
                //let result = await // delete from database [this.id]
                //resolve (objected was deleted);
            } catch (err) {
                reject('object could not be deleted')
            }
        })
    };

    static async update(objectData){
        return new Promise (async (resolve, reject) => {
            try {
                //const {id, title, etc} = objectData
                //let result = await // insert into database [id, title, etc]
                //resolve (result);
            } catch (err) {
                reject('object could not be updated');
            }
        });
    };

    static async addUser(objectData){
        return new Promise (async (resolve, reject) => {
            try {
                //const hashedPassword = await bcrypt.hash(objectData.body.password, 10)
                //const user = {name: objectData.name, password: hashedPassword}
                //let result = await // insert into database [user]




                //const {id, title, etc} = objectData
                //let result = await // insert into database [id, title, etc]
                //resolve (result);
            } catch (err) {
                reject('user could not be added');
            }
        });
    };

    static async getUser(objectData){
        return new Promise (async (resolve, reject) => {
            try {
                const user = this.getById(user => user.name === objectData.body.name)
                if (user == null) {
                    return error('user could not be found')
                }
                try {
                    if(bcrypt.compare(objectData.body.password, user.password)){
                        console.log('woo');
                    } else {
                        console.log('not allowed')
                    }
                } catch {
                    return error('user could not be found')
                }
            } catch (err) {
                reject('user not found');
            }
        });
    };
}