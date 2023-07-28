import React from "react";
import Grid from "@mui/material/Grid";
import İlanDetay from "../../components/ilanDetay/İlanDetay";
import Basvuranlar from "../../components/basvuranlar/Basvuranlar";
import Typography from "@mui/joy/Typography";
import db from "../../data/db.json";

function KurumsalIlan() {
  return (
    <Grid container spacing={0} sx={{ marginTop: "60px" }}>
      <Grid
        item
        lg={7}
        md={10}
        sx={{ paddingRight: "100px", paddingLeft: "80px" }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          marginTop={3}
          spacing={2}
        >
          <Typography
            level="h6"
            className="Typography"
            style={{ marginRight: 410, marginTop: 2 }}
          >
            İLAN DETAYI
          </Typography>
          {db["advert-detail"].map((advert, index) => (
            <Grid
              item
              key={advert.id}
              xs={12}
              sm={12}
              marginTop={5}
              marginLeft={10}
            >
              <İlanDetay advert={advert} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        item
        lg={4}
        md={12}
        sx={{
          paddingRight: "150px",
          "@media (max-width: 1280px)": {
            textAlign: "center",
            paddingRight: "5px",
          },
        }}
      >
        <Typography
          level="h6"
          className="Typography"
          style={{ marginLeft: 2, marginTop: 20 }}
        >
          BAŞVURANLAR
        </Typography>

        <div style={{ marginTop: 60, marginRight: 10 }}>
          {db.applicant.map((applicant) => (
            <Basvuranlar key={applicant.id} applicant={applicant} />
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default KurumsalIlan;
