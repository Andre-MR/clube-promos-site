import Offer from "../../../models/offer";
import SanitizeURL from "../../../utils/sanitize-url";

type Props = {
  offer: Offer;
};

export default function CardLogoSocialWhatsapp(props: Props) {
  const sanitizedURL = props.offer ? SanitizeURL(props.offer.Title) : "";

  return (
    <a
      target={"_blank"}
      rel="noreferrer"
      href={`https://api.whatsapp.com/send?text=*${sanitizedURL.replace(
        /\*/g,
        ""
        // )}*%0A${props.offer.Url}`}
      )}*%0A${process.env.NEXT_PUBLIC_MAIN_URL}/ofertas/${
        props.offer.SK
      }/${sanitizedURL}`}
    >
      <div className="absolute top-44 right-4 z-20 flex flex-col items-end justify-between">
        <svg
          className="animate-heartbeat fill-current text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 308 308"
          width={16}
        >
          <path
            className=""
            d="M227.904 176.981c-.6-.288-23.054-11.345-27.044-12.781-1.629-.585-3.374-1.156-5.23-1.156-3.032 0-5.579 1.511-7.563 4.479-2.243 3.334-9.033 11.271-11.131 13.642-.274.313-.648.687-.872.687-.201 0-3.676-1.431-4.728-1.888-24.087-10.463-42.37-35.624-44.877-39.867-.358-.61-.373-.887-.376-.887.088-.323.898-1.135 1.316-1.554 1.223-1.21 2.548-2.805 3.83-4.348.607-.731 1.215-1.463 1.812-2.153 1.86-2.164 2.688-3.844 3.648-5.79l.503-1.011c2.344-4.657.342-8.587-.305-9.856-.531-1.062-10.012-23.944-11.02-26.348-2.424-5.801-5.627-8.502-10.078-8.502-.413 0 0 0-1.732.073-2.109.089-13.594 1.601-18.672 4.802C90 87.918 80.89 98.74 80.89 117.772c0 17.129 10.87 33.302 15.537 39.453.116.155.329.47.638.922 17.873 26.102 40.154 45.446 62.741 54.469 21.745 8.686 32.042 9.69 37.896 9.69h.001c2.46 0 4.429-.193 6.166-.364l1.102-.105c7.512-.666 24.02-9.22 27.775-19.655 2.958-8.219 3.738-17.199 1.77-20.458-1.348-2.216-3.671-3.331-6.612-4.743z"
          />
          <path
            className=""
            d="M156.734 0C73.318 0 5.454 67.354 5.454 150.143c0 26.777 7.166 52.988 20.741 75.928L.212 302.716c-.484 1.429-.124 3.009.933 4.085C1.908 307.58 2.943 308 4 308c.405 0 .813-.061 1.211-.188l79.92-25.396c21.87 11.685 46.588 17.853 71.604 17.853C240.143 300.27 308 232.923 308 150.143 308 67.354 240.143 0 156.734 0zm0 268.994c-23.539 0-46.338-6.797-65.936-19.657-.659-.433-1.424-.655-2.194-.655-.407 0-.815.062-1.212.188l-40.035 12.726 12.924-38.129c.418-1.234.209-2.595-.561-3.647-14.924-20.392-22.813-44.485-22.813-69.677 0-65.543 53.754-118.867 119.826-118.867 66.064 0 119.812 53.324 119.812 118.867.001 65.535-53.746 118.851-119.811 118.851z"
          />
        </svg>
        <p className="text-xs text-green-600">Compartilhar</p>
      </div>
    </a>
  );
}

export async function getStaticProps() {
  return {
    props: "",
  };
}
