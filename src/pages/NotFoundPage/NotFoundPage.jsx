import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>Ooops... Page is not found!</h2>
      <p>
        Повернутися на <NavLink to="/">головну сторінку</NavLink>.
      </p>
    </div>
  );
};
export default NotFoundPage;
