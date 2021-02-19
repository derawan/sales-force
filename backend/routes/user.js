import Express from 'express';

const defaultRouter = Express.Router();

defaultRouter.route("/").get(async (req, res) => { res.json({success:true,message:"daftar user"})});
defaultRouter.route("/reg").get(async (req, res) => { res.json({success:true,message:"registrasi user"})});
defaultRouter.route("/hapus").get(async (req, res) => { res.json({success:true,message:"hapus user"})});
defaultRouter.route("/hello").get(async (req, res) => { res.json({success:true,message:"hello"})});

const rt = {
    group:'/users',
    route:defaultRouter
}

//export default defaultRouter;
export default rt;