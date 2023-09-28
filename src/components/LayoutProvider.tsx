"use client";
import React, { useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch , useSelector } from "react-redux";

import { SetcurrentUser } from "@/redux/usersSlice";
import { ReduxProvider } from "./ReduxProvider";
import { SetLoading } from "@/redux/loaderSlice";
import Loader from "./Loader";
import { message } from "antd";




interface ParentProps {
  children: React.ReactNode;
}

const LayoutProvider: React.FC<ParentProps> = ({ children }) => {

  const dispatch = useDispatch();

  const {currentUser} = useSelector((state:any)=>state.users);

  const {loading} = useSelector((state:any)=>state.loader);

  const router = useRouter();





  const [menuItems, setMenuItems] = useState([
    {
      name: "Home",
      path: "/",
      icon: "ri-home-7-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-line",
    },
    {
      name: "Applications",
      path: "/applications",
      icon: "ri-file-list-2-line",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "ri-settings-2-line",
    },
    {
      name: "Saved",
      path: "/saved",
      icon: "ri-save-line",
    },
  ]);

  const pathName = usePathname();

  //   get the current user

  const getCurrentUser = async () => {
    try {
        dispatch(SetLoading(true));

      const response = await axios.get(
        "http://localhost:3000/api/users/currentuser"
      );

      dispatch(SetcurrentUser(response.data.data));
    } catch (error: any) {
      console.log(error.response.data.message || "Something went wrong");
    }
    finally{
        dispatch(SetLoading(false))
    }
  };

  useEffect(() => {
    if(pathName !== '/login' && pathName !== '/register'){
        getCurrentUser();
    }
  }, [pathName]);


  const [IsSidebarExpanded, setIsSidebarExpanded] = useState(true);


  const onLogout = async ()=>{
    try{
        dispatch(SetLoading(true));
        const response = await axios.post('/api/users/logout');
        message.success(response.data.message);
        
        dispatch(SetcurrentUser(null));
        router.push('/login')
    }
    catch(error:any){
        message.error(error.response.data.message || "Something went wrong")
    }
    finally{
        dispatch(SetLoading(false));
    }
  }

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>

      <body>
        <ReduxProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#213555",
              },
            }}
          >

            {/* IF THE ROUTE IS PUBLIC (register, login) then dont show the pages */}


            {/* Loader */}

            {
                loading && <Loader />
            }



            

            {pathName === "/login" || pathName === "/register" ? (
              <>
                <div>{children}</div>
              </>
            ) : (
              <>
                <div className="layout-parent">
                  <div className="sidebar">
                    <div className="logo">
                      {IsSidebarExpanded && <h1>Orion Jobs</h1>}

                      {!IsSidebarExpanded && (
                        <i
                          className="ri-menu-line"
                          onClick={() => {
                            setIsSidebarExpanded(!IsSidebarExpanded);
                          }}
                        ></i>
                      )}

                      {IsSidebarExpanded && (
                        <i
                          className="ri-close-line"
                          onClick={() => {
                            setIsSidebarExpanded(!IsSidebarExpanded);
                          }}
                        ></i>
                      )}
                    </div>
                    <div>
                      {menuItems.map((item, index) => {
                        const isActive = pathName === item.path;
                        return (
                          <div
                            className={`menu-item ${
                              isActive ? "active-menu-item" : ""
                            }`}
                          >
                            <i className={item.icon}></i>

                            <span>{IsSidebarExpanded && item.name}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="user-info">
                      {IsSidebarExpanded && (
                        <div className="flex flex-col">
                          <span>{currentUser?.name}</span>
                          <span>{currentUser?.email}</span>
                        </div>
                      )}

                      <div onClick={onLogout}>
                        <i className="ri-logout-box-r-line"></i>
                      </div>
                    </div>
                  </div>

                  <div className="body">{children}</div>
                </div>
              </>
            )}
          </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default LayoutProvider;
