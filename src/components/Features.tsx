import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { ButtonLink, WrapperContainer } from "./SliderItem";
import {
  Desc,
  Icon,
  ParagraphWithLightBorder,
  Paragraph,
  Title,
} from "./About";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { mdDown, smDown } from "../utils/responsive";
import { gsap } from "gsap";

library.add(faArrowRight);

const Container = styled(WrapperContainer)`
  padding: 48px 12px;
  display: flex;
  align-items: center;
  ${mdDown({
    flexDirection: "column",
  })}
`;
const Col = styled.div`
  width: 50%;
  padding: 0 24px;
  margin-top: 48px;
  ${mdDown({
    width: "100%",
  })}
`;
const Left = styled(Col)`
  padding-left: 0;
`;
const Right = styled(Col)`
  ${mdDown({
    paddingLeft: 0,
  })}
  ${smDown({
    flexDirection: "column",
  })}
`;
const RightCol = styled.div`
  margin: -24px -12px 0;
  display: flex;
  justify-content: center;
  ${smDown({
    flexDirection: "column",
  })}
`;

const RightItemContainer = styled.div`
  margin-top: 24px;
  padding: 0 12px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${smDown({
    width: "100%",
  })}
`;
const RightItem = styled.div`
  margin-top: 24px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.palette.common.white};
  transition: all 500ms;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    & * {
      color: ${({ theme }) => theme.palette.common.white};
    }
  }
`;
const RightItemTitle = styled.h4`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 1.5rem;
  margin: 16px 0;
  transition: all 500ms;
`;
const StyledParagraph = styled(Paragraph)`
  margin-bottom: 16px;
`;
const RightItemButton = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.main};
  transition: all 500ms;
`;
const RightItemBtnIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-left: 4px;
  transition: all 500ms;
`;

const Features = () => {
  // ==== TEXT UNTUK ELEGANCE ====
  interface IRightItem {
    title: string;
    desc: string;
  }

  const rightItemLeftCol: IRightItem[] = [
    {
      title: "Pengembangan Attitude Profesional",
      desc: "Membantu peserta membangun sikap positif, etika, dan karakter berkelas yang dibutuhkan dalam dunia akademik maupun profesional.",
    },
    {
      title: "Komunikasi Efektif & Percaya Diri",
      desc: "Program dirancang untuk meningkatkan kemampuan berbicara, presentasi, dan interaksi sosial dengan percaya diri dan elegan.",
    },
  ];

  const rightItemRightCol: IRightItem[] = [
    {
      title: "Pendampingan Berkelanjutan",
      desc: "Elegance memberikan bimbingan berkelanjutan agar setiap individu mampu berkembang secara konsisten dan berdaya saing.",
    },
  ];

  // Animation Left
  const leftEl = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const tween = gsap.from(leftEl.current, {
      opacity: 0,
      y: "100%",
      duration: 0.5,
      scrollTrigger: {
        trigger: leftEl.current,
        start: "top-=200% center",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  // Animation Right
  const rightEl = useRef<HTMLDivElement>(null);
  const rightItemsEl = useRef<HTMLDivElement[]>([]);
  const addToRightItemsEl = (el: HTMLDivElement) => {
    if (el && !rightItemsEl.current.includes(el)) rightItemsEl.current.push(el);
  };
  useLayoutEffect(() => {
    const tween = gsap.from(rightItemsEl.current, {
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: rightEl.current,
        start: "top-=15% center",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <Container>
      <Left ref={leftEl}>
        <ParagraphWithLightBorder>Mengapa Memilih Elegance</ParagraphWithLightBorder>
        <Title>Attitude & Communication Centre</Title>
        <Desc>
          Elegance hadir sebagai pusat pengembangan attitude dan komunikasi
          untuk membentuk pribadi yang percaya diri, berkarakter, dan siap
          menghadapi tantangan masa depan.
        </Desc>
        <ButtonLink to="">Pelajari Program</ButtonLink>
      </Left>

      <Right>
        <RightCol ref={rightEl}>
          <RightItemContainer ref={addToRightItemsEl}>
            {rightItemLeftCol.map(({ title, desc }, idx) => (
              <RightItem key={idx}>
                <Icon icon={["fas", "check"]} />
                <RightItemTitle>{title}</RightItemTitle>
                <StyledParagraph>{desc}</StyledParagraph>
                <RightItemButton to="">
                  Selengkapnya
                  <RightItemBtnIcon icon={["fas", "arrow-right"]} />
                </RightItemButton>
              </RightItem>
            ))}
          </RightItemContainer>

          <RightItemContainer ref={addToRightItemsEl}>
            {rightItemRightCol.map(({ title, desc }, idx) => (
              <RightItem key={idx}>
                <Icon icon={["fas", "check"]} />
                <RightItemTitle>{title}</RightItemTitle>
                <StyledParagraph>{desc}</StyledParagraph>
                <RightItemButton to="">
                  Selengkapnya
                  <RightItemBtnIcon icon={["fas", "arrow-right"]} />
                </RightItemButton>
              </RightItem>
            ))}
          </RightItemContainer>
        </RightCol>
      </Right>
    </Container>
  );
};

export default Features;
