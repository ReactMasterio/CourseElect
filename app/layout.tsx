import React from "react";
import Header from "@/components/Header/Header";
import styles from "@/app/Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }: any) => {
  return (
    <div className={styles.body}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
