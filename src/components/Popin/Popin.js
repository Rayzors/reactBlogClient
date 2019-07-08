import React from 'react';

function Popin({ isOpen, toggle, children }) {
  return (
    <div className={`popin ${isOpen ? `popin--open` : ``}`}>
      <div className="popin__background" onClick={toggle} />
      <div className="popin__content">{children}</div>
    </div>
  );
}

export default Popin;
