const {usertable}=require('../dbHandler/')
const {postTable}=require('../dbHandler/')
class MainController{
    home(req,res){
            res.render('home')
    }
    async logout(req,res){
        req.session.destroy(function(err) {
            res.redirect('/')
        }) 
    }
    async login(req,res){
        const {Email,password}=req.body
        const LoggedUser=await usertable.findOne({where:{email:Email}})
        const postings=await postTable.findAll()
        if (password===LoggedUser.password){
            req.session.CurrentUser=LoggedUser;
            res.render('profile',{currentUser:req.session.CurrentUser})
        } else {
            res.redirect('/'); 
        }
    }
    async register(req,res){
        const {name,Email,bday,password}=req.body
        if(!name || !Email || !password){
            res.send("Please add valid details")
            return
        }
        try {
            console.log("in user table")

            await usertable.create(
                {
                    name:name,
                    password,
                    email:Email,
                    dob:bday
                }
                ).then(()=>{
                    console.log('---------Inserted Successfully-----------')
                }).catch(err=>{
                    console.log(err)
                })
                
            } catch (error) {
                console.log(error)
            }
            req.session.save(()=>res.redirect('/'));
                        
        }
        async status(req,res){
            const {title,posts}=req.body
            try{
                console.log("in post table")
                await postTable.create(
                    {title:title,status:posts}
                ).then(()=>{console.log('inserted successfully')}).catch(err=>{
                    console.log(err)
                })
            } catch(error){console.log(error)
        }
        res.render('profile',{currentUser:req.session.CurrentUser})
    }}
    module.exports=new MainController();
    
    