export default async function StatusBar({
  title,
  className
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={`w-full text-center flex flex-row gap-4 px-4 py-2 bg-[#1DB954] ${className}`}>
      <h3 className="font-semibold text-gray-950 uppercase tracking-tight text-sm flex-1">{title}</h3>
    </div>
  );
}