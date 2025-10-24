import { useEffect, useMemo, useState, useRef } from "react";
import { apiClient } from "@lib/api/client";
import "@libs/flatpickr/flatpickr.scss";
const MONTH_LABELS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function ReportInvoice() {
  const [modules, setModules] = useState({});
  const [seriesData, setSeriesData] = useState(() => MONTH_LABELS.map(() => 0));
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    () => new Date().getMonth() + 1
  );
  const [dailySeriesData, setDailySeriesData] = useState([]);
  const [isLoadingDaily, setIsLoadingDaily] = useState(true);
  const [errorDaily, setErrorDaily] = useState("");
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const totalInvoices = useMemo(
    () =>
      seriesData.reduce(
        (accumulator, value) => accumulator + Number(value || 0),
        0
      ),
    [seriesData]
  );
  const hasData = useMemo(
    () => seriesData.some((value) => Number(value) > 0),
    [seriesData]
  );

  const daysInSelectedMonth = useMemo(
    () => new Date(currentYear, selectedMonth, 0).getDate(),
    [currentYear, selectedMonth]
  );
  const dayLabels = useMemo(
    () => Array.from({ length: daysInSelectedMonth }, (_, index) => index + 1),
    [daysInSelectedMonth]
  );
  const totalInvoicesSelectedMonth = useMemo(
    () =>
      dailySeriesData.reduce(
        (accumulator, value) => accumulator + Number(value || 0),
        0
      ),
    [dailySeriesData]
  );
  const hasDailyData = useMemo(
    () => dailySeriesData.some((value) => Number(value) > 0),
    [dailySeriesData]
  );

  useEffect(() => {
    let isMounted = true;
    const moduleList = {
      ReactApexChart: import("react-apexcharts"),
      flatpickr: import("flatpickr"),
    };
    // load semua modul bersamaan
    Promise.all(Object.values(moduleList))
      .then((loadedModules) => {
        if (isMounted) {
          // mapping hasil import ke nama modul
          const mapped = Object.keys(moduleList).reduce((acc, key, idx) => {
            acc[key] = loadedModules[idx].default || loadedModules[idx];
            return acc;
          }, {});
          setModules(mapped);
        }
      })
      .catch((err) => console.error("❌ Failed to load modules:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  // pake modul yang sudah dimuat
  const { ReactApexChart, flatpickr } = modules;

  // ------------------------------------------------------------

  useEffect(() => {
    let isMounted = true;

    const fetchMonthlyReport = async () => {
      setIsLoadingData(true);
      setError("");

      try {
        const response = await apiClient.get(
          `/angkasapura/invoice-perbulan/${currentYear}`
        );
        const normalized = MONTH_LABELS.map((_, index) => {
          if (!Array.isArray(response)) {
            return 0;
          }

          const entry = response.find(
            (item) => Number(item?.month) === index + 1
          );
          const value = entry?.total_sent ?? 0;
          const parsed = Number(value);

          return Number.isFinite(parsed) ? parsed : 0;
        });

        if (isMounted) {
          setSeriesData(normalized);
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err?.message ?? "Gagal mengambil data laporan invoice.";
          setError(message);
          setSeriesData(MONTH_LABELS.map(() => 0));
        }
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    };

    fetchMonthlyReport();

    return () => {
      isMounted = false;
    };
  }, [currentYear]);

  useEffect(() => {
    let isMounted = true;

    const fetchDailyReport = async () => {
      if (!dayLabels.length) {
        if (isMounted) {
          setDailySeriesData([]);
          setIsLoadingDaily(false);
        }
        return;
      }

      setIsLoadingDaily(true);
      setErrorDaily("");

      try {
        const response = await apiClient.get(
          `/angkasapura/invoice-perbulan/${currentYear}/${selectedMonth}`
        );
        const normalized = dayLabels.map((day) => {
          if (!Array.isArray(response)) {
            return 0;
          }

          const entry = response.find((item) => Number(item?.day) === day);
          const value = entry?.total_sent ?? 0;
          const parsed = Number(value);

          return Number.isFinite(parsed) ? parsed : 0;
        });

        if (isMounted) {
          setDailySeriesData(normalized);
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err?.message ?? "Gagal mengambil data laporan invoice harian.";
          setErrorDaily(message);
          setDailySeriesData(dayLabels.map(() => 0));
        }
      } finally {
        if (isMounted) {
          setIsLoadingDaily(false);
        }
      }
    };

    fetchDailyReport();

    return () => {
      isMounted = false;
    };
  }, [currentYear, selectedMonth, dayLabels]);

  const chartOptions = useMemo(
    () => ({
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      noData: {
        text: "Belum ada data invoice untuk ditampilkan.",
        align: "center",
        verticalAlign: "middle",
        style: {
          fontSize: "14px",
          color: "#6c757d",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.6,
          opacityFrom: 0.45,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      xaxis: {
        type: "category",
        categories: MONTH_LABELS,
        title: {
          text: `Periode ${currentYear}`,
        },
      },
      yaxis: {
        title: {
          text: "Jumlah Invoice Terkirim",
        },
        min: 0,
        forceNiceScale: true,
      },
      tooltip: {
        y: {
          formatter: (value) => `${value} invoice`,
        },
      },
    }),
    [currentYear]
  );

  const chartSeries = useMemo(
    () => [
      {
        name: `Invoice Terkirim ${currentYear}`,
        data: seriesData,
      },
    ],
    [seriesData, currentYear]
  );

  const dailyChartOptions = useMemo(
    () => ({
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      noData: {
        text: "Belum ada data invoice untuk periode ini.",
        align: "center",
        verticalAlign: "middle",
        style: {
          fontSize: "14px",
          color: "#6c757d",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.6,
          opacityFrom: 0.45,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      xaxis: {
        type: "category",
        categories: dayLabels.map((day) => String(day)),
        title: {
          text: `Bulan ${MONTH_LABELS[selectedMonth - 1]} ${currentYear}`,
        },
      },
      yaxis: {
        title: {
          text: "Jumlah Invoice Terkirim",
        },
        min: 0,
        forceNiceScale: true,
      },
      tooltip: {
        y: {
          formatter: (value) => `${value} invoice`,
        },
      },
    }),
    [dayLabels, currentYear, selectedMonth]
  );

  const dailyChartSeries = useMemo(
    () => [
      {
        name: `Invoice Terkirim ${
          MONTH_LABELS[selectedMonth - 1]
        } ${currentYear}`,
        data: dailySeriesData,
      },
    ],
    [dailySeriesData, selectedMonth, currentYear]
  );
  // flatficker bisa dipakai di sini
  const inputRef = useRef(null);
  useEffect(() => {
    if (!flatpickr || !inputRef.current) {
      return undefined;
    }

    const instance = flatpickr(inputRef.current, {
      dateFormat: "Y-m-d",
      defaultDate: new Date(),
      allowInput: true,
    });

    return () => {
      instance.destroy();
    };
  }, [flatpickr]);

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-6">
          <h5 className="fw-bold mb-1 text-uppercase">
            Laporan Invoice Terkirim
          </h5>
          <p className="text-muted mb-0">
            Pantau performa pengiriman invoice per bulan.
          </p>
        </div>
        <div className="col-6">
          <div className="form-floating form-floating-outline col-6">
            <input
              id="floatingInput"
              ref={inputRef}
              type="text"
              className="form-control"
            />
            <label htmlFor="floatingInput">Export Excel Report</label>
          </div>
        </div>
      </div>
      <div className="row g-2 mt-4">
        <div className="col-sm-12 col-md-6 col-lg-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                <div>
                  <small className="text-muted text-uppercase fw-semibold d-block">
                    Periode
                  </small>
                  <span className="fs-5 fw-semibold text-heading">
                    Tahun {currentYear}
                  </span>
                </div>
                <div className="text-end">
                  <small className="text-muted text-uppercase fw-semibold d-block">
                    Total Invoice
                  </small>
                  <span className="fs-4 fw-bold text-primary">
                    {totalInvoices}
                  </span>
                </div>
              </div>
              {error ? (
                <div className="alert alert-warning mb-0" role="alert">
                  {error}
                </div>
              ) : isLoadingData ? (
                <div className="py-5 text-center text-muted">
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                    aria-hidden="true"
                  ></div>
                  <span>Mengambil data laporan invoice...</span>
                </div>
              ) : ReactApexChart ? (
                <>
                  <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    height={300}
                  />
                  {!hasData ? (
                    <p className="text-muted text-center fst-italic mt-3 mb-0">
                      Belum ada invoice yang terkirim pada tahun ini.
                    </p>
                  ) : null}
                </>
              ) : (
                <div className="py-5 text-center text-muted">
                  Memuat chart...
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-start gap-3 mb-4">
                <div>
                  <small className="text-muted text-uppercase fw-semibold d-block">
                    Pilih Bulan
                  </small>
                  <div className="d-flex align-items-center gap-2">
                    <span className="fs-6 fw-semibold text-heading">
                      Tahun {currentYear}
                    </span>
                    <select
                      className="form-select form-select-sm w-auto"
                      value={selectedMonth}
                      onChange={(event) =>
                        setSelectedMonth(Number(event.target.value))
                      }
                    >
                      {MONTH_LABELS.map((label, index) => (
                        <option key={label} value={index + 1}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="ms-md-auto text-end">
                  <small className="text-muted text-uppercase fw-semibold d-block">
                    Total Invoice Bulan Ini
                  </small>
                  <span className="fs-4 fw-bold text-primary">
                    {totalInvoicesSelectedMonth}
                  </span>
                </div>
              </div>
              {errorDaily ? (
                <div className="alert alert-warning mb-0" role="alert">
                  {errorDaily}
                </div>
              ) : isLoadingDaily ? (
                <div className="py-5 text-center text-muted">
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                    aria-hidden="true"
                  ></div>
                  <span>Mengambil data invoice harian...</span>
                </div>
              ) : ReactApexChart ? (
                <>
                  <ReactApexChart
                    options={dailyChartOptions}
                    series={dailyChartSeries}
                    type="area"
                    height={300}
                  />
                  {!hasDailyData ? (
                    <p className="text-muted text-center fst-italic mt-3 mb-0">
                      Belum ada invoice yang terkirim pada bulan ini.
                    </p>
                  ) : null}
                </>
              ) : (
                <div className="py-5 text-center text-muted">
                  Memuat chart...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
