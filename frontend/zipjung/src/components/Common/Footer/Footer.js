// Footer.js
import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <div className="footer-top">
    <footer className="footer">
      <div className="footer-content">
        <a href="/sitemap">사이트맵</a>
        | <a href="/terms">제휴문의</a>
        | <a href="/about">이용약관</a>
        | <a href="/ad">고객센터</a>
        | <span>© ZIPZOONG Corp.</span>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
