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
//Function for validate inputs
const validation = (course) =>{
    const schema =Joi.object({ name: Joi.string() .min(2) .required()})
    return schema.validate(course)
}
//handling GET  requests
app.get('/', (req, res) => {
  res.send('server is just ready');
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
  });

  app.get('/api/courses/:id', (req, res) => {
    const course  = courses.find(c => c.id === parseInt(req.params.id))
    if (!course){
        res.status(404).send('The course was not found')
        return
    } 
    else res.send(course)
  })


//handling POST requests
  app.post('/api/courses',(req,res) =>{

    const {error} = validation(req.body)
    if(error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    
    
    const course = {
          id: courses.length + 1,
          name:req.body.name
      }
      courses.push(course)
      res.send(course);
  })

//handling PUT requests
  app.put('/api/courses/:id',(req,res) =>{
    const course  = courses.find(c => c.id === parseInt(req.params.id))
    if (!course){
        res.status(404).send('The course was not found')
        return
    } 
    const {error} = validation(req.body)
    if(error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    course.name = req.body.name
    res.send(course)    

})
//handling DELETE requests
app.delete('/api/courses/:id',(req,res) =>{
    const course  = courses.find(c => c.id === parseInt(req.params.id))
    if (!course){
        res.status(404).send('The course was not found')
        return
    } 
    const index = courses.indexOf(course)

    courses.splice(index, 1)

    res.send(course)
})
app.listen(port, () => {
  console.log(`server at http://localhost:${port} ... `);
});
