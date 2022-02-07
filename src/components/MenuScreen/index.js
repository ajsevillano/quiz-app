import { useEffect, useState } from 'react';
import './MenuScreen.css';

const MenuScreen = ({ children }) => {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
  }, []);
  return (
    <div className="menu-screen-container">
      <header className="menu-screen-header">
        <div
          className={
            animation ? 'menu-screen-modal fade-in' : 'menu-screen-modal hidden'
          }
        >
          {children}
        </div>
      </header>
    </div>
  );
};

export default MenuScreen;
