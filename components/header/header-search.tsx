import router from "next/router";

export default function HeaderSearch() {
  return (
    <div className="mx-2 flex w-2/3 space-x-1 rounded bg-white">
      <input
        className="w-full rounded p-2 text-xs"
        type={"text"}
        placeholder="Pesquisar produto"
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            router.push({
              pathname: `/busca/${e.currentTarget.value}`,
            });
          }
        }}
      />

      <button className="flex w-10 items-center justify-center rounded bg-amber-400 text-xs text-white">
        <svg
          aria-hidden="true"
          height="24px"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
}
