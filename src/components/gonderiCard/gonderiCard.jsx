/* Author: Hasan Basri BİLGE
Last Update: 25.07.2023 */

import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LikeButton from "../likeButton/LikeButton";
import PaylasButton from "../paylasButton/PaylasButton";

const ButtonsWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
});
const PostCardWrapper = styled(Paper)({
  padding: "1rem",
  textAlign: "left",
  marginBottom: "10px",
  marginTop: "10px",
  borderRadius: "20px",
  marginLeft: "0px",
});
const RoundButton = styled(Button)({
  borderRadius: "20px",
  padding: "5px 10px",
});

function GonderiCard({ userPosts }) {
  return (
    <PostCardWrapper>
      <Grid container alignItems="center">
        <Grid item xs={2} sm={2} md={2}>
          <Avatar src="url_profil_avatar" alt="Profil Avatarı" />
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          <Typography
            variant="subtitle1"
            style={{
              fontFamily: "Arial",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {userPosts.first_name} <span /> {userPosts.last_name}
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              fontFamily: "Arial",
              fontSize: "12px",
              fontWeight: "normal",
              color: "textSecondary",
            }}
          >
            {userPosts.post_date}
          </Typography>
        </Grid>
      </Grid>
      <Typography
        variant="body1"
        style={{
          fontFamily: "Arial",
          fontSize: "14px",
          fontWeight: "normal",
        }}
      >
        {userPosts.comments}
      </Typography>
      <ButtonsWrapper>
        <LikeButton />
        <TextField
          label="Yorum yaz..."
          variant="outlined"
          margin="none"
          fullWidth
          size="small"
          style={{ flexGrow: 1 }}
        />
        <PaylasButton />
      </ButtonsWrapper>
    </PostCardWrapper>
  );
}

export default GonderiCard;
