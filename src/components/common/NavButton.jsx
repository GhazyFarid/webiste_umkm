const NavButton = ({ onClick, children, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2.5 md:p-3 bg-white/90 backdrop-blur-sm text-slate-800 rounded-xl shadow-lg
      hover:bg-primary hover:text-white active:scale-95 transition-all duration-200 ${className}`}
  >
    {children}
  </button>
);

export default NavButton;
