import { FaFacebook, FaGithub, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

export const footerLinks = [
  {
    id: '1',
    children: 'messileonl@gmail.com',
    href: 'mailto:messileonl@gmail.com',
    icon: <IoMail />,
  },
  {
    id: '2',
    children: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100007424714728',
    icon: <FaFacebook />,
  },
  {
    id: '3',
    children: '4550246519',
    href: 'tel:+4550246519',
    icon: <FaPhoneAlt />,
  },
  {
    id: '4',
    children: 'Linkedin',
    href: 'https://www.linkedin.com/in/serhii-ikin-608054227/',
    icon: <FaLinkedin />,
  },
  {
    id: '5',
    children: 'GitHub',
    href: 'https://github.com/SerhiiIkin',
    icon: <FaGithub />,
  },
];
