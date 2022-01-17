import express from 'express'
const app=express();
app.get('/users',(req,res)=>{
    res.send('we will send list of users');
}
)
const PORT=process.env.PORT||5000;
app.listen( PORT ,err =>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log(`sucessfully started http://localhost:${PORT}`);
}
    )