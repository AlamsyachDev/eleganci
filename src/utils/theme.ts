import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  borderColor: "rgba(180, 150, 90, 0.35)", // gold soft
  borderRadius: "8px",
  boxShadow: "0 0.5rem 1rem rgba(180, 150, 90, 0.25)",
  containerPaddingX: 48,

  palette: {
    common: {
      black: "#3f3a34",   // coklat keabu (lebih hangat dari hitam)
      white: "#ffffff",
    },

    primary: {
      main: "#c9a24d",    // GOLD utama (logo text)
      light: "#e5cf9a",   // gold terang (hover, accent lembut)
      darker: "#9e7c2f",  // gold gelap (header/footer)
    },

    secondary: {
      main: "#f7f2ea",    // CREAM / ivory (background utama)
    },
  },
};
