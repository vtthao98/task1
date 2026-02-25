"use client";

import Container from "react-bootstrap/Container";
import styles from "./app.footer.module.css";

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerGrid}>
          {/* Cột 1: Thông tin trường */}
          <div className={styles.column}>
            <h5 className={styles.heading}>ĐẠI HỌC ĐÀ NẴNG</h5>
            <p className={styles.text}>
              Hệ thống Quản lý Nhiệm vụ Khoa học Công nghệ. Phát triển bởi đội
              ngũ kỹ thuật UDN.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className={styles.column}>
            <h5 className={styles.heading}>LIÊN KẾT NHANH</h5>
            <ul className={styles.list}>
              <li>
                <a href="https://udn.vn" target="_blank">
                  Trang chủ UDN
                </a>
              </li>
              <li>
                <a href="#huongdan">Hướng dẫn sử dụng</a>
              </li>
              <li>
                <a href="#chinhsach">Chính sách bảo mật</a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên hệ */}
          <div className={styles.column}>
            <h5 className={styles.heading}>LIÊN HỆ</h5>
            <ul className={styles.list}>
              <li>Địa chỉ: 41 Lê Duẩn, Quận Hải Châu, Đà Nẵng</li>
              <li>Email: ban-khcn@udn.vn</li>
              <li>Điện thoại: (0236) 3822 037</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>&copy; {currentYear} University of Danang. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
