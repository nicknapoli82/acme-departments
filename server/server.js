const express = require('express');
const app = express();

const {User, Department, db, syncAndSeed} = require('./db');

const port = process.env.PORT || 3000;

app.use(require('cors')());
app.use(express.json());

app.get('/api/users', async(req, res, next)=> {
  try{
    res.send(await User.findAll());
  }
  catch(e){
    console.log(e);
  }
});

app.get('/api/users/:id', async(req, res, next)=> {
  try{
    res.send(await User.findByPk(req.params.id));
  }
  catch(e){
    console.log(e);
  }
});

app.post('/api/users', async(req, res, next)=> {
  try{
    const result = await User.create(req.body);
    result ? res.status(201).send(result) : res.status(404).send();
  }
  catch(e){
    console.log(e);
  }
});

app.put('/api/users/:id', async(req, res, next)=> {
  try{
    await User.update(req.body, {where: {id: req.params.id}});
    const updated = await User.findByPk(req.params.id);
    res.status(updated ? 200 : 404).send(updated);
  }
  catch(e){
    console.log(e);
  }
});

app.delete('/api/users/:id', async(req, res, next)=> {
  try{
    const result = await User.destroy({where: {id: req.params.id}});
    result ? res.status(202).send() : res.status(404).send();
  }
  catch(e){
    console.log(e);
  }
});

app.get('/api/departments', async(req, res, next)=> {
  try{
    res.send(await Department.findAll());
  }
  catch(e){
    console.log(e);
  }
});

app.post('/api/departments', async(req, res, next)=> {
  try{
    const result = await Department.create(req.body);
    result ? res.status(201).send(result) : res.status(404).send();
  }
  catch(e){
    console.log(e);
  }
});

app.put('/api/departments/:id', async(req, res, next)=> {
  try{
    await Department.update(req.body, {where: {id: req.params.id}});
    const updated = await Department.findByPk(req.params.id);
    res.status(updated ? 200 : 404).send(updated);
  }
  catch(e){
    console.log(e);
  }
});

app.delete('/api/departments/:id', async(req, res, next)=> {
  try{
    const result = await Department.destroy({where: {id: req.params.id}});
    result ? res.status(202).send() : res.status(404).send();
  }
  catch(e){
    console.log(e);
  }
});

app.listen(port);
