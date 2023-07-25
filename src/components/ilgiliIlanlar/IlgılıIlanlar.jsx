import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardWrapper = styled(Paper)({
  padding: "1rem",
  textAlign: "center",
  marginBottom: "10px",
  borderRadius: "20px",
});

function IlgılıIlanlar() {
  return (
    <CardWrapper>
          <Typography
            variant="h6"
            style={{
              fontFamily: "Arial",
              fontSize: "14px",
              fontWeight: "normal",
            }}
          >
            İlgini Çekebilecek İlanlar
          </Typography>
        </CardWrapper>
  )
}

export default IlgılıIlanlar;