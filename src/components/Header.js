import React from "react";
import appIcon from '../icons/appIcon.png'
import { useNavigate } from "react-router-dom";
import { useDispatch, UseDispatch } from "react-redux";
import { removerUser } from "../util/userSlice";

const Header = () => {

const dispatch= useDispatch()
const navigate = useNavigate()
 const onClickLogoutButton  = () => {
    dispatch(removerUser());
    navigate('/')
 }
  return (
    <div className="border-2 flex justify-between bg-lime-50">
      <div className="w-28 p-1">
        <img src={appIcon}></img>
      </div>
      <div className="flex items-center">
        <ul className="flex p-3 m-5 text-xl">
          <li className="p-3"> Home
            {/* <Link to="/">Home</Link> */}
          </li>
          <li className="p-3"> About
            {/* <Link to="/about">About</Link> */}
          </li>
          <li className="p-3"> List
            {/* <Link to="/Contact">Contact</Link> */}
          </li>
          <li className="p-3"> create 
            {/* <Link to="/groceory">gorceory </Link> */}
          </li> 
          <li className="p-3">
            <button onClick={onClickLogoutButton}>
                log out
            </button>
            </li>  
        </ul>
      </div>
    </div>
  );
};

export default Header;
