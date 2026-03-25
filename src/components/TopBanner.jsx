function TopBanner({ heading }) {
  return (
    <section className="bg-[url(/header-background.jpg)] bg-black/80 bg-blend-overlay w-full h-50 bg-cover bg-center bg-no-repeat relative">
      <h1 className="absolute inset-0 flex justify-center items-center text-white text-5xl tracking-widest bitcount-single-500 capitalize">
        {heading}
      </h1>
    </section>
  );
}

export default TopBanner;
