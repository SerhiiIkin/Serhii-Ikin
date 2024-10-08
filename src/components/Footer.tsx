import { forwardRef } from 'react';

import { footerLinks } from '@variables/linksFooter';

const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-10 bg-primaryDarkBlue p-2 pb-6 md:p-2"
    >
      <ul className="flex flex-wrap gap-x-2">
        {footerLinks.map(({ children, href, id, icon }) => (
          <li
            className="flex items-center gap-x-2 text-primaryLigth xl:hover:text-primaryOrange xl:hover:duration-500"
            key={id}
          >
            {icon}
            <a href={href} target="_blank">
              {children}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
});

export default Footer;
