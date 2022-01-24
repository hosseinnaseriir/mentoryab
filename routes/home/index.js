const {
    Router
} = require("express");
const authenticate = require("../../middlewares/auth/authenticate");
const User = require("../../model/auth/User");

const route = Router();

const menu =  [{
        id: 'services',
        name: 'سرویس ها',
        path: '/services',
        childs: [{
                id: 'mentoryab-child',
                name: 'منتوریاب',
                path: '/mentoryab',
            }
        ]
    },
    {
        id: 'mentoryab',
        name: 'منتوریاب',
        path: '/mentoryab',
    },
    {
        id: 'articles',
        name: 'مقالات',
        path: '/articles',

    },
    {
        id: 'aboutUs',
        name: 'درباره ما',
        path: '/about-us',

    },
    {
        id: 'contactUs',
        name: 'تماس با ما',
        path: '/contact-us',
    }
]



exports.header = route.get('/get-header', async (req, res) => {
        res.status(200).json({
            logo:null,
            menu,
            fullName:null
        })
});

exports.userHeader = route.get('/get-user-header', authenticate, async (req, res) => {
    if (res.header('ath-token')) {
        let user = await User.findById(req.user?._id);
        if (!user) return res.status(500).json({
            error: ['server Error !']
        });
        res.status(200).json({
            logo:null,
            menu,
            fullName: user.fullName
        })
    }
});
