import Express from 'express';
import * as Utilities from './../core/utilities/utils'

const defaultRouter = Express.Router();

defaultRouter.route("/").get(async (req, res) => { 
    //res.json({success:true,message:"welcome"})}
    res.render(Utilities.GetView('index')); }
);
defaultRouter.route("/about").get(async (req, res) => { 
    res.render(Utilities.GetView('about')); 
});
defaultRouter.route("/contact").get(async (req, res) => { 
    res.render(Utilities.GetView('contact')); 
});
defaultRouter.route("/hello").get(async (req, res) => { 
    res.render(Utilities.GetView('hello')); 
});

const rt = {
    group:'/',
    route:defaultRouter
}

//export default defaultRouter;
export default rt;