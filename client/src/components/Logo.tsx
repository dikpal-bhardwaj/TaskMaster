const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#a78bfa', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    
    <circle cx="24" cy="24" r="22" fill="url(#gradient1)" opacity="0.2"/>
    <circle cx="24" cy="24" r="22" stroke="url(#gradient1)" strokeWidth="2" fill="none"/>
    
    <path d="M14 24 L20 30 L34 16" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export default Logo;
