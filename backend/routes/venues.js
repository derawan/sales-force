import Express from 'express';

const defaultRouter = Express.Router();

defaultRouter.route("/").get(async (req, res) => { res.json({success:true,message:"daftar user"})});
defaultRouter.route("/reg").get(async (req, res) => { res.json({success:true,message:"registrasi venues"})});
defaultRouter.route("/hapus").get(async (req, res) => { res.json({success:true,message:"hapus user"})});
defaultRouter.route("/hello").get(
    async (req, res, next) => { 
        //res.json({success:true,message:"hello"})
        next('ada masalah');
    }
    
);

const rt = {
    group:'/venues',
    route:defaultRouter
}

//export default defaultRouter;
export default rt;