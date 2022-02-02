const yup  = require('yup');

exports.completeUserYupSchema = yup.object().shape({
    userID: yup.mixed().required('آیدی کاربر الزامی است !').nullable(true),
    // expertise: yup.string().required('تچربه کاری الزامی است !'),
    specialty: yup.string().required(' مقدار کار الزامی است'),
    company: yup.string().required('محل کار الزامی است'),
    workExperience: yup.number('تجربه کاری به عدد باشد !').required('تچربه کاری الزامی است !'),
    resume: yup.string(),
    province: yup.string().required(' مقدار استان الزامی است'),
    city: yup.string().required(' مقدار شهر الزامی است'),
    address: yup.string().required(' مقدار آدرس الزامی است'),
    birthDay: yup.string().required(' مقدار تاریخ تولد الزامی است'),
    phoneNumber: yup.number('فرمت شماره تلفن صحیح نیست').required(' مقدار شماره تلفن الزامی است'),
    socialMedia: yup.array(),
    createAt: yup.date().default(function () {
        return new Date();
    })
});