import { faHome, faList, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { mdDown } from "../utils/responsive";
import { useEffect, useState } from "react";

// ================== Styled Components ================== //
const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

const MobileBottomNav = styled.div<{ visible: boolean }>`
  display: none;
  ${mdDown({
    display: "flex",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTop: "1px solid rgba(0,0,0,0.1)",
    padding: "8px 0",
    zIndex: 5,
  })}
  animation: ${({ visible }) => (visible ? slideUp : slideDown)} 0.3s forwards;
`;

const MobileNavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.common.black};
  text-decoration: none;

  &.active {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 600;

    svg {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

const MobileNavIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

// ================== MobileNav Component ================== //
const MobileNav = () => {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Scroll listener to hide/show mobile nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <MobileBottomNav visible={visible}>
      <MobileNavItem to="" end>
        <MobileNavIcon icon={faHome} />
        Beranda
      </MobileNavItem>

      <MobileNavItem to="programs">
        <MobileNavIcon icon={faList} />
        Program
      </MobileNavItem>

      <MobileNavItem to="about">
        <MobileNavIcon icon={faInfoCircle} />
        Tentang Kami
      </MobileNavItem>

      <MobileNavItem
        as="a"
        href={`https://wa.me/6282125211521?text=Halo%20Elegance,%20saya%20ingin%20konsultasi`}
        target="_blank"
      >
        <MobileNavIcon icon={faWhatsapp} />
        Konsultasi
      </MobileNavItem>
    </MobileBottomNav>
  );
};

export default MobileNav;
