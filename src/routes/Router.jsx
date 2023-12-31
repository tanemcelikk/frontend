import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import CompanyLayout from "../layouts/CompanyLayout";
import UserLayout from "../layouts/UserLayout";
import KayitOlBireysel from "../pages/giris/KayitOlBireysel";
import KayitOlKurumsal from "../pages/giris/KayitOlKurumsal";
import BireyselAnasayfa from "../pages/bireyselAnasayfa/BireyselAnasayfa";
import BireyselDeneyimler from "../pages/bireyselDeneyimler/BireyselDeneyimler";
import BireyselFirma from "../pages/bireyselFirma/BireyselFirma";
import BireyselFirmalar from "../pages/bireyselFirmalar/BireyselFirmalar";
import BireyselIlanlar from "../pages/bireyselIlanlar/BireyselIlanlar";
import BireyselProfil from "../pages/bireyselProfil/BireyselProfil";
import KurumsalAnasayfa from "../pages/kurumsalAnasayfa/KurumsalAnasayfa";
import KurumsalIlan from "../pages/kurumsalIlan/KurumsalIlan";
import KurumsalIlanlar from "../pages/kurumsalIlanlar/KurumsalIlanlar";
import KurumsalOnayKutusu from "../pages/kurumsalOnayKutusu/KurumsalOnayKutusu";
import KurumsalProfil from "../pages/kurumsalProfil/KurumsalProfil";
import NotFoundError from "./NotFoundError";
import SignInOutContainer from "../containers";
import { getCompany } from "../services/userService";

const Router = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCompany(null)
    .then((response) => {
    console.log(response.data);
    setData(response.data);
  })
  .catch((error) => {
    console.error("Şirket verileri alınamadı:", error);
  });
  }, []);

  if (!data) {
    // Veriler yüklenmediyse bir yükleme göstergesi veya hata mesajı ekleyebilirsiniz.
    return <div>Veriler yükleniyor...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginLayout element={<SignInOutContainer />} />} />
        <Route path="/kayit-ol-bireysel" element={<KayitOlBireysel />} />
        <Route path="/kayit-ol-kurumsal" element={<KayitOlKurumsal />} />
        <Route
          path="/bireysel-anasayfa"
          element={
            <UserLayout
              element={
                <>
                  <BireyselAnasayfa />
                </>
              }
            />
          }
        />
        <Route
          path="/bireysel-deneyimler"
          element={<UserLayout element={<BireyselDeneyimler />} />}
        />
        {data.map((firma) => (
          <Route
            key={firma.id}
            path={`/bireysel-firma/${firma.id}`}
            element={<UserLayout element={<BireyselFirma id={firma.id} />} />}
          />
        ))}
        <Route
          path="/bireysel-firmalar"
          element={<UserLayout element={<BireyselFirmalar />} />}
        />
        <Route
          path="/bireysel-ilanlar"
          element={<UserLayout element={<BireyselIlanlar />} />}
        />
        <Route
          path="/bireysel-profil"
          element={<UserLayout element={<BireyselProfil />} />}
        />

        <Route
          path="/kurumsal-anasayfa"
          element={
            <CompanyLayout
              element={
                <>
                  <KurumsalAnasayfa />
                </>
              }
            />
          }
        />
        <Route
          path="/kurumsal-ilan"
          element={<CompanyLayout element={<KurumsalIlan />} />}
        />
        <Route
          path="/kurumsal-ilanlar"
          element={<CompanyLayout element={<KurumsalIlanlar />} />}
        />
        <Route
          path="/kurumsal-onay-kutusu"
          element={<CompanyLayout element={<KurumsalOnayKutusu />} />}
        />
        <Route
          path="/kurumsal-profil"
          element={<CompanyLayout element={<KurumsalProfil />} />}
        />
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
