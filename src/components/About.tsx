import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserTie,
  faUtensils,
  faChalkboardTeacher,
  faCertificate,
  faUsersGear,
  faAward
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { mdDown } from "../utils/responsive";
import {
  ParagraphWithBorder,
  WrapperContainer,
  imgbaseUrl,
} from "./SliderItem";

// Menambahkan ikon baru yang relevan dengan jasa pelatihan
library.add(faUserTie, faUtensils, faChalkboardTeacher, faCertificate, faUsersGear, faAward);

/* =======================
   STYLES (Tetap sama seperti kode asli Anda)
======================= */
const Container = styled(WrapperContainer)`
  padding: 48px 12px;
`;

const ColWrapper = styled.div`
  display: flex;
  margin: 0 -12px 24px;
  ${mdDown({
    flexDirection: "column",
  })};
`;

const Col = styled.div`
  padding: 0 12px;
  height: 624px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  ${mdDown({
    width: "100%",
    height: "auto",
    justifyContent: "flex-start",
  })};
`;

const Left = styled(Col)`
  opacity: 0;
  transform: translateY(100%);
  ${mdDown({
    marginBottom: "24px",
  })};
`;

const Right = styled(Col)`
  opacity: 0;
  transform: translateY(100%);
`;

export const ParagraphWithLightBorder = styled(ParagraphWithBorder)`
  border-color: ${({ theme }) => theme.palette.primary.light};
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.palette.primary.darker};
  font-size: 2.6rem;
  margin-bottom: 20px;
`;

export const Desc = styled.p`
  color: ${({ theme }) => theme.palette.common.black};
  margin-bottom: 24px;
  font-weight: 400;
`;

const TabContainer = styled.div`
  width: 100%;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const TabHeader = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.light};
`;

interface TabTitleProps {
  isSelected: boolean;
}

const TabTitle = styled.button<TabTitleProps>`
  color: ${({ isSelected, theme }) =>
    isSelected
      ? theme.palette.primary.main
      : theme.palette.primary.light};

  padding: 8px 16px;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  border-bottom: ${({ isSelected, theme }) =>
    isSelected
      ? `3px solid ${theme.palette.primary.main}`
      : "3px solid transparent"};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.darker};
  }
`;

interface TabDescContainerProps {
  isSelected: boolean;
}

export const fadeout = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const TabDescContainer = styled.div<TabDescContainerProps>`
  display: ${({ isSelected }) => (isSelected ? "block" : "none")};
  animation: ${fadeout} 300ms ease;
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.palette.common.black};
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 16px;
`;

const AboutFooter = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 24px;
  display: flex;

  ${mdDown({
    flexDirection: "column",
  })};
`;

const AboutFooterItem = styled.div`
  padding: 0 12px;
  display: flex;

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.palette.primary.light};
    ${mdDown({
      borderRight: "none",
      borderBottom: "1px solid #ddd",
      paddingBottom: 16,
      marginBottom: 16,
    })}
  }
`;

const AboutFooterDescContainer = styled.div`
  padding-left: 15px;
`;

export const TitleH4 = styled.h4`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.3rem;
  margin-bottom: 8px;
`;

const AboutFooterDesc = styled.p`
  color: ${({ theme }) => theme.palette.common.black};
`;

export const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 2rem;
`;

/* =======================
   COMPONENT
======================= */

const About = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabTitles = ["Profil", "Misi", "Visi"];

  const tabDescs = [
    {
      firstDesc:
        "Luxury Academy adalah lembaga pelatihan profesional yang berfokus pada pengembangan citra diri, etiket bisnis, dan kompetensi korporat.",
      secondDesc:
        "Kami membantu individu dan perusahaan membangun persona yang elegan, berintegritas, dan kompetitif di era global.",
    },
    {
      firstDesc:
        "Menyelenggarakan pelatihan personal branding dan table manner dengan standar internasional.",
      secondDesc:
        "Membekali tenaga kerja profesional dengan soft skills dan etiket yang menunjang keberhasilan karier.",
    },
    {
      firstDesc:
        "Menjadi pusat pengembangan karakter dan etiket terkemuka di Indonesia.",
      secondDesc:
        "Menciptakan generasi profesional yang tidak hanya cerdas secara teknis, tetapi juga unggul dalam perilaku dan penampilan.",
    },
  ];

  const footerItems = [
    {
      iconName: "award" as IconName,
      title: "Kurikulum Teruji",
      desc: "Materi aplikatif yang disusun oleh pakar etiket dan branding.",
    },
    {
      iconName: "certificate" as IconName,
      title: "Sertifikasi Resmi",
      desc: "Memberikan nilai tambah profesional bagi setiap peserta.",
    },
    {
      iconName: "users-gear" as IconName,
      title: "Program Custom",
      desc: "Pelatihan yang disesuaikan dengan kebutuhan spesifik perusahaan.",
    },
  ];

  const leftEl = useRef<HTMLDivElement>(null);
  const rightEl = useRef<HTMLDivElement>(null);
  const footerEl = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.to(leftEl.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      scrollTrigger: { trigger: leftEl.current, start: "top center" },
    });

    gsap.to(rightEl.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.2,
      scrollTrigger: { trigger: rightEl.current, start: "top center" },
    });

    gsap.from(footerEl.current, {
      opacity: 0,
      y: 50,
      duration: 0.4,
      scrollTrigger: { trigger: footerEl.current, start: "top center" },
    });
  }, []);

  return (
    <Container>
      <ColWrapper>
        <Left ref={leftEl}>
          {/* Pastikan gambar ini sesuai dengan tema pelatihan Anda */}
          <Image src={`${imgbaseUrl}Training_About.jpeg`} alt="Tentang Luxury Academy" />
        </Left>

        <Right ref={rightEl}>
          <ParagraphWithBorder>Tentang Kami</ParagraphWithBorder>
          <Title>Tingkatkan Kepercayaan Diri & Profesionalisme Anda</Title>
          <Desc>
            Kami percaya bahwa kesan pertama adalah segalanya. Melalui pelatihan intensif, kami membantu Anda menguasai seni berinteraksi dan membangun branding yang tak terlupakan.
          </Desc>

          <TabContainer>
            <TabHeader>
              {tabTitles.map((t, i) => (
                <TabTitle
                  key={i}
                  isSelected={tabIndex === i}
                  onClick={() => setTabIndex(i)}
                >
                  {t}
                </TabTitle>
              ))}
            </TabHeader>

            {tabDescs.map((d, i) => (
              <TabDescContainer key={i} isSelected={tabIndex === i}>
                <StyledParagraph>{d.firstDesc}</StyledParagraph>
                <StyledParagraph>{d.secondDesc}</StyledParagraph>
              </TabDescContainer>
            ))}
          </TabContainer>
        </Right>
      </ColWrapper>

      <AboutFooter ref={footerEl}>
        {footerItems.map((item, i) => (
          <AboutFooterItem key={i}>
            <Icon icon={["fas", item.iconName]} />
            <AboutFooterDescContainer>
              <TitleH4>{item.title}</TitleH4>
              <AboutFooterDesc>{item.desc}</AboutFooterDesc>
            </AboutFooterDescContainer>
          </AboutFooterItem>
        ))}
      </AboutFooter>
    </Container>
  );
};

export default About;