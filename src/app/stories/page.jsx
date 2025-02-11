import Stories from "@/components/stories/Stories";

export default function StoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Stories</h1>
      {/* Add your stories content here */}
      <Stories stories={['', '','']}/>
    </div>
  );
} 