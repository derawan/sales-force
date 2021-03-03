import Express from 'express';
import {UserGroupRepository} from './../models/Repository/UserGroupRepository';
import mongoose from 'mongoose';


const defaultRouter = Express.Router();

defaultRouter.route("/").get(
    async (req, res, next) => { 
        try 
        {
            let hasil = "test";
            
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

defaultRouter.route("/create").post(
    async (req, res, next) => { 
        try 
        {
            let databaru = {
                group_pengguna: req.body.group_pengguna
            }

            let callback = (error_message, error_object) => {
                //console.log(error_message, error_object);
                throw error_object;
            }
            // validasi data


            // simpan data
            let repo = new UserGroupRepository(mongoose.Connection);
            let hasil = await repo.TambahData(databaru, callback);
            //UserGroupRepository TambahData(dataBaru, callBack)
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


defaultRouter.route("/update").post(
    async (req, res, next) => { 
        try 
        {
            let id = req.body.id
            let databaru = {
                group_pengguna: req.body.group_pengguna
            }

            let callback = (error_message, error_object) => {
                //console.log(error_message, error_object);
                throw error_object;
            }
            // validasi data


            // simpan data
            let repo = new UserGroupRepository(mongoose.Connection);
            let hasil = await repo.UbahData(id, databaru, callback);
            
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



const rt = {
    group:'/role',
    route:defaultRouter
}

//export default defaultRouter;
export default rt;