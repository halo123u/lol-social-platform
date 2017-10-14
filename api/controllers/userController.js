const userController ={
    newUser : (req,res) => {
        console.log(req.body.username , req.body.password);
    }   
}

module.exports = userController;