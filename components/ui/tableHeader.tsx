interface TableHeaderProps {
  name: string;
  description: string;
}

export default function TableHeader({ name, description }: TableHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
      <p className="text-md text-gray-600">{description}</p>
    </div>
  );
}
