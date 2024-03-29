const Menu = [
  {header: '#เมนูหลัก สพท.'},
  {
    title: 'ยินดีต้อนรับ',
    group: 'apps',
    icon: 'home',
    name: 'Home',
    href: '/area'
  },
  {
    title: 'ข้อมูลสำนักงานเขตฯ',
    group: 'apps',
    icon: 'library_books',
    name: 'Info',
    href: '/area/info'
  },
  {header: '#ระบบงาน'},
  {
    title: 'งานทะเบียนประวัติ',
    group: 'registration',
    component: 'registration',
    icon: 'group_add',
    items: [
      {name: '1-teachers', title: 'ข้าราชการครูและบุคลากรทางการศึกษา', href: '/area/personels/10'},
      // {name: '2-personels', title: 'ข้าราชการพลเรือนสามัญ', href: '/area/personels/11'},
      {name: '3-government-emp', title: 'พนักงานราชการ', href: '/area/personels/23'},
      {name: '4-permanent-emp', title: 'ลูกจ้างประจำ', href: '/area/personels/15'},
      {name: '5-temporary-emp', title: 'ลูกจ้างชั่วคราว', href: '/area/personels/17'},
      {name: '6-personels-38', title: 'บุคลากรทางการศึกษา 38 ค.(2)', href: '/area/personels/38'},
      {name: '7-teachers-update', title: 'สืบค้นทะเบียนประวัติ', href: '/area/personels/find'},
      // {name: 'teachers-add', title: 'เพิ่มประวัติครู/บุคลากร', href: '/area/teachers/add'},
      // {name: 'checking', title: 'ตรวจสอบความสมบูรณ์', href: '/area/checking'},
      // {name: 'cgd-import', title: 'นำเข้าข้อมูลครู/บุคลากร (cgd)', href: '/area/cgd/import'},
      // {name: 'export', title: 'ส่งออกข้อมูลครู/บุคลากร', href: '/area/export'},

    ]
  },
  {
    title: 'งานอัตรากำลัง',
    group: 'manpower',
    component: 'manpower',
    icon: 'assignment_ind',
    items: [
      // {name: 'manpower', title: 'ตำแหน่ง/อัตรากำลัง', href: '/area/manpower'},
      {name: '1-teachers', title: 'ข้าราชการครูและบุคลากรทางการศึกษา', href: '/area/manpower/10'},
      // {name: '2-personels', title: 'ข้าราชการพลเรือนสามัญ', href: '/area/manpower/11'},
      {name: '3-government-emp', title: 'พนักงานราชการ', href: '/area/manpower/23'},
      {name: '4-permanent-emp', title: 'ลูกจ้างประจำ', href: '/area/manpower/15'},
      {name: '5-temporary-emp', title: 'ลูกจ้างชั่วคราว', href: '/area/manpower/17'},
      {name: '6-personels-38', title: 'บุคลากรทางการศึกษา 38 ค.(2)', href: '/area/manpower/38'},
    ]
  },
  // {
  //   title: 'งานสรรหาบุคคล',
  //   group: 'recruitment',
  //   component: 'recruitment',
  //   icon: 'person_search',
  //   items: [
  //     {name: 'recruitment', title: 'สรรหาและบรรจุ', component: '/area/recruitment'},
  //     {name: 'removal', title: 'แต่งตั้งโยกย้าย', component: '/area/removal'},
  //     {name: 'retirement', title: 'ออกจากราชการ', component: '/area/retirement'},

  //   ]
  // },
  // {
  //   title: 'งานเครื่องราชอิสริยาภรณ์',
  //   group: 'insignia',
  //   component: 'insignia',
  //   icon: 'star',
  //   items: [
  //     {name: 'insignia-form', title: 'การขอเครื่องราชฯ', href: '/area/insignia_form'},
  //     {name: 'insignia-checking', title: 'ตรวจสอบคุณสมบัติ', badge: 'new', href: '/area/insignia_checking'},
  //     {name: 'insignia-regist', title: 'บันทึกการได้รับฯ', href: '/area/insignia_regist'},
  //     {name: 'insignia-report', title: 'รายงานเครื่องราชฯ', href: '/area/insignia_report'},

  //   ]
  // },
  // {
  //   title: 'รายงาน',
  //   group: 'report',
  //   component: 'report',
  //   icon: 'description',
  //   items: [
  //     {name: 'report-teacher', title: 'ข้อมูลครูและบุคลากร', href: '/area/report_teacher'},
  //     {name: 'report-director', title: 'ข้อมูลผู้บริหาร', badge: 'new', href: '/area/report_director'},
  //     {name: 'report-personel', title: 'ข้อมูลบุคลากรใน สพท.', href: '/area/report_personel'},
  //     {name: 'report-retire', title: 'ข้อมูลเกษียณราชการ', href: '/area/report_retire'},
      
  //   ]
  // },
  {divider: true},
  {header: '#ตัวเลือก'},
  {
    title: 'โรงเรียนในสังกัด',
    group: 'extra',
    icon: 'account_balance',
    href: '/area/schools'
  },
  {
    title: 'ข้อมูลส่วนตัว',
    group: 'extra',
    icon: 'text_snippet',
    href: '/area/profile'
  },  
  {
    title: 'ออกจากระบบ',
    group: 'extra',
    icon: 'meeting_room',
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
