const express = require('express');
const app = express();

const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/daily_task",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set('strictQuery', true);

const port =8015;



const task_schema = new mongoose.Schema({
    date :{type:Date, require:true},
    Tasks: {type:String, require:true},
    email_id:{type:String, require:true, unique:true}

});
const Employee = mongoose.model("Employee",task_schema);

app.get('/',(req,res)=>{
    res.sendFile('./task.html',{root:__dirname});
});

app.post('/add_task',(req,res)=>{
    let myData = new Employee(req.body);
    let email_id = req.body.email_id;
    let Tasks = req.body.Tasks;
    console.log(myData);
    myData.save()
    .then(item=>{
        res.send("task saved to database")
    })
    .catch(err=>{
        res.status(400).send("Unabel to save task to the database ");
    })
    
    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
        // Configure your email provider settings here
        service: 'Gmail',
        auth: {
            user: 'shruti.javali@gmail.com',
            pass: 'tzxdxkvtujisimkw'
        }
    });

    const mailOptions = {
        from: 'shruti.javali@gmail.com',
        to: email_id,
        subject: "Today's Completed Tasks ",
       /* text: `Dear ${fullName}, \n\nThank you for registering! We received your message: ${ fullName, email, mobile_number, address, payment, transaction_id, course }`*/
      text:`Dear ${email_id} ,list of Tasks done so far: ${Tasks}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Email sending failed.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Registration successful! Email sent.');
        }
    });

});

app.get('/getTask',(req,res)=>{
    Employee.find({})
    .then(employees=>{
        res.json(employees);
    })
    .catch(err=>{
        console.log(err);
        res.json(err);
    })
})

app.listen(port);
console.log(`App listening on ${port}`);

