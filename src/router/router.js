 const router = [
    {
        title: '控制台',
        icon: 'home',
        key: '/index'
    },
    {
        title: '用户管理',
        icon: 'laptop',
        key: '/index/user',
        child: [
            {
                title: '用户列表',
                icon: 'home',
                key: '/index/user/list'
            },
            {
                title: '添加用户',
                icon: 'home',
                key: '/index/user/add'
            }
        ]
    },
    {
        title: '部门管理',
        icon: 'bars',
        key: '/bars/index',
        child: [
            {
                title: '部门列表',
                icon: 'home',
                key: '/bars/index'
            },
            {
                title: '添加部门',
                icon: 'home',
                key: '/bars/add'
            },
        ]
    },
    {
        title: '职位管理',
        icon: 'home',
        key: '/home/entry'
    },
    {
        title: '考勤管理',
        icon: 'home',
        key: '/home.about'
    }
]
export default router;