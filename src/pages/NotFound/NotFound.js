// Not found page
export default function NotFound() {
  return (
    <div className="text-5xl flex w-full h-full items-center justify-center">
      <div className="w-1/3 text-center leading-relaxed dark:text-white">
        Whoops! Looks like the page you were looking for doesn't exist.{" "}
        <a href="/" className="text-green-500 hover:underline">
          Go back!
        </a>
      </div>
    </div>
  );
}
