import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div className="flex items-center">
      <Image
        src="/logoprovex_blanco.png"
        alt="Company Logo"
        width={350}
        height={300}
        className="object-contain"
      />
    </div>
  );
}
