const multer = require('multer');
const uuid = require('uuid').v4;
const CompletedUser = require("../../model/auth/CompletedUser");
const User = require("../../model/auth/User");

function handleUploadImage(
    imagesName = ["image"],
 ) {
    const storage = multer.diskStorage({
        destination:  (req, file, cb) => {
            cb(null, `./public/uploads/`);
        },
        filename: (req, file, cb) => {
            cb(null, `${uuid()}_${file.originalname}`)
        }
    })

    const fileFilter = async (req, file, cb) => {
                   
        let user = await User.findById(req.userID);

        if (!user) return cb('کاربر پیدا نشد !', false);

        let isCreated = await CompletedUser.find({
            userID: user._id
        });

        res.setHeader("Content-Type", "application/json");
        if (isCreated.length) return cb('پروفایل شما تکمیل شده ، لطفا نسبت به ویرایش آن اقدام کنید !', false);
       
        if (
            (file.mimetype === 'image/jpeg') ||
            (file.mimetype === 'application/pdf') ||
            (file.mimetype === 'image/png')
        ) {
            cb(null, true)
        } else {
            cb("فایل با این پسوند ، پشتیبانی نمیشود", false);
        }
    }

    let fileFields = imagesName.map(item => {
        return {
            name: item
        }
    });

    let upload = multer({
        limits: {
            fileSize:4000000
        },
        dest: "uploads/",
        storage,
        fileFilter
    }).fields(fileFields)

    upload(req, res, function (err) {
        if (err) {
            console.log("There was an error uploading the image.");
        }
        res.json({
            success: true,
            message: 'Image uploaded!'
        });
    })

    // return upload( req , res , (err) => {
    //     if (err) {
    //         console.log(err);
    //         res.send(["مشکلی پیش آمده", err])
    //     } else {
    //         res.status(200).send("فایل آپلود شد")
    //     }
    // });

}

module.exports = handleUploadImage;