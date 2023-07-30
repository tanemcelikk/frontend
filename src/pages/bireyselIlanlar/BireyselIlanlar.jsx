import React from "react";
import { useState } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/joy/Typography";
import İlan from "../../components/İlan/İlan";
import db from "../../data/db.json";
import Button from "@mui/material/Button";
import "./BireyselIlanlar.css";

const jobOptions = [{ title: "Staj İlanı" }, { title: "İş İlanı" }];
const companies = [
  { title: "Aselsan" },
  { title: "Havelsan" },
  { title: "Roketsan" },
  { title: "TUSAŞ" },
  { title: "TR EĞİTİM VE TEKNOLOJİ A.Ş." },
];
const bolumler = [
  { title: "Bilgisayar Mühendisliği" },
  { title: "Elektrik-Elektronik Mühendisliği" },
  { title: "Endüstri Mühendisliği" },
  { title: "Makine Mühendisliği" },
];

function BireyselIlanlar() {
  const [applications, setApplications] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
 
  const addApplication = (newApplication) => {
    const apiUrl = 'http://localhost:3000/bireysel-ilanlar';
    axios.post(apiUrl, newApplication)
      .then(response => {
        setApplications([...applications, response.data]);
      })
      .catch((error) => {
        console.error("Başvuru eklemede problem gerçekleşti:", error);
      });
  };
  const deleteApplication = (applicationId) => {

    const apiUrl = `http://localhost:3000/bireysel-ilanlar/${applicationId}`;
    axios.delete(apiUrl)
      .then(() => {
        setApplications(applications.filter((app) => app.id !== applicationId));
      })
      .catch((error) => {
        console.error("Başvuru silmede problem gerçekleşti:", error);
      });
  };
  const handleApplyFilter = () => {
    const apiUrl = "http://localhost:3000/bireysel-ilanlar";
    const filters = {
      jobType: selectedJobs,
    };
  axios
  .get(apiUrl, { params: filters })
  .then((response) => {
    setApplications(response.data);
  })
  .catch((error) => {
    console.error("İlanları filtrelerken bir hata oluştu:", error);
  });
};

  return (
    <Grid container justifyContent="left">
      <Grid item xs={10} lg={3}>
        <Grid
          container
          direction="column"
          marginTop={6}
          marginLeft={3}
          alignItems="center"
          spacing={2}
        >
          <Stack spacing={3} sx={{ width: 250 }}>
            <Typography variant="body2" style={{ fontSize: "10px" }}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={jobOptions}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Tüm İlanlar" />
                )}
              />
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            marginTop={2}
            marginLeft={3}
            alignItems="center"
            spacing={2}
          >
            <Stack spacing={3} sx={{ width: 250 }}>
              <Typography variant="body2" style={{ fontSize: "10px" }}>
                <Autocomplete
                  value={selectedJobs}
                  onChange={(event, newValue) => setSelectedJobs(newValue)}
                  multiple
                  id="tags-outlined"
                  options={companies}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Tüm Firmalar" />
                  )}
                />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            marginTop={2}
            marginLeft={3}
            alignItems="center"
            spacing={2}
          >
            <Stack spacing={2} sx={{ width: 250 }}>
              <Typography variant="body2" style={{ fontSize: "10px" }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={bolumler}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Tüm Bölümler" />
                  )}
                />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            marginTop={2}
            marginLeft={3}
            alignItems="center"
            spacing={1}
          >
            <Box
              sx={{
                p: 1.5,
                border: 1,
                borderColor: "grey.500",
                borderRadius: 4,
                marginTop: 5,
                width: "220px",
              }}
            >
              Çalışma Şekli
            </Box>
            <FormControl sx={{ marginTop: 2, marginRight: 7 }}>
              <FormControlLabel control={<Checkbox />} label="Yüz Yüze" />
              <FormControlLabel control={<Checkbox />} label="Uzaktan" />
              <FormControlLabel control={<Checkbox />} label="Hibrit" />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            marginTop={2}
            marginLeft={3}
            alignItems="center"
            spacing={1}
          >
            <Box
              sx={{
                p: 1.5,
                border: 1,
                borderColor: "grey.500",
                borderRadius: 4,
                marginTop: 5,
                width: "220px",
              }}
            >
              Çalışma Tercihi
            </Box>
            <FormControl sx={{ marginTop: 2 }}>
              <FormControlLabel control={<Checkbox />} label="Tam Zamanlı" />
              <FormControlLabel control={<Checkbox />} label="Yarı Zamanlı" />
              <FormControlLabel control={<Checkbox />} label="Proje Bazlı" />
              <FormControlLabel
                control={<Checkbox />}
                label="Serbest Zamanlı"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item>
         <Button
          variant="outlined"
          color="primary"
          onClick={handleApplyFilter}
          style={{ marginLeft:150, marginTop: 3, marginBottom: 2, color: "black" }}>UYGULA</Button>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          marginTop={3}
          spacing={2}
        >
          {db["kurumsal-ilanlar"].map((advert, index) => (
            <Grid item key={advert.id} xs={12} sm={6}>
              <İlan
                advert={advert}
                onApply={() => addApplication({ advertId: advert.id })}
                onCancel={() => deleteApplication(advert.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BireyselIlanlar;