import db from './db.js';

const readAllUser = () => {
    try {
        const query = `SELECT * FROM users`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

const insertUser = (name:string, email:string, age:Number) => {
    try {
        const insertQuery = db.prepare(
            `INSERT INTO users (name, age, email) VALUES ('${name}' , ${age}, ${email})`
        )

        const transaction = db.transaction(() => {
            const info = insertQuery.run()
            console.log(
                `Inserted ${info.changes} rows with last ID 
                 ${info.lastInsertRowid} into person`
            )
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}

export const UserDB = {
    readAllUser,
    insertUser,
}