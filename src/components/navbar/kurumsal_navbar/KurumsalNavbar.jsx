import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../../navbar/navbar.css";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} alt="" />
      </div>
      <div className={`rightSide ${openMenu ? "showMenu" : "hideMenu"}`}>
      <Link to="/kurumsal-anasayfa">Anasayfa</Link>
          <Link to="/kurumsal-ilanlar">İlanlar</Link>
          <Link to="/kurumsal-onay-kutusu">Onay Kutusu</Link>
          <Link to="/kurumsal-profil">Profilim</Link>
      </div>
      <button className="menuButton" onClick={toggleMenu}>
        <ReorderIcon />
      </button>
    </div>
  );
}

export default Navbar;
