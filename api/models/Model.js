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
}