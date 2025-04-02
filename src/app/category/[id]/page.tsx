import CategoryContent from "./CategoryContent";

export default function CategoryPage({ params }: { params: { id: string } }) {
  return <CategoryContent id={params.id} />;
}
