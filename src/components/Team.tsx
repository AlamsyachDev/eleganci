import React, { useLayoutEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { WrapperContainer } from "./SliderItem";
import { ParagraphWithLightBorder, TitleH4 } from "./About";
import { TitleWithBigMargin } from "./Services";
import { mdDown, smDown } from "../utils/responsive";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Container = styled(WrapperContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
`;

const CardWrapper = styled.div`
  flex-basis: 100%;
  padding: 24px 12px;
`;



const Card = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.common.white};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 */
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const CardFooter = styled.div`
  padding: 16px;
  text-align: center;
`;

const Team = () => {
  interface VideoItemType {
    title: string;
    youtubeId: string;
  }

  const videoItems: VideoItemType[] = useMemo(
    () => [
      
      {
        title: "Liputan dari Boss Cuan Trans7",
        youtubeId: "0aPKhQUalO4?si=7KLkKnsFCJ4JYM0M",
      },
      {
        title: "Liputan Pekerja indo ",
        youtubeId: "8-3pUanS-xQ?si=lamuSybhz6dUMjzR",
      },
    ],
    []
  );

  const containerEl = useRef<HTMLDivElement>(null);
  const topEl = useRef<HTMLDivElement>(null);
  const cardWrapperEls = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardWrapperEls.current.includes(el)) {
      cardWrapperEls.current.push(el);
    }
  };

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl.current,
        start: "top center",
      },
    });

    tl.from(topEl.current, {
      opacity: 0,
      y: 80,
    }).from(cardWrapperEls.current, {
      opacity: 0,
      y: 80,
      stagger: 0.2,
    });

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <Container ref={containerEl}>
      <Top ref={topEl}>
        <ParagraphWithLightBorder>Liputan</ParagraphWithLightBorder>
        <TitleWithBigMargin>Video Kegiatan Kami</TitleWithBigMargin>
      </Top>

      <CardContainer>
        {videoItems.map(({ title, youtubeId }, idx) => (
          <CardWrapper ref={addToRefs} key={idx}>
            <Card>
              <VideoWrapper>
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoWrapper>
              <CardFooter>
                <TitleH4 style={{ margin: 0 }}>{title}</TitleH4>
              </CardFooter>
            </Card>
          </CardWrapper>
        ))}
      </CardContainer>
    </Container>
  );
};

export default Team;
