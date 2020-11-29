const Menu = [
  {header: '#เมนูหลักผู้ดูแลระบบ'},
  {
    title: 'ยินดีต้อนรับ',
    group: 'apps',
    icon: 'home',
    name: 'Home',
    href: '/admin'
  },
  {header: '#ระบบงาน'},
  {
    title: 'รายงาน',
    group: 'report',
    component: 'report',
    icon: 'description',
    items: [
      {name: 'teacher', title: 'รายงาน', href: '/admin/teacher'},
      {name: 'personel', title: 'รายงาน', href: '/admin/personel'},
      {name: 'info', title: 'รายงาน', href: '/admin/info'},

    ],
  },  
  {
    title: 'โรงเรียน',
    group: 'apps',
    icon: 'account_balance',
    href: '/admin/schools'
  },
  {
    title: 'ครูและบุคลากรทางการศึกษา',
    group: 'apps',
    icon: 'contacts',
    href: '/admin/teachers'
  },
  {
    title: 'บุคลากรในสำนักงานเขตฯ',
    group: 'apps',
    icon: 'how_to_reg',
    href: '/admin/personels'
  },
  {
    title: 'สำนักงานเขตพื้นที่การศึกษา',
    group: 'apps',
    icon: 'library_books',
    href: '/admin/areas'
  },
  {divider: true},
  {header: '#ตัวเลือก'},
  {
    title: 'ผู้ใช้งานระบบ',
    group: 'extra',
    icon: 'person_add',
    href: '/admin/users'
  },
  {
    title: 'ตั้งค่าระบบ',
    group: 'extra',
    icon: 'tune',
    href: '/admin/setting'
  },
  {
    title: 'ข้อมูลส่วนตัว',
    group: 'extra',
    icon: 'text_snippet',
    href: '/admin/profile'
  },
  {
    title: 'ออกจากระบบ',
    group: 'extra',
    icon: 'mdi-power',
    href: '/login'
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
