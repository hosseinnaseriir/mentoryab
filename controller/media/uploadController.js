const multer = require('multer');
const uuid = require('uuid').v4;


function handleUploadImage(
    imagesName = ["image"],
    folder = '',
    fileSize = 4000000) {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./public/uploads/`);
        },
        filename: (req, file, cb) => {
            cb(null, `${uuid()}_${file.originalname}`)
        }
    })

    const fileFilter = (req, file, cb) => {
      
        if (
            (file.mimetype === 'image/jpeg') ||
            (file.mimetype === 'application/pdf') ||
            (file.mimetype === 'image/png')
        ) {
            cb(null, true)
        } else {
            cb("لطفا عکس با پسوند jpg آپلود کنید", false);
        }
    }

    let fileFields = imagesName.map(item => {
        return {
            name: item
        }
    })

    return multer({
        limits: {
            fileSize
        },
        dest: "uploads/",
        storage,
        fileFilter
    }).fields(fileFields)

    // upload((req, res, err) => {
    //     if (err) {
    //         console.log(err);
    //         res.send(["مشکلی پیش آمده", err])
    //     } else {
    //         res.status(200).send("فایل آپلود شد")
    //     }
    // })


}

module.exports = handleUploadImage;