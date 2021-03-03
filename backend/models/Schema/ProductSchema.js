import mongoose, {Schema, SchemaTypes} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator';

let ProductSchema = new Schema({
    // kode produk
    sku : { 
        type: mongoose.SchemaTypes.String, 
        maxLength:[20, 'Maksimum Panjangnya 20 karakter'], 
        required:true,
        unique:true
    },
    // nama produk
    nama_produk: {
        type:mongoose.SchemaTypes.String, 
        required: true
    },

    // jenis produk
    jenis_produk: {
        type:mongoose.SchemaTypes.String, 
        required: true
    },

    // nama file foto maksimum ada 4 file dan harus berupa file image
    photo : [mongoose.SchemaTypes.String],
    // riwayat perubahan harga
    riwayat_harga:[
        {
            tgl:   {
                type:mongoose.SchemaTypes.Date,
                required:[true,'Tanggal Perubahan Data Harga harus diisi']
            },
            harga:{
                type: mongoose.SchemaTypes.Decimal128,
                required:[true,'Harga harus diisi']
            },
            is_active: mongoose.SchemaTypes.Boolean
        }
    ]
}, {
    timestamps: true
})

ProductSchema.plugin(uniqueValidator);






export const Product = mongoose.model('product', ProductSchema);