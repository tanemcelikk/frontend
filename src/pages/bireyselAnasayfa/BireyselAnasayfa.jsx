/* Author: Hasan Basri BİLGE
Last Update: 25.07.2023 */

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import GonderiCard from "../../components/gonderiCard/gonderiCard";
import GonderiYap from "../../components/gonderiYap/gonderiYap";
import ProfilComp from "../../components/bryselAsayfaProfilComp/profilComp";
import TakipEdilenFirmalar from "../../components/tkpEdilenFirmalar/TakipEdilenFirmalar";
import IlgılıIlanlar from "../../components/ilgiliIlanlar/IlgılıIlanlar";
import PopulerIcerikler from "../../components/populerIcerikler/PopulerIcerikler";
import { getAllPosts } from "../../services/postServices";

const PageWrapper = styled(Grid)({
  padding: "2rem",
  margin: "0 auto",
  maxWidth: "1300px",
  marginTop: "-20px",
  width: "100%",
});

const BireyselAnasayfa = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        console.error("Coulnt fetch the all posts data due to :" + err.message);
      });
  }, []);

  return (
    <PageWrapper container spacing={3} justifyContent="center">
      <Grid
        item
        xs={12}
        sm={5}
        md={2.5}
        sx={{
          display: "none",
          "@media (min-width: 960px)": { display: "block" },
        }}
      >
        {/* Birinci Kolon */}
        <ProfilComp />
        <TakipEdilenFirmalar />
      </Grid>
      <Grid
        item
        xs={12}
        sm={5}
        md={6}
        sx={{
          textAlign: "center",
          "@media (min-width: 960px)": { display: "block" },
        }}
      >
        {/* İkinci Kolon */}
        <GonderiYap  />
        {posts.map((post) => (
          <GonderiCard postData={post}/>
        ))}
      </Grid>

      <Grid
        item
        xs={12}
        sm={5}
        md={3.5}
        sx={{
          display: "none",
          "@media (min-width: 960px)": { display: "block" },
        }}
      >
        {/* Üçüncü Kolon */}
        <IlgılıIlanlar />
        <PopulerIcerikler />
      </Grid>
    </PageWrapper>
  );
};

export default BireyselAnasayfa;
