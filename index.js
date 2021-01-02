import express from "express";

const app = express();
const port = process.env.PORT || 5000;
const courses = [
    {id:1,name:"Pescaria"},
    {id:2, name:"Boliche"},
    {id:3, name:"Break Dance"},
]
app.get('/', (req, res) => {
  res.send('server is just ready');
});
app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
  })

  app.get('/api/courses/:id', (req, res) => {
    const course  = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course was not found')
    else res.send(course)
  })
app.listen(port, () => {
  console.log(`server at http://localhost:${port} ... `);
});
