workbox.routing.registerRoute(
  new RegExp(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series"
  ),
  workbox.strategies.cacheFirst({
    cacheName: "covid_19_entries",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      }),
    ],
  })
);
