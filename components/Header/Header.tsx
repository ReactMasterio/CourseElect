import React from "react";
import styles from "@/components/Header/styles/Header.module.css";
import Image from "next/image";
import userLogo from "@/public/images/User.svg";
import menuLogo from "@/public/images/Menu.svg";
import { Button, Typography } from "antd";

const { Title } = Typography;

const Header = () => {
  return (
    <div className={styles.header}>
      <Button type="text">
        <Image src={menuLogo} alt="User Logo" width={25} />
      </Button>

      <h2 className={styles.header_title}>
        Course<span className={styles.span}>E</span>lect
      </h2>

      <Button type="text">
        <Image src={userLogo} alt="User Logo" width={22} />
      </Button>
    </div>
  );
};

export default Header;
