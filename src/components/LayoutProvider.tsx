"use client";
import React, { useState } from "react";
import { ConfigProvider } from "antd";
import { usePathname } from "next/navigation";

interface ParentProps {
  children: React.ReactNode;
}

const LayoutProvider: React.FC<ParentProps> = ({ children }) => {
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


  const [IsSidebarExpanded, setIsSidebarExpanded] = useState(true);


  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>

      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#213555",
            },
          }}
        >
          {/* IF THE ROUTE IS PUBLIC (register, login) then dont show the pages */}

          {pathName === "/login" || pathName === "/register" ? (
            <>
              <div>{children}</div>
            </>
          ) : (
            <>
              <div className="layout-parent">
                <div className="sidebar">
                  <div className="logo">
                    {
                        IsSidebarExpanded && <h1>Orion Jobs</h1>
                    }


                    {
                        !IsSidebarExpanded && (
                            <i className="ri-menu-line" onClick={()=>{
                                setIsSidebarExpanded(!IsSidebarExpanded)
                            }} ></i>
                        )
                    }

                    {
                        IsSidebarExpanded && (
                            <i className="ri-close-line" onClick={()=>{
                                setIsSidebarExpanded(!IsSidebarExpanded)
                            }} ></i>
                        )
                    }

                    
                  </div>
                  <div>
                    {menuItems.map((item, index) => {
                        const isActive = pathName === item.path;
                      return (

                        <div className={`menu-item ${isActive ? "active-menu-item" : "" }`}>

                            <i className={item.icon}>
                            </i>
                            
                            <span>{IsSidebarExpanded && item.name}</span>
                          
                        </div>
                      );
                    })}
                  </div>
                  <div className="user-info">
                    {
                        IsSidebarExpanded && (
                            <div className="flex flex-col">
                                <span>UserName</span>
                                <span>UserEmail</span>
                            </div>
                        )
                    }
                    
                    <div>
                        <i className="ri-logout-box-r-line"></i>
                    </div>

                  </div>
                </div>

                <div className="body">{children}</div>
              </div>
            </>
          )}
        </ConfigProvider>
      </body>
    </html>
  );
};

export default LayoutProvider;
