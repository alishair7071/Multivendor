const multer= require('multer');

const storage= multer.diskStorage({

    destination: function (req, res, cb){
        cb(null, "uploads/");
    },
    filename: function (req, file, cb){
        const uniqueSuffix= Date.now()+ "-" + Math.round(Math.random() * 19);
        const filename= file.originalname.split(".")[0];
        cb(null, filename + "-" + uniqueSuffix + ".png");
    }
});

exports.upload= multer({storage: storage}); 