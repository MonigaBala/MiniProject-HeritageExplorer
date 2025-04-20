import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageSelectorProps {
  onClose?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onClose }) => {
  const { languages, currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (code: string) => {
    changeLanguage(code);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="py-1">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageChange(language.code)}
          className={`w-full text-left px-4 py-2 text-sm ${
            currentLanguage === language.code
              ? 'bg-primary-50 text-primary-700 font-medium'
              : 'text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <span className="mr-2">{language.nativeName}</span>
          <span className="text-neutral-500">({language.name})</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;