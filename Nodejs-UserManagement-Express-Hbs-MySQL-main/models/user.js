const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

class User {
  constructor( first_name, last_name, email, phone, comments) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.comments = comments;// auie mndrei
  }
  save(){
    
  }
  // save() {
  //   const db = getDb();
  //   return db
  //     .collection('BOOKS')
  //     .insertOne(this)
  //     .then(result => {
  //       console.log(result);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // static fetchAll() {
  //   const db = getDb();
  //   return db
  //     .collection('BOOKS')
  //     .find()
  //     .toArray()
  //     .then(books => {
  //       console.log(books);
  //       return books;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
}

module.exports = User;
