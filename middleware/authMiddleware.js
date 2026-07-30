const { getUser } = require('../service/auth');

// async function rectricttoLoginUserOnly(req,res,next) {
//     const userUid = req.cookies.uid;
//     res.locals.user = req.cookies.uid || null;
//     if(!userUid) return res.redirect("/login");

//     const user = getUser(userUid);
//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next(); 

    
// } 

function checkForAuthentication(req, res, next) {
    
    const token = req.cookies?.uid;
    req.user = null;

    if (!token) {
        return next();
    }

    const user = getUser(token);

    req.user = user;

    return next();
}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect('/login');
        if (!roles.includes(req.user.role))
            return res.status(403).send("Unauthorized");
        return next();
    }
}
module.exports={
   checkForAuthentication,
   restrictTo
}