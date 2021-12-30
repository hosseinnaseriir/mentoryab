const User = require("../../model/auth/User");
const bcrypt = require("bcryptjs");

exports.userController = async (req, res) => {
    
    const {
        fullName,
        email,
        password,
        confirmPassword,
        iWantBeMentor,
        iWantBeTeacher
    } = req.body;

    try {

        await User.registerValidation(req.body);

        let user = await User.findOne({
            email
        });

        res.setHeader("Content-Type", "application/json");

        if (user) return res.status(404).json({
            errors: 'کاربری با این ایمیل قبلا ثبت شده است !'
        });

        await User.create({
            fullName,
            email,
            password: await bcrypt.hash(password, 10),
            confirmPassword: await bcrypt.hash(password, 10),
            iWantBeMentor,
            iWantBeTeacher
        });

        return res.status(201).json({
            message: `${fullName} عزیز ، شما با موفقیت ثبت نام شدید !`
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            errors: err.errors || err
        });
    }

}