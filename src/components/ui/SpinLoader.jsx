function SpinLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className="animate-spin motion-reduce:animate-none rounded-full h-20 w-20 border-8 border-orange-200 border-t-orange-700"
    />
  );
}

export default SpinLoader;
