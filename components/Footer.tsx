
import React from 'react';
import { NavigateTo, StaticPage } from '../types';

interface FooterProps {
    navigateTo: NavigateTo;
}

const FooterLink: React.FC<{ page: StaticPage, navigateTo: NavigateTo, children: React.ReactNode }> = ({ page, navigateTo, children }) => {
    return (
        <a 
            href="#"
            onClick={(e) => {
                e.preventDefault();
                navigateTo({ type: 'static', page });
            }}
            className="px-3 py-1 hover:underline"
        >
            {children}
        </a>
    );
}

export const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const links: { page: StaticPage, label: string }[] = [
    { page: 'about', label: 'About' },
    { page: 'contact', label: 'Contact' },
    { page: 'for-parents', label: 'For Parents' },
    { page: 'privacy', label: 'Privacy Policy' },
    { page: 'terms', label: 'Terms of Service' },
    { page: 'dmca', label: 'DMCA' },
  ];

  return (
    <footer className="bg-teal-500 text-white mt-12">
        <div className="max-w-6xl mx-auto p-4 flex justify-center items-center flex-wrap text-center">
            {links.map((link, index) => (
                <React.Fragment key={link.page}>
                    <FooterLink page={link.page} navigateTo={navigateTo}>{link.label}</FooterLink>
                    {index < links.length - 1 && <span className="opacity-50">|</span>}
                </React.Fragment>
            ))}
        </div>
    </footer>
  );
};
