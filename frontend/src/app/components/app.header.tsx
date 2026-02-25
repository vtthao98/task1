"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./app.header.module.css";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.topbar}>
        <Container className={styles.topInner}>
          <div className={styles.brandWrap}>
            <div className={styles.logoMain}>UDN</div>
            <div className={styles.title}>
              HỆ THỐNG QUẢN LÝ NHIỆM VỤ KHOA HỌC CÔNG NGHỆ
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.adminBadge}>
              <div className={styles.adminIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div className={styles.adminInfo}>
                <span className={styles.adminLabel}>ADMIN</span>
                <span className={styles.adminName}>System</span>
              </div>
            </div>

            <a className={styles.logout} href="#logout">
              (Thoát)
            </a>
          </div>
        </Container>
      </div>

      {/* Menu bar */}
      <Navbar expand="lg" className={styles.menubar}>
        <Container className={styles.menuInner}>
          <Navbar.Toggle aria-controls="main-nav" className={styles.toggler} />
          <Navbar.Collapse id="main-nav">
            <Nav className={styles.tabs}>
              <Link href="#quantri" className={styles.tab}>
                Khoa học công nghệ
              </Link>
              <Link href="/bvmt" className={styles.tab}>
                BVMT
              </Link>
              <Link href="/baibao" className={styles.tab}>
                Bài Báo
              </Link>
              <Link href="/sach" className={styles.tab}>
                Sách
              </Link>
              <Link href="/taisan" className={styles.tab}>
                Tài Sản
              </Link>
              <Link href="/giaithuong" className={styles.tab}>
                Giải Thưởng
              </Link>
              <Link href="/tacgia" className={styles.tab}>
                Tác Giả
              </Link>
              <Link href="/donvi" className={styles.tab}>
                Đơn Vị
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
