const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

class User {
  constructor( first_name, last_name, email, phone, comments) { // a idono?????
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.comments = comments;
  }

  save(render){
    connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', 
    [this.first_name, this.last_name, this.email, this.phone, this.comments], 
    (err, rows) => {
      if (!err) {
        render(rows);
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  static search(searchTerm, render){
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?", 
      ['%' + searchTerm + '%', '%' + searchTerm + '%'], 
      (err, rows) => {
        if (!err) { 
          render(rows);
        }
        else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
    });
  }

  static edit(uID, render){
    connection.query('SELECT * FROM user WHERE id = ?', [uID], (err, rows) => {
      if (!err) {
        render(rows);
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
}

module.exports = User;
