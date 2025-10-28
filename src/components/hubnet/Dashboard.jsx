import { useEffect, useState } from "react";

import { hubnetApi } from "@lib/api/hubnetApi";
import DataCard from "./DataCard";
export default function Dashboard() {
  const [dataCard, setDataCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchDashboardCard = async () => {
      try {
        // const response = await apiClient.get("/hubnet/dashboard-card");
        const response = await hubnetApi.dashboardCard();
        if (!cancelled) {
          setDataCard(response);
        }
      } catch (error) {
        if (!cancelled) {
          const message =
            error instanceof Error && error.message
              ? error.message
              : "Gagal memuat data dashboard.";
          setErrorMessage(message);
          console.error("Gagal memuat data dashboard Hubnet:", error);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardCard();
    const fetchDataTerkirim = async () => {
      const response = await hubnetApi.getDataTerkirim({
        flt_date: "07-10-2025",
        page: 1,
        per_page: 10,
      });
      console.log(response);
    };
    fetchDataTerkirim();
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div className="col-auto">
      <div className="mb-4">
        <h5 className="fw-bold mb-1 text-uppercase">
          Data Tracking yang terkirim
        </h5>
        <p className="text-muted mb-0">
          Menampilkan jumlah, dan data tracking yang terkirim ke Hubnet
        </p>
        {isLoading && <p className="text-muted small mb-0">Memuat data...</p>}
        {!isLoading && errorMessage && (
          <p className="text-danger small mb-0">{errorMessage}</p>
        )}
        {!isLoading && !errorMessage && <DataCard dataCard={dataCard} />}
      </div>
      <div></div>
    </div>
  );
}
