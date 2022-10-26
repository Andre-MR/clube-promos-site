import Image from "next/image";

export default function CardLogoBrand() {
  return (
    <div
      className="absolute top-2 right-2 z-20 flex items-center justify-center rounded-full text-center 
        text-xs font-bold tracking-wide opacity-90"
    >
      <Image
        src="/images/logo-clubepromos.png"
        priority={true}
        alt="Store Logo"
        width={30}
        height={30}
        layout="fixed"
      />
    </div>
  );
}
