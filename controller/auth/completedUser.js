const bcrypt = require("bcryptjs");
const CompletedUser = require("../../model/auth/CompletedUser");
const User = require("../../model/auth/User");
const mongoose = require("mongoose");
const fs = require('fs');
const {getPath} = require('../../utils/getPath');

exports.completedUserController = async (req, res) => {

    // console.log('complete formdata111111111111', req.files.avatar[0]);

    fs.readFile(req.files.avatar[0].path, function (err, data) {
        console.log(data)
        console.log(err);
        fs.writeFile(getPath(`public/uploads/${req.files.avatar[0].filename}.png`), data,(res) => {
            console.log(res)
        });
    });


    const {
        userID,
        expertise,
        specialty,
        company,
        workExperience,
        resume,
        province,
        city,
        address,
        birthDay,
        socialMedia,
        bithday,
        phoneNumber
    } = req.body;

    let ID = mongoose.Types.ObjectId(userID)
    // console.log({
    //     ...req.body,
    //     userID: ID
    // });

    try {

        await CompletedUser.completeUserValidation({
            ...req.body,
            userID: ID
        });

        let user = await User.findById(userID);

        if (!user) return res.status(404).json({
            errors: 'کاربر پیدا نشد !'
        });

        let isCreated = await CompletedUser.find({
            userID: user._id
        })

        res.setHeader("Content-Type", "application/json");
        if (isCreated.length) return res.status(404).json({
            errors: 'پروفایل شما تکمیل شده ، لطفا نسبت به ویرایش آن اقدام کنید !'
        });

        await CompletedUser.create({
            userID: ID,
            expertise,
            specialty,
            company,
            workExperience,
            resume,
            province,
            city,
            address,
            birthDay,
            socialMedia,
            bithday,
            phoneNumber,
            avatar: null,
            resume: null
        });

        return res.status(201).json({
            message: `${user.fullName} عزیز ،  پروفایل شما با موفقیت ثبت شد !`
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            errors: err.errors || err
        });
    }

}