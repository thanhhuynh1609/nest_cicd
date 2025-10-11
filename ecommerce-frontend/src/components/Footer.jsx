import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCreditCard,
  FaPaypal,
  FaLock,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  // CSS styles
  const styles = {
    footer: {
      marginTop: "100px",
      backgroundColor: "black",
      color: "#fff",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
      marginBottom: "40px",
    },
    col: {
      lineHeight: "1.8",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "12px",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "14px",
    },
    linkHover: {
      textDecoration: "underline",
    },
    social: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
    },
    newsletter: {
      display: "flex",
    },
    input: {
      flex: 1,
      padding: "10px",
      border: "none",
      borderRadius: "4px 0 0 4px",
      outline: "none",
    },
    button: {
      backgroundColor: "#fff",
      color: "#e65100",
      border: "none",
      padding: "10px 16px",
      borderRadius: "0 4px 4px 0",
      cursor: "pointer",
    },
    bottom: {
      borderTop: "1px solid rgba(255,255,255,0.3)",
      paddingTop: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    payment: {
      display: "flex",
      gap: "15px",
      marginBottom: "15px",
    },
    secure: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "15px",
    },
    policies: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      justifyContent: "center",
      marginTop: "10px",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Cột 1 */}
        <div style={styles.col}>
          <h3 style={styles.title}>Danh mục sản phẩm</h3>
          <ul>
            {[
              "Áo Polo",
              "Quần Âu",
              "Áo sơ mi",
              "Chân Váy",
              "Vest",
            ].map((item) => (
              <li key={item}>
                <a href="#" style={styles.link}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 2 */}
        <div style={styles.col}>
          <h3 style={styles.title}>Hỗ trợ người dùng</h3>
          <ul>
            {[
              "Liên hệ",
              "Hỏi đáp",
              "Thông tin địa chỉ",
              "Bảo mật",
              "Đơn hàng",
            ].map((item) => (
              <li key={item}>
                <a href="#" style={styles.link}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3 */}
        <div style={styles.col}>
          <h3 style={styles.title}>Thông tin</h3>
          <ul>
            {["Về chúng tôi", "Công việc", "Press", "Investor Relations"].map(
              (item) => (
                <li key={item}>
                  <a href="#" style={styles.link}>
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Cột 4 */}
        <div style={styles.col}>
          <h3 style={styles.title}>Liên hệ với chúng tôi</h3>
          <div style={styles.social}>
            <a href="#"><FaFacebook size={24} color="white" /></a>
            <a href="#"><FaTwitter size={24} color="white" /></a>
            <a href="#"><FaInstagram size={24} color="white" /></a>
            <a href="#"><FaLinkedin size={24} color="white" /></a>
          </div>

          <form onSubmit={handleSubscribe}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Đăng kí để nhận thông báo
            </label>
            <div style={styles.newsletter}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button}>
                Đăng kí
              </button>
            </div>
            {isSubscribed && (
              <p style={{ marginTop: "8px", fontSize: "14px" }}>
                Cảm ơn đã đăng kí!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div style={styles.bottom}>
        <div style={styles.payment}>
          <FaCreditCard size={24} />
          <FaPaypal size={24} />
          <FaCcVisa size={24} />
          <FaCcMastercard size={24} />
        </div>

        <div style={styles.secure}>
          <FaLock size={16} />
          <span style={{ fontSize: "14px" }}>Bảo mật thanh toán</span>
        </div>

        <p style={{ fontSize: "14px" }}>
          &copy; {currentYear} Your E-Commerce Store. All rights reserved.
        </p>

        <div style={styles.policies}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map(
            (item) => (
              <a key={item} href="#" style={styles.link}>
                {item}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
