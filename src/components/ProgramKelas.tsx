import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { WrapperContainer } from "./SliderItem";
import { mdDown, smDown } from "../utils/responsive";
import { Link } from "react-router-dom";

/* ===== STYLES ===== */
const Container = styled(WrapperContainer)`
  padding: 64px 12px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.palette.primary.darker};
  font-size: 2.6rem;
  margin-bottom: 12px;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.palette.common.black};
  max-width: 720px;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
`;

const SearchInput = styled.input`
  width: 320px;
  padding: 10px 14px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.palette.primary.light};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  background-color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.palette.common.white : theme.palette.primary.main};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  ${mdDown({ gridTemplateColumns: "repeat(2,1fr)" })}
  ${smDown({ gridTemplateColumns: "1fr" })}
`;

const ProgramCard = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: #fff;
  overflow: hidden;
  transition: all 300ms;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
`;

const Badge = styled.span`
  position: absolute;
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 0 0 6px 0;
`;

const ProgramImageWrapper = styled.div`
  position: relative;
`;

const ProgramImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
`;

const ProgramBody = styled.div`
  padding: 16px;
`;

const ProgramTitle = styled.h4`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const ProgramMeta = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const ProgramPrice = styled.p`
  font-weight: 600;
  margin-top: 8px;
`;

const ProgramFooter = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.palette.primary.light};
`;

const Button = styled(Link)`
  padding: 8px 14px;
  border-radius: 6px;
  color: #fff;
  background: ${({ theme }) => theme.palette.primary.main};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.darker};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
  gap: 8px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  background: ${({ active, theme }) =>
    active ? theme.palette.primary.main : "transparent"};
  color: ${({ active, theme }) =>
    active ? "#fff" : theme.palette.primary.main};
`;

/* ===== DATA TYPES ===== */
interface Program {
  id: number;
  title: string;
  category: string;
  price: number;
  level: string;
  image: string;
}

/* ===== HARD CODE DATA ===== */
const programData: Program[] = [
  {
    id: 1,
    title: "Public Speaking Fundamental",
    category: "Communication",
    level: "Beginner",
    price: 750000,
    image: "/program/public-speaking.jpg",
  },
  {
    id: 2,
    title: "Professional Attitude Training",
    category: "Personality",
    level: "Intermediate",
    price: 900000,
    image: "/program/attitude.jpg",
  },
  {
    id: 3,
    title: "Leadership Communication",
    category: "Leadership",
    level: "Advanced",
    price: 1200000,
    image: "/program/leadership.jpg",
  },
  {
    id: 4,
    title: "Corporate Presentation Skill",
    category: "Communication",
    level: "Advanced",
    price: 1100000,
    image: "/program/presentation.jpg",
  },
];

/* ===== COMPONENT ===== */
const ProgramKelas = () => {
  const [categoryFilter, setCategoryFilter] = useState<"All" | string>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const programsPerPage = 4;

  const categories = ["Communication", "Personality", "Leadership"];

  const filtered = useMemo(() => {
    return programData.filter((p) => {
      const matchCategory =
        categoryFilter === "All" || p.category === categoryFilter;
      const matchSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [categoryFilter, search]);

  const totalPages = Math.ceil(filtered.length / programsPerPage);
  const programs = filtered.slice(
    (page - 1) * programsPerPage,
    page * programsPerPage
  );

  return (
    <Container>
      <Header>
        <Title>Program Kelas</Title>
        <Desc>
          Program pelatihan profesional untuk membangun attitude, komunikasi,
          dan kepemimpinan berkelas.
        </Desc>
      </Header>

      {/* Search */}
      <SearchWrapper>
        <SearchInput
          placeholder="Cari program..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </SearchWrapper>

      {/* Category Filter */}
      <FilterWrapper>
        <FilterButton
          active={categoryFilter === "All"}
          onClick={() => {
            setCategoryFilter("All");
            setPage(1);
          }}
        >
          Semua Program
        </FilterButton>

        {categories.map((cat) => (
          <FilterButton
            key={cat}
            active={categoryFilter === cat}
            onClick={() => {
              setCategoryFilter(cat);
              setPage(1);
            }}
          >
            {cat}
          </FilterButton>
        ))}
      </FilterWrapper>

      {/* Program Grid */}
      <ProgramGrid>
        {programs.map((p) => (
          <ProgramCard key={p.id}>
            <ProgramImageWrapper>
              <Badge>{p.level}</Badge>
              <ProgramImage src={p.image} />
            </ProgramImageWrapper>

            <ProgramBody>
              <ProgramTitle>{p.title}</ProgramTitle>
              <ProgramMeta>{p.category}</ProgramMeta>
              <ProgramPrice>
                Investasi: Rp {p.price.toLocaleString("id-ID")}
              </ProgramPrice>
            </ProgramBody>

            <ProgramFooter>
              <Button to="/contact">Daftar Sekarang</Button>
            </ProgramFooter>
          </ProgramCard>
        ))}
      </ProgramGrid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            &lt;
          </PageButton>

          {[...Array(totalPages)].map((_, i) => (
            <PageButton
              key={i}
              active={page === i + 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}

          <PageButton
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            &gt;
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
};

export default ProgramKelas;
