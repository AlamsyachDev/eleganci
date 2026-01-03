import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Paragraph, ParagraphWithLightBorder, Title, fadeout } from "./About";
import { ButtonLink, WrapperContainer, imgbaseUrl } from "./SliderItem";
import { lgDown, mdDown, smDown } from "../utils/responsive";
import { gsap } from "gsap";

/* =====================
   STYLES (TETAP)
===================== */

const Container = styled(WrapperContainer)`
  padding: 48px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleWithBigMargin = styled(Title)`
  margin-bottom: 48px;
  max-width: 600px;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  ${mdDown({ flexDirection: "column" })}
`;

const Col = styled.div`
  flex: 1;
`;

const NavPillsContainer = styled(Col)`
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mdDown({ paddingRight: 0 })}
`;

interface NavPillProps {
  isSelected: boolean;
}

const NavPill = styled.button<NavPillProps>`
  width: 100%;
  padding: 24px;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.primary.main : "transparent"};
  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: all 500ms ease-in-out;

  & h5 {
    color: ${({ theme, isSelected }) =>
      isSelected ? theme.palette.common.white : "initial"};
  }

  & svg {
    color: ${({ theme, isSelected }) =>
      isSelected ? theme.palette.common.white : theme.palette.primary.main};
  }

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const NavPillText = styled.h5`
  font-size: 1.25rem;
  text-align: left;
  transition: all 500ms ease-in-out;
`;

const NavPillIcon = styled(FontAwesomeIcon)`
  margin-right: 16px;
  transition: all 500ms ease-in-out;
`;

interface RightProps {
  isVisible?: boolean;
}

const Right = styled.div<RightProps>`
  flex: 2;
  padding-left: 12px;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${fadeout} 300ms linear;

  ${mdDown({
    paddingLeft: 0,
    marginTop: 24,
  })}

  ${smDown({
    flexDirection: "column",
  })}
`;

const ImageContainer = styled(Col)`
  padding-right: 12px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;

  ${smDown({
    paddingRight: 0,
    flex: 0,
    minHeight: 350,
  })}
`;

const Image = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const RightDescContainer = styled(Col)`
  padding-left: 12px;
  padding-right: 12px;

  ${smDown({
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 24,
  })}
`;

const RightTitle = styled.h3`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.palette.primary.darker};
  margin-bottom: 24px;
  font-weight: 600;

  ${lgDown({
    fontSize: "calc(1.3rem + .6vw)",
  })}
`;

const RightDesc = styled(Paragraph)`
  margin-bottom: 24px;
`;

const RightParagraph = styled(Paragraph)`
  margin-bottom: 16px;
`;

const RightParagraphIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-right: 16px;
`;

const RightButton = styled(ButtonLink)`
  margin-top: 16px;
`;

/* =====================
   COMPONENT
===================== */

const Services = () => {
  const [pillIndex, setPillIndex] = useState(0);

  /* ===== NAV PILL (KATEGORI) ===== */
  const pills: string[] = [
    "Attitude Development",
    "Communication Skills",
    "Personal Branding",
    "Program & Konsultasi",
  ];

  /* ===== KEUNGGULAN ===== */
  const advantages: string[] = [
    "Pendekatan Profesional & Humanis",
    "Materi Praktis & Relevan",
    "Didampingi Mentor Berpengalaman",
  ];

  const memoizedAdvantages = useMemo(
    () =>
      advantages.map((adv, idx) => (
        <RightParagraph key={idx}>
          <RightParagraphIcon icon={["fas", "check"]} />
          {adv}
        </RightParagraph>
      )),
    []
  );

  /* ===== CONTENT ===== */
  const rightItems = [
    {
      title: "Pengembangan Attitude & Karakter",
      desc: "Program pengembangan sikap dan karakter untuk membentuk pribadi yang beretika, percaya diri, dan siap menghadapi dunia akademik maupun profesional.",
    },
    {
      title: "Pelatihan Komunikasi Efektif",
      desc: "Meningkatkan kemampuan komunikasi verbal dan non-verbal, public speaking, serta interpersonal skill secara elegan dan meyakinkan.",
    },
    {
      title: "Personal Branding & Etika Profesional",
      desc: "Membantu peserta membangun citra diri yang positif, berkelas, dan sesuai dengan nilai profesionalisme di berbagai lingkungan.",
    },
    {
      title: "Program & Konsultasi Terpadu",
      desc: "Elegance menyediakan program pelatihan, workshop, serta konsultasi yang dirancang sesuai kebutuhan individu, institusi, maupun organisasi.",
    },
  ];

  const memoizedRights = useMemo(
    () =>
      rightItems.map(({ title, desc }, idx) => (
        <Right key={idx} isVisible={pillIndex === idx}>
          <ImageContainer>
            <Image src={`${imgbaseUrl}service-${idx + 1}.png`} />
          </ImageContainer>

          <RightDescContainer>
            <RightTitle>{title}</RightTitle>
            <RightDesc>{desc}</RightDesc>
            {memoizedAdvantages}
            <RightButton to="/programs">Lihat Program</RightButton>
          </RightDescContainer>
        </Right>
      )),
    [pillIndex, memoizedAdvantages]
  );

  /* ===== ANIMATION ===== */
  const containerEl = useRef<HTMLDivElement>(null);
  const topEl = useRef<HTMLDivElement>(null);
  const bottomEl = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl.current,
        start: "top-=30% center",
      },
    });

    tl.from(topEl.current, { opacity: 0, y: "100%" })
      .from(bottomEl.current, { opacity: 0, y: "100%" });

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <Container ref={containerEl}>
      <Top ref={topEl}>
        <ParagraphWithLightBorder>Layanan & Program</ParagraphWithLightBorder>
        <TitleWithBigMargin>
          Pengembangan Attitude & Komunikasi untuk Pribadi Berkelas
        </TitleWithBigMargin>
      </Top>

      <Bottom ref={bottomEl}>
        <NavPillsContainer>
          {pills.map((pill, idx) => (
            <NavPill
              key={idx}
              isSelected={pillIndex === idx}
              onClick={() => setPillIndex(idx)}
            >
              <NavPillText>
                <NavPillIcon icon={["fas", "bars"]} />
                {pill}
              </NavPillText>
            </NavPill>
          ))}
        </NavPillsContainer>

        {memoizedRights}
      </Bottom>
    </Container>
  );
};

export default Services;
