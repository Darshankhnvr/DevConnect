import multer from "multer";
import path from "path";


//storage engine setup
const storage = multer.diskStorage({
    destination:  (req, file , cb)=>{
        cb(null,"uploads/");
    },
    filename: (req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const filefilter = (req,file,cb)=>{
    const ext = path.extname(file.originalname).toLowerCase();
    if(ext === '.jpg' ||ext ==='.jpeg' || ext === '.png'){
        cb(null,true);
    }
    else
    cb(new Error("only images are allowed"),false);
};

const upload = multer({storage,filefilter});

export default upload;