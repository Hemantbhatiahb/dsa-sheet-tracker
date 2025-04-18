import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../redux/userSlice'
import { getCurrentUser } from '../api/users'
import { message } from 'antd'

const Home = () => {
    const {user} = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function getValidUser() {
          try {
            const response = await getCurrentUser();
            dispatch(userActions.setCurrentUser(response.data));
          } catch (error) {
            message.error("Please login again");
            navigate("/login");
          } 
        }
    
        if (localStorage.getItem("token")) {
          getValidUser();
        } else {
          navigate("/login");
        }
      }, []);

  return (
    <div>
        <MainNavigation />
        <Outlet />
    </div>
  )
}

export default Home