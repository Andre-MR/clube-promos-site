export default function MainFooter() {
  return (
    <footer
      className="fixed bottom-0 z-30 flex w-full flex-col items-center justify-between space-y-1 
              bg-fuchsia-900 p-2 shadow-md transition"
    >
      <div className="text-xxs flex w-full justify-between text-gray-200">
        <p>© 2022, Clube Promos</p>
        <p>
          Veja também:{" "}
          <a
            className="font-bold"
            href="https://clubebaby.com"
            target={"_blank"}
            rel="noreferrer"
          >
            Clube Baby
          </a>
        </p>
      </div>
    </footer>
  );
}
