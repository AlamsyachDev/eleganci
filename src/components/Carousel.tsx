import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import SliderItem from "./SliderItem";

library.add(faChevronLeft, faChevronRight);

// 🎨 Warna sesuai logo Elegance
const PRIMARY_BG = "#f7f2ea";   // cream / ivory
const GOLD = "#c9a24d";         // gold utama logo

const Container = styled.div`
  position: relative;
  margin-bottom: 48px;
  min-height: calc(100vw * 9 / 16);
  background: ${PRIMARY_BG};

  /* ===============================
     🎁 BOX BACKGROUND UNTUK TEKS
  ================================ */
  .slide-item {
    display: inline-block;
    background: rgba(247, 242, 234, 0.88); /* cream transparan */
    padding: 24px 36px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(158, 124, 47, 0.18);
    backdrop-filter: blur(4px);
  }
`;

const SlideButtonContainer = styled.button`
  width: 60px;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    & > div {
      opacity: 1;
    }
  }
`;

const SlideLeftButtonContainer = styled(SlideButtonContainer)`
  left: 0;
`;
const SlideRightButtonContainer = styled(SlideButtonContainer)`
  right: 0;
`;

const SlideButton = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${GOLD};
  opacity: 0.85;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 150ms ease;
  border-radius: 50%;

  & > svg {
    font-size: 1.4rem;
    color: #ffffff;
  }
`;

const Carousel = () => {
  const settings: Settings = {
    fade: true,
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slideEl = useRef<Slider | null>(null);

  const handleScroll = (direction: string) => {
    if (direction === "left") slideEl.current?.slickPrev();
    else slideEl.current?.slickNext();
  };

  // Fade-in
  useLayoutEffect(() => {
    const carouselTween = gsap.from(".carousel-slick-list", {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".carousel-slick-list",
        start: "top center",
      },
    });
    return () => {
      carouselTween.scrollTrigger?.kill();
    };
  }, []);

  useEffect(() => {
    gsap.from(".slide-item", {
      y: "40%",
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".slide-item",
        start: "top center",
      },
    });
  }, []);

  // Slider content
  interface ISliderItem {
    title: string;
  }

  const sliderItems: ISliderItem[] = useMemo(
    () => [
      { title: "Membentuk Attitude Berkelas untuk Masa Depan Gemilang" },
      { title: "Komunikasi Elegan, Percaya Diri, dan Penuh Karisma" },
    ],
    []
  );

  return (
    <Container>
      <Slider className="carousel-slick-list" ref={slideEl} {...settings}>
        {sliderItems.map(({ title }, idx) => (
          <SliderItem key={idx} idx={idx} title={title} />
        ))}
      </Slider>

      {/* Buttons */}
      <SlideLeftButtonContainer onClick={() => handleScroll("left")}>
        <SlideButton>
          <FontAwesomeIcon icon={["fas", "chevron-left"]} />
        </SlideButton>
      </SlideLeftButtonContainer>

      <SlideRightButtonContainer onClick={() => handleScroll("right")}>
        <SlideButton>
          <FontAwesomeIcon icon={["fas", "chevron-right"]} />
        </SlideButton>
      </SlideRightButtonContainer>
    </Container>
  );
};

export default Carousel;
