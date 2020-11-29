const Menu = [
  {header: '#APPS'},
  {
    title: 'ยินดีต้อนรับ',
    group: 'apps',
    icon: 'home',
    name: 'Home',
    href: '/'
  },
  {
    title: 'Login',
    group: 'apps',
    icon: 'chat_bubble',
    name: 'Login',
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
