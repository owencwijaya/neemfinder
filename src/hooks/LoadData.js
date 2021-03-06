import { useContext } from "react";
import { MahasiswaContext } from "../components/MahasiswaProvider";

// Forking dari datanya Ka MK
const DOWNLOAD_URL =
  "https://cdn.jsdelivr.net/gh/clumsyyyy/neemfinder/src/components/data/data.json";

export function useLoadLocalData() {
  const { setDatabase } = useContext(MahasiswaContext);

  return () => {
    const data = localStorage.getItem("database");

    if (data) {
      try {
        setDatabase(JSON.parse(data));
      } catch {
        return false;
      }
    } else {
      return false;
    }
  };
}

export async function DownloadDatabase() {
  // Dummy data
  // var tempData = require("../components/data/data.json");
  const downloadedData = await fetch(DOWNLOAD_URL);
  const tempData = await downloadedData.json();

  var i = 0;
  for (i = 0; i < tempData.length; i++) {
    var kode = "";
    var data = "";
    if (tempData[i].length === 2) {
      tempData[i].push("-");
      kode = tempData[i][1].substr(0, 3);
      data =
        "TPB " + require("../components/data/kodeTPB.json")[parseInt(kode)];
    } else if (tempData[i].length === 3) {
      kode = tempData[i][2].substr(0, 3);
      data = require("../components/data/kodeJurusan.json")[parseInt(kode)];
    }

    tempData[i].push(data);
  }

  return tempData;
}

export function useLoadData() {
  const { setDatabase } = useContext(MahasiswaContext);

  const localData = useLoadLocalData();

  return async () => {
    if (!localData()) {
      const data = await DownloadDatabase();
      localStorage.setItem("database", JSON.stringify(data));
      setDatabase(data);
    }

    return true;
  };
}
