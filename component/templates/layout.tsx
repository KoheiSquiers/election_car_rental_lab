import React from "react";

import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { Box, Container, Paper } from "@mui/material";
import { useGetWindowSize } from "../../hooks/useGetWindowSize";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const windowSize = useGetWindowSize();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ed6c02",
        light: "#ff9800",
        dark: "#e65100",
        contrastText: "#fff",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 1025,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth={"md"}>
        <Box sx={{ mt: { md: 1 } }}>
          <Paper
            elevation={3}
            sx={{
              pt: { xs: 2, sm: 3 },
              pl: { xs: 1, sm: 3 },
              pr: { xs: 1, sm: 3 },
              pb: { xs: 2, sm: 2 },
            }}
          >
            <Box
              sx={{
                pt: { xs: 0, sm: 3 },
                pl: { xs: 0, sm: 3 },
                pr: { xs: 0, sm: 3 },
                pb: { xs: 0, sm: 0 },
                overflow: "scroll",
                height: {
                  sm: windowSize.height - 50,
                  md: windowSize.height - 65,
                },
              }}
            >
              {children}
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
