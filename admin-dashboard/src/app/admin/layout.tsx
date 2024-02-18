import ChatBot from '@/components/ChatBot';
import Navbar1 from '@/components/Navbar1';
import Offers from '@/components/Offers';
import React from 'react'

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar1/>
    {children}
    <ChatBot />
    <Offers />
    </>
  )
}

export default layout