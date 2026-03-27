import SpinLoader from "../ui/SpinLoader";

function LoadingUI() {
  return (
    <section
      className="w-full h-full flex flex-col gap-4 justify-center items-center py-50"
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
    >
      <SpinLoader />
      <p className="text-sm text-gray-600">Loading...</p>
    </section>
  );
}

export default LoadingUI;
