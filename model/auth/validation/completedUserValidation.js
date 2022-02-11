const yup  = require('yup');

exports.completeUserYupSchema = yup.object().shape({
    userID: yup.mixed().required('آیدی کاربر الزامی است !').nullable(true),
    specialty: yup.string().required(' مقدار کار الزامی است'),
    tool: yup.string().required(' مقدار جزییات تخصص الزامی است'),
    company: yup.string().required('محل کار الزامی است'),
    workExperience: yup.number('تجربه کاری به عدد باشد !').required('تچربه کاری الزامی است !'),
    personPosition: yup.string().required(' !موقعیت شغلی الزامی است '),
    resume: yup.string().nullable(true),
    avatar: yup.string().nullable(true),
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