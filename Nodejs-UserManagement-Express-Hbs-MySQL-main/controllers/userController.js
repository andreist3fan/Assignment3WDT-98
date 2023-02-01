const mysql = require('mysql');
const User = require('../models/user');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Users
exports.view = (req, res) => {
  let remUser = req.query.removed;
  User.view((rows) =>{
    res.render('home', {rows, remUser});
  }
  );
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  User.search(searchTerm, (rows)=>{
      res.render('home', {rows, removedUser:''});
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  const user = new User(first_name, last_name, email, phone, comments);
  user.save((rows)=>{
    res.render('add-user', { alert: 'User added successfully.' });
  });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  let uID = req.params.id;
  User.edit(uID,(rows)=>{res.render('edit-user',{rows, alert:""})});
}


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  const tempUser = new User(first_name, last_name, email, phone, comments);
  let uID = req.params.id;
  tempUser.update(uID, (rows)=>{
    res.render('edit-user', { rows, alert: `${first_name} has been updated.` });  
  })
  
}

// Delete User
exports.delete = (req, res) => {
  let uID = req.params.id;
  // Delete a record
  User.delete(uID,(removedUser) =>{
    res.redirect('/?removed=' + removedUser);
  });
  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  // connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
  //   if (!err) {
  //     let removedUser = encodeURIComponent('User successeflly removed.');
  //     res.redirect('/?removed=' + removedUser);
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from beer table are: \n', rows);
  // });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  let uID = req.params.id;
  User.viewAll(uID,(rows)=>{
    res.render('view-user', { rows });
  })

}