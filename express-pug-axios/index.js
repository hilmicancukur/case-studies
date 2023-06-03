const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({
  extended: true
})); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async (req, res) => {
  let page = req.query.page;
  if (page) {
    var url = `https://reqres.in/api/users?page=${page}`;
  }else{
    var url = `https://reqres.in/api/users`;
  }
  const query = await axios.get(url);
  const response = query.data;
  res.render('index', { 
    members: response.data,
    total_page: response.total_pages,
    current_page: response.page
  });
});

app.get('/member/:memberID', async (req, res) => {
  const member_id = req.params.memberID;
  const query = await axios.get(`https://reqres.in/api/users/${member_id}`);
  const response = query.data;
  res.render('member', { 
    member: response.data,
  });
});

app.get('/create-member', async (req, res) => {
  const query = await axios.get(`https://reqres.in/api/users`);
  const response = query.data;
  res.render('create-member', { 
    member: response.data,
  });
});
app.post('/create-member', async (req, res) => {
  const formDatas = req.body;
  var alert = "Danger";
  const query = await axios.post(`https://reqres.in/api/users`, formDatas)
    .then(function (response) {
      console.log(response.data);
      alert = "Success";
    })
    .catch(function (error) {
      alert = "Danger";
    });
  res.render('create-member', { 
    alert: alert
  });
});

app.listen(PORT, () => {
  console.log(`Listining on http://localhost:${PORT}/ or http://127.0.0.1:${PORT}/ ...`);
});