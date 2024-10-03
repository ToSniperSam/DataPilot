export default [
    {
      path: '/home',
      name: 'home',
      label: 'home',
      icon: 'HomeOutlined',
      url: '/home/index'
    },
    {
      path: '/mall',
      name: 'mall',
      label: 'mall',
      icon: 'ShopOutlined',
      url: '/mall/index'
    },
    {
      path: '/user',
      name: 'user',
      label: 'user',
      icon: 'UserOutlined',
      url: '/user/index'
    },
    {
      path: '/other',
      label: 'other',
      icon: 'SettingOutlined',
      children: [
        {
          path: '/Others/page1',
          name: 'page1',
          label: 'page1',
          icon: 'SettingOutlined'
        }
      ]
    }
  ];