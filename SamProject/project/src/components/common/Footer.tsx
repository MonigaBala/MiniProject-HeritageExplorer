import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">{t('footer.about.title')}</h3>
            <p className="text-neutral-300 mb-4">
              {t('footer.about.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-400 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-neutral-300 hover:text-white transition">
                  {t('nav.explore')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-300 hover:text-white transition">
                  {t('auth.login')}
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-neutral-300 hover:text-white transition">
                  {t('auth.signup')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">{t('footer.categories.title')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  {t('categories.temples')}
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  {t('categories.forts')}
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  {t('categories.monuments')}
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  {t('categories.museums')}
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition">
                  {t('categories.religious')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-neutral-300">
                  {t('footer.contact.address')}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span className="text-neutral-300">+91 044 2345 6789</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span className="text-neutral-300">info@tnheritage.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-12 pt-6 text-center text-neutral-400">
          <p>
            &copy; {currentYear} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;