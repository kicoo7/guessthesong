export default async function StatusBar({
  title,
  className
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={`w-full text-center h-7 flex flex-row gap-4 px-2.5 py-1.5 bg-indigo-400 ${className}`}>
      <h3 className="font-semibold text-gray-950 uppercase tracking-tighter text-xs flex-1">{title}</h3>
    </div>
  );
}