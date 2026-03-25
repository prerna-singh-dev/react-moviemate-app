import SpinLoader from "./SpinLoader";

function LoadingUI() {
  return (
    <section className="w-full h-full flex justify-center items-center py-50">
      <SpinLoader />
    </section>
  );
}

export default LoadingUI;
