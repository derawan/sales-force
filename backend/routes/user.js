import Express from 'express';
import * as ModelUser from  './../models/Schema/user_schema';

const defaultRouter = Express.Router();

defaultRouter.route("/").get(
    async (req, res, next) => { 
        try 
        {
            let hasil = await ModelUser.userModel.find().exec();
            //throw 'ini belum digarap module :#Module Tampilkan Daftar User';
            res.json({
                success:true,
                payload: hasil
            });
        }
        catch(error)
        {
            next(error);
        }
    }
);

defaultRouter.route("/reg").post(
    async (req, res, next) => { 
        try 
        {
            let dataUserBaru = {...req.body, status:'new_registration'};
            //throw 'ini belum digarap module :#Module Pendaftaran User Baru';
            let hasil = await ModelUser.userModel.create(dataUserBaru);
            res.json(
                {success : true, payload: hasil}
            );
        }
        catch(error)
        {
            next(error);
        }
    }
);


// defaultRouter.route("/hapus").get(async (req, res) => { res.json({success:true,message:"hapus user"})});
// defaultRouter.route("/hello").get(async (req, res) => { res.json({success:true,message:"hello"})});

const rt = {
    group:'/users',
    route:defaultRouter
}

//export default defaultRouter;
export default rt;