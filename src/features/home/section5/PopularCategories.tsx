
import { categories } from "../../../lib/categories";
import CategoryGrid from "../section5/CategoryGrid";

export default function PopularCategories() {
  return (
    <section className="w-full py-16">
      <div className="text-center mb-12">
      <h2
          className="
            text-4xl md:text-5xl font-bold text-white mb-3
          "
          style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
        >
          Popular Job Categories
        </h2>

        <p className="text-cyan-300 text-lg">
          Browse jobs across the most active fields
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <CategoryGrid items={categories} />
      </div>
    </section>
  );
}
