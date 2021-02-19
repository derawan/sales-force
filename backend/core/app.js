import Path from 'path';
import Express from 'express';
import DotEnv from 'dotenv';
import Morgan from 'morgan';
import Fs from 'fs';
//import errorhandler from 'errorhandler';
import Cookie from 'cookie-parser';
//https://www.npmjs.com/package/express-ejs-layouts
import expressEjsLayouts from 'express-ejs-layouts';
//https://www.npmjs.com/package/express-session
import Session from 'express-session';
import Cors from 'cors';


//import jwt from 'jsonwebtoken';


// import Mongoose from 'mongoose';
import ConnectMongo from 'connect-mongo';


import * as Route from './../routes/index';
// import * as Route from  './../routes/main'
// import * as Route1 from  './../routes/user'



// import Passport from 'passport';
// import InitPassport from './../passport.config';
// import users from './../models/users';

import * as Utilities from './utilities/utils';
import * as Connector from './utilities/connector';



export default class App {

    /// constructor 
    constructor (options = {})
    {
        // Initialize Application Configuration
        this.LoadConfiguration();

        // apply middleware
        this.InisialisasiServer();
        
        // register router
        this.DaftarkanRoute();
        
    }

    // Baca File Konfigurasi
    LoadConfiguration() {
        // inisialisasi config
        DotEnv.config();
         
        this.applicationName = Utilities.GetConfig("APP_NAME", 'APP');
        this.applicationVersion = Utilities.GetConfig("APP_VERSION", '1.0.0.0');
        this.applicationPort = Utilities.GetConfig("APP_PORT", 3000);

        this.applicationPublicPath = Utilities.GetConfig("APP_PUBLIC_PATH", 'public');
        this.applicationDBConfig   = Utilities.GetConfig("APP_DB",'mongodb://localhost:27017/mydb');
    }

    

    // Aktifkan request logging menggunakan morgan
    // create a write stream (in append mode) 
    InitializeRequestLogging(app) {
        var accessLogStream = Fs.createWriteStream(Path.join(__dirname, '/../logs/access.log'), { flags: 'a' });
        // enable request logging and save it to accesslogStream
        app.use(Morgan('combined', { stream: accessLogStream }));
    }    

    // Inisialisasi View Engine, Kita menggunakan ejs
    InitializeViewEngine(app) {
        app.set('views', Path.join(__dirname, '../views'));
        app.use(expressEjsLayouts);
        app.set('layout', './layouts/master_layout.ejs');
        app.set('view engine', 'ejs');
    }

    InisialisasiSession(app) {
        /* Configurasi Session */
        this.session_secret = Utilities.GetConfig("APP_SESSION_SECRET", 'my-secret-key');

        // buat storagenya

        let mongoStore = ConnectMongo(Session);
        let connection = Connector.CreateConnection1(this.applicationDBConfig);

        let sessionStore = new mongoStore({
            mongooseConnection : connection,
            collection:'sessions'
        });

        app.use(Session({
            secret: this.session_secret,
            resave: false,
            store:sessionStore,
            saveUninitialized: false
        }));
    }

    // inisialisasi middleware
    InisialisasiServer() {

        // create instance
        this.server = Express();
        let app = this.server;

        // inisialisasi request logger
        this.InitializeRequestLogging(app);
        // inisialisasi view engine
        this.InitializeViewEngine(app);

        // Basic Middleware Setup
        app.use(Express.json());
        app.use(Express.static(this.applicationPublicPath));
        app.use(Express.urlencoded({ extended: true }));

        // enable Cross Origin (CORS)
        app.use(Cors());

        // enable this if you want to enable cookie
        app.use(Cookie());

        // enable this if you want to enable session
        this.InisialisasiSession(app);

    }    

    DaftarkanRoute() {
        let app = this.server;
        
        for(var indeks in Route.default) {
            let route = Route.default[indeks];
            app.use(route.group, route.route);
            
        }


        // // https://expressjs.com/en/starter/faq.html
        // // handle page not found
        app.use(function (req, res) {
            res.status(404);
            res.send('sorry halaman tidak ketemu');
            //res.render(Utilities.GetView("errors/404"));
        })

        // // handle system error 
        app.use(function (err, req, res, next) {
            console.error(err)
            res.status(500);
            res.send('sorry terjadi error bro : ' + err);
            //res.render(Utilities.GetView("errors/500"));
        });
    }




    // start server
    start() {
        let app = this.server;
        app.listen(this.applicationPort, () => {
            console.log(`Server is listening on ${this.applicationPort}\nPress Ctrl+C to Terminate Application`);
        });
    }




    
}



// // register route


// //  

