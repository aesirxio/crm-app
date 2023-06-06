import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

const mainMenu = [
  {
    text: 'txt_left_menu_email',
    link: `/`,
    icons: '/assets/images/email.png',
    icons_color: '/assets/images/email.png',
    submenu: [
      {
        text: 'txt_left_menu_list_email',
        link: `/email/all`,
      },
      {
        text: 'txt_left_menu_add_new',
        link: `/email/add`,
      },
    ],
  },

  {
    text: 'txt_left_menu_opportunity',
    link: `/opportunity`,
    icons: '/assets/images/lead.png',
    icons_color: '/assets/images/lead.png',
  },
  {
    text: 'txt_left_menu_contact',
    link: `/contacts`,
    icons: '/assets/images/contact.png',
    icons_color: '/assets/images/contact.png',
  },
  {
    text: 'txt_left_menu_company',
    link: `/company`,
    icons: '/assets/images/company.png',
    icons_color: '/assets/images/company.png',
  },
  {
    text: 'txt_left_menu_contact_groups',
    link: '/contact-groups',
    icons: '/assets/images/contact-groups.png',
    icons_color: '/assets/images/contact-groups.png',
  },

  {
    text: 'txt_left_menu_dam',
    link: `/dam`,
    icons: '/assets/images/data-stream.svg',
    icons_color: '/assets/images/data-stream.svg',
  },
];

const settingMenu = [
  {
    name: 'profile',
    text: 'txt_menu_profile',
    link: '/profile',
    icons_fa: faUser,
  },
];

const profileMenu = [
  {
    key: 1,
    text: 'txt_profile',
    link: '/profile',
  },
];

export { profileMenu, mainMenu, settingMenu };
