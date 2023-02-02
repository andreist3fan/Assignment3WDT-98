const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

class User {
  constructor( first_name, last_name, email, phone, comments, status = "none") { 
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.comments = comments;
    this.status = status;
  }

  save(render){
    connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?, status = ?', 
    [this.first_name, this.last_name, this.email, this.phone, this.comments, this.status], 
    (err, rows) => {
      if (!err) {
        render(rows);
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  update(uID, render){
    connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', 
    [this.first_name, this.last_name, this.email, this.phone, this.comments, uID], 
    (err, rows) => {
      if (!err) {
        // User the connection
        connection.query('SELECT * FROM user WHERE id = ?', 
        [uID], (err, rows) => {
          // When done with the connection, release it
          if (!err) {
            render(rows);
          } else {
            console.log(err);
          }
          console.log('The data from user table: \n', rows);
        });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  static view(render){
    // User the connection
    connection.query('SELECT * FROM user WHERE status = "active"', 
    (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      render(rows);
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
    });

  }

  static viewAll(uID,render){
    connection.query('SELECT * FROM user WHERE id = ?', [uID], (err, rows) => {
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

  static delete(uID,redirect){
    connection.query('UPDATE user SET status = ? WHERE id = ?', 
    ['removed', uID], 
    (err, rows) => {
      if (!err) {
        let removedUser = encodeURIComponent('User successfully removed.');
        redirect(removedUser);
      } else {
        console.log(err);
      }
      console.log('The data from beer table are: \n', rows);
    }); 
  }

  static activate(uID, redirect){
    connection.query('UPDATE user SET status = ? WHERE id = ?', 
    ['active', uID],
    (err, rows) => {
      if (!err) {
        let activatedUser = encodeURIComponent('User successfully activated.');
        redirect(activatedUser);
      } else {
        console.log(err);
      }
      console.log('The data from beer table are: \n', rows);
    }); 
  }

  static deactivate(uID, redirect){
    connection.query('UPDATE user SET status = ? WHERE id = ?', 
    ['none', uID], 
    (err, rows) => {
      if (!err) {
        let deactivatedUser = encodeURIComponent('User successfully deactivated.');
        redirect(deactivatedUser);
      } else {
        console.log(err);
      }
      console.log('The data from beer table are: \n', rows);
    }); 
  }
}

module.exports = User;
