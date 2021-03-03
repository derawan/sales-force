import Express from 'express';
import {ProductRepository} from './../models/Repository/ProductRepository';
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
                sku: req.body.sku,
                nama_produk: req.body.nama_produk,
                jenis_produk: req.body.jenis_produk,
                photo:'',
                riwayat_harga : []
            }

            let callback = (error_message, error_object) => {
                //console.log(error_message, error_object);
                throw error_object;
            }
            // validasi data
            


            // simpan data
            let repo = new ProductRepository(mongoose.Connection);
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
                sku: req.body.sku,
                nama_produk: req.body.nama_produk,
                jenis_produk: req.body.jenis_produk,
                photo:'',
                riwayat_harga : []
            }

            let callback = (error_message, error_object) => {
                //console.log(error_message, error_object);
                throw error_object;
            }
            // validasi data


            // simpan data
            let repo = new ProductRepository(mongoose.Connection);
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
    group:'/products',
    route:defaultRouter
}

//export default defaultRouter;
export default rt;