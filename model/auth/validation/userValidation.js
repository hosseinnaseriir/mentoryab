const yup = require('yup');

exports.userYupSchema = yup.object().shape({
    fullName: yup.string().required('مقدار نام الزامی است !').min(3, 'نام شما باید بیش از 3 کاراکتر باشد').max(255 , 'نام شما باید کمتر از 255 کاراکتر باشد'),
    email: yup.string().email('مقدار ایمیل اشتباه است').required('مقدار ایمیل الزامی است'),
    password: yup.string().min(4, 'رمز شما باید بیش از 4 کاراکتر باشد').max(255).required('مقدار رمز الزامی است !'),
    confirmPassword: yup.string().min(4, ' تکرار رمز شما باید بیش از 4 کاراکتر باشد ').max(255).required('تکرار رمز الزامی است !')
        .oneOf([yup.ref('password'), null], 'رمز عبور و تکرار آن متفاوت است'),
    createAt: yup.date().default(function () {
        return new Date();
    }),
});