import ApplicationForm from "@/components/apply/ApplicationForm";
import SuccessView from "@/components/apply/SuccessView";

export default function Page() {
  return (
    <div className="container min-h-[90vh] flex justify-center items-start">
      {/* <ApplicationForm /> */}
      <SuccessView />
    </div>
  );
}
