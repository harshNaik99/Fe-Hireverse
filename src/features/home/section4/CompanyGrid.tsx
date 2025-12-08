import { CompanyCard,type Company } from "./CompanyCard";

export function CompanyGrid({ companies }: { companies: Company[] }) {
  return (
    <div
      className="
      max-w-6xl mx-auto 
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
      gap-6 place-items-center
    "
    >
      {companies.map((c) => (
        <CompanyCard key={c.id} company={c} />
      ))}
    </div>
  );
}
