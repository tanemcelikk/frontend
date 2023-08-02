import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "../bg/login.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "50px",
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

export default function Login() {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(`https://localhost:7029/api/Auth/login`, { email, password })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        const token = localStorage.getItem("token");
        if (res.data.control === true) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          axios.post(`https://localhost:7029/api/Login/logincontrol`);
          navigate("/kurumsal-profil");
        } else {
          navigate("/kurumsal-anasayfa");
        }
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      ></Snackbar>
      <div>
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#1e90ff",
                  borderRadius: "50px",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={80} />
                    <Box sx={center}>
                      <Typography color="#ffff" component="h1" variant="h4">
                        Giriş Yap
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 2 }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="E-posta"
                            name="email"
                            value={email}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            name="şifre"
                            label="Şifre"
                            type="password"
                            id="şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <FormControlLabel
                              sx={{ width: "60%" }}
                              onClick={() => setRemember(!remember)}
                              control={<Checkbox checked={remember} />}
                              label="Beni Hatırla"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth="true"
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#3b33d5",
                            }}
                          >
                            GİRİŞ YAP
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{
                                marginTop: "10px",
                                marginLeft: "100px ",
                              }}
                            >
                              Henüz hesabın yok mu?{" "}
                              <span
                                style={{
                                  color: "#f8f8ff",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate("/kayit-ol-kurumsal");
                                }}
                              >
                                Kayıt Ol
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
