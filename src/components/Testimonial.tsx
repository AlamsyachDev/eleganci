import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { WrapperContainer } from "./SliderItem";
import { Paragraph, ParagraphWithLightBorder, TitleH4 } from "./About";
import { TitleWithBigMargin } from "./Services";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";

library.add(faQuoteRight);

// ===========================
// WARNA SESUAI LOGO ELEGANCE
// navy & gold refined
// ===========================
const GOLD_MAIN = "#213a63";
const GOLD_LIGHT = "#c9a24d";

// ===========================
// STYLED COMPONENTS
// ===========================
const Container = styled(WrapperContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
`;

const ContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSlider = styled(Slider)`
  margin: 0 -12px;
  width: 100%;

  .slick-dots {
    position: initial;
  }

  .slick-dots li.slick-active button {
    border-color: ${GOLD_MAIN};
    ::before {
      background-color: ${GOLD_MAIN};
    }
  }

  .slick-dots li {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 5px;
  }

  .slick-dots li button {
    border: 1px solid ${GOLD_LIGHT};
    height: 100%;
    width: 100%;
    border-radius: 50%;
    position: relative;

    ::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background-color: ${GOLD_LIGHT};
    }
  }
`;

const SlideItemContainer = styled.div`
  padding: 30px 24px;
`;

const SlideItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  border: 1px solid ${GOLD_LIGHT};
  padding: 48px 24px 24px;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 32px;

  ::after,
  ::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
  }

  ::after {
    top: 100%;
    border-width: 30px;
    border-color: ${({ theme }) =>
      theme.palette.common.white} transparent transparent transparent;
  }

  ::before {
    top: 100.2%;
    border-width: 32px;
    border-color: ${GOLD_LIGHT} transparent transparent transparent;
  }
`;

const IconContainer = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 1px solid ${GOLD_LIGHT};
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${GOLD_MAIN};
  font-size: 2rem;
`;

const StyledParagraph = styled(Paragraph)`
  text-align: center;
`;

// ===========================
// COMPONENT
// ===========================
const Testimonial = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 993,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "175px",
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  interface SlideItemType {
    description: string;
    name: string;
    profession: string;
  }

  // ===== TESTIMONIAL ELEGANCE =====
  const slideItemArray: SlideItemType[] = [
    {
      description:
        "Setelah mengikuti program Elegance, cara saya berbicara dan membawa diri jauh lebih percaya diri dan profesional.",
      name: "Aulia Rahman",
      profession: "Young Professional",
    },
    {
      description:
        "Materi komunikasinya sangat aplikatif. Saya jadi lebih tenang dan berwibawa saat presentasi.",
      name: "Nadia Putri",
      profession: "Corporate Executive",
    },
    {
      description:
        "Elegance membantu saya memahami etika, komunikasi, dan personal branding secara menyeluruh.",
      name: "Fajar Pratama",
      profession: "Public Speaker",
    },
    {
      description:
        "Pelatihannya elegan, berkelas, dan membangun kepercayaan diri dari dalam.",
      name: "Salsa Maharani",
      profession: "University Student",
    },
  ];

  // ===========================
  // GSAP ANIMATION
  // ===========================
  const containerEl = useRef<HTMLDivElement>(null);
  const topEl = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl.current,
        start: "top center",
      },
    });

    tl.from(topEl.current, {
      opacity: 0,
      y: 100,
      duration: 0.6,
    }).from(".testimonial-slick-list", {
      opacity: 0,
      y: 100,
      duration: 0.6,
    });

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <Container ref={containerEl}>
      <ContainerTop ref={topEl}>
        <ParagraphWithLightBorder>Testimoni Peserta</ParagraphWithLightBorder>
        <TitleWithBigMargin>
          Pengalaman Mereka Bersama Elegance
        </TitleWithBigMargin>
      </ContainerTop>

      <StyledSlider className="testimonial-slick-list" {...settings}>
        {slideItemArray.map(({ description, name, profession }, idx) => (
          <SlideItemContainer key={idx}>
            <SlideItem>
              <Top>
                <IconContainer>
                  <Icon icon={["fas", "quote-right"]} />
                </IconContainer>
                <StyledParagraph>{description}</StyledParagraph>
              </Top>

              <TitleH4>{name}</TitleH4>
              <Paragraph>{profession}</Paragraph>
            </SlideItem>
          </SlideItemContainer>
        ))}
      </StyledSlider>
    </Container>
  );
};

export default Testimonial;
