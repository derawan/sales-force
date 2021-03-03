import Express from 'express';
import {AreaRepository} from './../models/Repository/AreaRepository';
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
            let repo = new AreaRepository(mongoose.Connection);
            let databaru = {
                nama_area: req.body.nama_area
            }

            let callback = (error_message, error_object) => {
                //console.log(error_message, error_object);
                throw error_object;
            }
            // validasi data
            if (!databaru.nama_area)
            {
                res.json({success : false, message:'nama area harus ada', payload: hasil})
            }
            else {
                let hasil = await repo.AmbilDataDetail({nama_area:databaru.nama_area}, (error_message, error_object)=>{

                });
                if (hasil) 
                {
                    res.json({success : false, message:'nama area sudah pernah didaftarkan', payload: hasil})
                }
            }


            // simpan data
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
                nama_area: req.body.nama_area
            }

            let callback = (error_message, error_object) => {
                //console.log(error_message, error_object);
                throw error_object;
            }
            // validasi data


            // simpan data
            let repo = new AreaRepository(mongoose.Connection);
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
    group:'/area',
    route:defaultRouter
}

//export default defaultRouter;
export default rt;