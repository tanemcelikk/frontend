import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { getAllPosts } from "../../services/postServices";
import FirmaBilgileri from "./FirmaBilgileri/FirmaBilgiler";
import EditFirmaBilgileri from "./FirmaBilgileri/EditFirmaBilgileri";
import NewPost from "../bireyselProfil/NewPost";
import GonderiCard from "../../components/gonderiCard/gonderiCard";
import { getCompanyProfile, updateCompanyProfileInformation } from "../../services/companyService";

const PageWrapper = styled(Grid)({
  padding: "2rem",
  margin: "0 auto",
  maxWidth: "1200px",
  marginTop: "-20px",
});

const ProfileWrapper = styled(Paper)({
  display: "grid", // Use CSS Grid for the layout
  gridTemplateColumns: "auto 1fr", // Divide the card into two columns
  alignItems: "center", // Vertically center the content
  padding: "1rem",
  gap: "150px",
  marginBottom: "10px",
  borderRadius: "20px",
  position: "sticky",
});

const AvatarWrapper = styled(Avatar)({
  width: "100px",
  height: "100px",
  margin: "auto",
  borderRadius: "50%",
});

function KurumsalProfil({ avatarSrc = "url_profil_avatar", name, school }) {
  const initialPrivateCompanyInfo = {
    name: "*",
    category: "*",
    type: "*",
    totalStaff: "*",
    fDate: "*",
    location: "*",
    prof: "*",
    website: "*",
    phone: "*",
    description: "",
  };

  const [privateCompanyInfo, setPrivateCompanyInfo] = useState(
    initialPrivateCompanyInfo
  );
  const [isEditingPrivateCompanyInfo, setIsEditingPrivateCompanyInfo] =
    useState(false);

  useEffect(() => {
    getCompanyProfile()
      .then((res) => {
        setPrivateCompanyInfo(res.data);
      })
      .catch((err) => {
        setPrivateCompanyInfo(initialPrivateCompanyInfo);
      });
  }, []);

  const handleEditPrivateCompanyInfoClick = () => {
    setIsEditingPrivateCompanyInfo(true);
  };

  const handleEditPrivateCompanyInfoSave = (editedCompanyInfo) => {
    updateCompanyProfileInformation(editedCompanyInfo)    

    setIsEditingPrivateCompanyInfo(false);
    setPrivateCompanyInfo(editedCompanyInfo);
  };

  const handleEditCancel = () => {
    setIsEditingPrivateCompanyInfo(false);
  };

  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    getAllPosts()
      .then((response) => {
        setAllPosts(response.data);
      })
      .catch((error) => {
        console.log(
          "there is an error with getting the posts in bireyselporfil " +
            error.massage
        );
      });
  }, []);

  function handleRendering() {
    return (
      <>
        <div>
          <ProfileWrapper>
            <AvatarWrapper src={avatarSrc} alt="Profil Avatarı" />
            <div>
              <Typography
                variant="h6"
                style={{
                  fontFamily: "Arial",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              >
                Firma Adı
              </Typography>
            </div>
          </ProfileWrapper>
        </div>
        <div style={{ width: "100%", height: "100%", marginTop: "2rem" }}>
          <Grid container spacing={5}>
            <Grid className="left-side" item xs={6}>
              <FirmaBilgileri
                companyInfo={privateCompanyInfo}
                onEditClick={handleEditPrivateCompanyInfoClick}
              />
              <EditFirmaBilgileri
                initialData={privateCompanyInfo}
                onClose={handleEditCancel}
                onSave={handleEditPrivateCompanyInfoSave}
                isOpen={isEditingPrivateCompanyInfo}
              />
            </Grid>
            <Grid className="right-side" item xs={6}>
              <NewPost url={"/posts"} userId={1} />
              <br />
              <Paper
                className="allPosts"
                style={{
                  maxHeight: 600,
                  width: "100%",
                  elevation: "0",
                  overflow: "auto",
                  backgroundColor: "white",
                  alignContent: "center",
                }}
              >
                {allPosts.map((post, index) => (
                  <GonderiCard key={index} userPosts={post} />
                ))}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

  return (
    <PageWrapper
      className="kurumsalProfil"
      container
      spacing={4}
      justifyContent="center"
    >
      {handleRendering()}
    </PageWrapper>
  );
}

export default KurumsalProfil;
