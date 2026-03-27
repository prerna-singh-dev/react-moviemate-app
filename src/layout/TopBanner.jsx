function TopBanner({ heading }) {
  const bannerHeading = heading?.trim() || "MovieMate";

  return (
    <section className="bg-[url(/header-background-1280.webp)] xl:bg-[url(/header-background-1920.webp)] bg-black/80 bg-blend-overlay w-full h-50 bg-cover bg-center bg-no-repeat relative">
      <h1 className="absolute inset-0 flex justify-center items-center text-center px-4 text-white text-3xl sm:text-5xl tracking-widest bitcount-single-500 capitalize">
        {bannerHeading}
      </h1>
    </section>
  );
}

export default TopBanner;
