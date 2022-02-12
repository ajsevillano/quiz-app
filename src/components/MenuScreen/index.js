import './MenuScreen.css';

const MenuScreen = ({ children, screenAnimation }) => {
  return (
    <div className="menu-screen-container">
      <header className="menu-screen-header">
        <div
          className={
            screenAnimation
              ? 'menu-screen-modal fade-in'
              : 'menu-screen-modal hidden'
          }
        >
          {children}
        </div>
      </header>
    </div>
  );
};

export default MenuScreen;
