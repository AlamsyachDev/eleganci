import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { lgDown, mdDown, smDown, xlDown, xsDown } from "../utils/responsive";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Container = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  min-height: 450px;
  object-fit: cover;
`;

export const WrapperContainer = styled.div`
  width: 100%;
  padding: 0 12px;
  max-width: 1320px;
  margin: 0 auto;

  ${xlDown({ maxWidth: 1140 })};
  ${lgDown({ maxWidth: 960 })};
  ${mdDown({ maxWidth: 720 })};
  ${smDown({ maxWidth: 540 })};
  ${xsDown({ maxWidth: "100%" })};
`;

const SliderDesc = styled(WrapperContainer)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  margin-bottom: 0;
`;

export const ParagraphWithBorder = styled.p`
  display: inline-block;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 12px;
  padding: 2px 12px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.palette.common.white};
  font-weight: 500;
  font-size: 0.85rem; /* lebih kecil */
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 3rem; /* dari 5rem → 3rem */
  margin-bottom: 16px;
  max-width: 600px;

  ${lgDown({
    fontSize: "calc(1.2rem + 2.5vw)", /* lebih kecil di mobile */
  })}
`;

export const ButtonLink = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.light};
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 10px 28px; /* lebih kecil */
  border-radius: ${({ theme }) => theme.borderRadius};
  line-height: 1.4;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  font-size: 0.9rem; /* kecilkan font */

  transition: all 300ms ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.darker};
    border-color: ${({ theme }) => theme.palette.primary.darker};
  }
`;

export const imgbaseUrl = `${process.env.PUBLIC_URL}/assets/`;

interface SliderItemProps {
  idx: number;
  title: string;
}

const SliderItem = ({ idx, title }: SliderItemProps) => {
  const baseUrl = `${imgbaseUrl}slide-`;
  const endUrl = ".png";

  const containerEl = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl.current,
        start: "top center",
        end: "bottom center",
      },
    });

    tl.from(containerEl.current, {
      opacity: 0,
      duration: 1,
      delay: 0.3,
    }).fromTo(
      ".child",
      { opacity: 0, y: "-100%", duration: 1 },
      { y: 0, opacity: 1 }
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  const handleLoad = () => {
    ScrollTrigger.refresh();
  };

  return (
    <Container ref={containerEl}>
      <Image onLoad={handleLoad} src={`${baseUrl}${idx + 1}${endUrl}`} />

      <SliderDesc>

        <Title className="child">{title}</Title>

       
      </SliderDesc>
    </Container>
  );
};

export default SliderItem;
