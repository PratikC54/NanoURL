import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaChartLine, FaLink, FaMousePointer, FaSyncAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useStoreContext } from "../contextApi/ContextApi.jsx";
import Graph from "./Graph.jsx";
import UrlClicksChart from "./UrlClicksChart.jsx";
import StatCard from "./StatCard.jsx";
import { fetchMyUrls, fetchTotalClicks, getDateRange } from "./dashboardApi.js";

function DashboardLayout() {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [myUrls, setMyUrls] = useState([]);
  const [clickTimeline, setClickTimeline] = useState([]);
  const { startDate, endDate } = useMemo(() => getDateRange(30), []);

  const loadAnalytics = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const [urls, clicks] = await Promise.all([ 
        fetchMyUrls(token),
        fetchTotalClicks(token, startDate, endDate),
      ]);
      setMyUrls(urls);
      setClickTimeline(clicks);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load analytics");
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [token, startDate, endDate]);

  const totalClicks = useMemo(
    () => clickTimeline.reduce((sum, d) => sum + Number(d.count), 0),
    [clickTimeline],
  );

  const totalFromUrls = useMemo(
    () => myUrls.reduce((sum, u) => sum + (u.clickCount ?? 0), 0),
    [myUrls],
  );

  const avgPerLink =
    myUrls.length > 0 ? (totalFromUrls / myUrls.length).toFixed(1) : "0";

  function onError() {
    navigate("/error", { state: { message: "Failed to load analytics data. Please try again later." } });
    toast.error("Failed to load analytics");
  }


  return (
    <div className="relative min-h-[calc(100svh-4rem)] overflow-x-hidden bg-slate-950 text-slate-200">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute right-0 top-1/4 h-[24rem] w-[24rem] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-violet-400">
              Analytics
            </p>
            <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
              Your link{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                dashboard
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
              Track total clicks and performance across all your short URLs.
              Showing data from {startDate} to {endDate}.
            </p>
          </div>
          <button
            type="button"
            onClick={loadAnalytics}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-violet-500/40 hover:bg-slate-800/80 disabled:opacity-50 sm:self-auto"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </header>

        {loading ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
            <p className="text-slate-400">Loading analytics…</p>
          </div>
        ) : (
          <>
            <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                icon={FaMousePointer}
                label="Total clicks"
                value={totalClicks.toLocaleString()}
                hint="Last 30 days (timeline)"
                accent="violet"
              />
              <StatCard
                icon={FaLink}
                label="Active links"
                value={myUrls.length}
                hint={`${totalFromUrls.toLocaleString()} lifetime clicks on links`}
                accent="cyan"
              />
              <StatCard
                icon={FaChartLine}
                label="Avg. per link"
                value={avgPerLink}
                hint="Mean click count per URL"
                accent="fuchsia"
              />
            </section>

            <section className="mb-8 grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-xl backdrop-blur-sm sm:p-6">
                <h2 className="text-lg font-semibold text-white">
                  Clicks over time
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Daily click volume across all your URLs
                </p>
                <div className="mt-6">
                  {clickTimeline.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-950/40 px-6 text-center">
                      <p className="font-medium text-slate-300">
                        No clicks yet
                      </p>
                      <p className="mt-2 max-w-sm text-sm text-slate-500">
                        Share your short links to see engagement trends here.
                      </p>
                    </div>
                  ) : (
                    <Graph graphData={clickTimeline} />
                  )}
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-xl backdrop-blur-sm sm:p-6">
                <h2 className="text-lg font-semibold text-white">
                  Top links by clicks
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Your best-performing short URLs
                </p>
                <div className="mt-6">
                  {myUrls.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-950/40 px-6 text-center">
                      <p className="font-medium text-slate-300">
                        No short links yet
                      </p>
                      <p className="mt-2 max-w-sm text-sm text-slate-500">
                        Create a short URL from the home page to start tracking.
                      </p>
                    </div>
                  ) : (
                    <UrlClicksChart urls={myUrls} />
                  )}
                </div>
              </article>
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 shadow-xl backdrop-blur-sm sm:p-6">
              <h2 className="text-lg font-semibold text-white">Your URLs</h2>
              <p className="mt-1 text-sm text-slate-400">
                All shortened links and their click counts
              </p>

              {myUrls.length === 0 ? (
                <p className="mt-8 text-center text-slate-500">
                  No URLs to display.
                </p>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[32rem] text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="pb-3 pr-4 font-medium">Short URL</th>
                        <th className="pb-3 pr-4 font-medium">Original</th>
                        <th className="pb-3 pr-4 font-medium">Clicks</th>
                        <th className="pb-3 font-medium">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myUrls.map((url) => (
                        <tr
                          key={url.id}
                          className="border-b border-white/5 transition hover:bg-white/[0.02]"
                        >
                          <td className="py-3 pr-4 font-mono text-cyan-300">
                            <Link to={`${import.meta.env.VITE_FRONTEND_URL}/${url.shorturl}`} target="_blank" rel="noopener noreferrer">
                              {url.shorturl}
                            </Link>
                          </td>
                          <td className="max-w-[12rem] truncate py-3 pr-4 text-slate-300 sm:max-w-xs">
                            {url.originalurl}
                          </td>
                          <td className="py-3 pr-4">
                            <span className="inline-flex rounded-full bg-violet-500/20 px-2.5 py-0.5 font-semibold text-violet-200">
                              {url.clickCount ?? 0}
                            </span>
                          </td>
                          <td className="py-3 text-slate-400">
                            {url.dateTime
                              ? new Date(url.dateTime).toLocaleDateString()
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardLayout;
