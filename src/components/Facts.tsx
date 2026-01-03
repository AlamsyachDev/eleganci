import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import {
  faAward,
  faCheck,
  faUsersGear,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import styled from "styled-components";
import { mdDown, xsDown } from "../utils/responsive";
import { WrapperContainer, imgbaseUrl } from "./SliderItem";

library.add(faCheck, faUsersGear, faAward, faUsers);
gsap.registerPlugin(ScrollTrigger);

/* =====================
   STYLES (WARNA DISESUAIKAN)
===================== */

const Container = styled.div`
  width: 100%;
  background: linear-gradient(
      rgba(201, 162, 77, 0.92),
      rgba(158, 124, 47, 0.92)
    ),
    url(${imgbaseUrl}bg.png);
  padding: 48px 0;
  margin: 48px 0;
`;

const StyledWrapper = styled(WrapperContainer)`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  padding: 0 24px;
  margin-top: 48px;
  width: 25%;

  ${mdDown({ width: "50%" })}
  ${xsDown({ width: "100%" })}
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.common.white};
  margin: 0 auto 16px;
  display: block;
`;

const Title = styled(CountUp)`
  font-family: "Jost", sans-serif;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.palette.common.white};
  font-size: 2.75rem;
  margin-bottom: 4px;
  display: block;
  text-align: center;
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.palette.common.white};
  font-size: 1rem;
  text-align: center;
`;

const Hr = styled.hr`
  width: 60px;
  margin: 12px auto 0;
  border: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.common.white};
  opacity: 0.35;
`;

/* =====================
   COMPONENT
===================== */

const Facts = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const wrapperEl = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperEl.current,
        start: "top-=175% center",
      },
    });

    tl.from(revealRefs.current, {
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      onStart: () => setIsVisible(true),
    });

    return () => tl.scrollTrigger?.kill();
  }, []);

  interface IFactItem {
    icon: IconName;
    title: number;
    subTitle: string;
  }

  /* ===== DATA ELEGANCE ===== */
  const items: IFactItem[] = [
    {
      icon: "users",
      title: 1200,
      subTitle: "Peserta Terbina",
    },
    {
      icon: "check",
      title: 950,
      subTitle: "Sesi Pelatihan Terselenggara",
    },
    {
      icon: "users-gear",
      title: 40,
      subTitle: "Mentor & Fasilitator Profesional",
    },
    {
      icon: "award",
      title: 5,
      subTitle: "Tahun Pengalaman",
    },
  ];

  return (
    <Container>
      <StyledWrapper ref={wrapperEl}>
        {items.map(({ icon, title, subTitle }, idx) => (
          <Item key={idx} ref={addToRefs}>
            <Icon icon={["fas", icon]} />
            {isVisible && <Title start={0} end={title} duration={3} />}
            <SubTitle>{subTitle}</SubTitle>
            <Hr />
          </Item>
        ))}
      </StyledWrapper>
    </Container>
  );
};

export default Facts;
