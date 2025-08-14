import DoctorReviews from "@/components/DoctorReviews";

export default function ReviewsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Patient Reviews</h1>
      <DoctorReviews />
    </div>
  );
}
