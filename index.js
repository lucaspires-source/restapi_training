import express from 'express';
import Joi from 'joi';


const app = express();
app.use(express.json())
const port = process.env.PORT || 5000;
const courses = [
    {id:1, name:'Pescaria'},
    {id:2, name:'Boliche'},
    {id:3, name:'Break Dance'},
];
app.get('/', (req, res) => {
  res.send('server is just ready');
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
  });

  app.get('/api/courses/:id', (req, res) => {
    const course  = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course was not found')
    else res.send(course)
  })
  app.post('/api/courses',(req,res) =>{

    const schema =Joi.object({ name: Joi.string() .min(2) .required()})
    const result = schema.validate(req.body)
    if(result.error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    
    
    const course = {
          id: courses.length + 1,
          name:req.body.name
      }
      courses.push(course)
      res.send(course);
  })
app.listen(port, () => {
  console.log(`server at http://localhost:${port} ... `);
});
