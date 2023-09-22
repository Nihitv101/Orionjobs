"use client";
import React from 'react'


import {ConfigProvider} from 'antd';

interface ParentProps{
    children: React.ReactNode
}


const LayoutProvider : React.FC<ParentProps> = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <ConfigProvider
            theme={{
                token:{
                    colorPrimary: '#213555',
                }
            }}
            >
                {children}
            </ConfigProvider>
        </body>
    </html>
  )
}

export default LayoutProvider