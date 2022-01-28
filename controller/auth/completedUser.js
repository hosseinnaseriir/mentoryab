const bcrypt = require("bcryptjs");
const CompletedUser = require("../../model/auth/CompletedUser");
const User = require("../../model/auth/User");

exports.completedUserController = async (req, res) => {

    // console.log( 'complete formdata000000000000' , req.body);
    console.log( 'complete formdata111111111111' , req.file);
    console.log( 'complete formdata222222222222' , req.file.buffer);


    // const {
    //     userID,
    //     expertise,
    //     job,
    //     company,
    //     workExperience,
    //     resume,
    //     province,
    //     city,
    //     address,
    //     birthday,
    //     socialMedia,
    //     bithday,
    //     phoneNumber
    // } = req.body;

    // try {

    //     await CompletedUser.completeUserValidation(req.body);


    //     let user = await User.findById(userID);

    //     if (!user) return res.status(404).json({
    //         errors: 'کاربر پیدا نشد !'
    //     });

    //     let isCreated = await CompletedUser.find({
    //         userID: user._id
    //     })

    //     console.log(isCreated)
    //     console.log(isCreated.length)

    //     res.setHeader("Content-Type", "application/json");
    //     if (isCreated.length) return res.status(404).json({
    //         errors: 'پروفایل شما تکمیل شده ، لطفا نسبت به ویرایش آن اقدام کنید !'
    //     });

    //     await CompletedUser.create({
    //         userID,
    //         expertise,
    //         job,
    //         company,
    //         workExperience,
    //         resume,
    //         province,
    //         city,
    //         address,
    //         birthday,
    //         socialMedia,
    //         bithday,
    //         phoneNumber,
    //     });

    //     return res.status(201).json({
    //         message: `${user.fullName} عزیز ،  پروفایل شما با موفقیت ثبت شد !`
    //     })

    // } catch (err) {
    //     res.status(400).json({
    //         errors: err.errors || err
    //     });
    // }

}

