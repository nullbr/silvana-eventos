import { CreateOrEditEvent } from "~/app/_components/Events/CreateOrEditEvent";
import { PageTitle } from "~/app/_components/Shared/PageTitle";

export default function NewEventPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title="Novo Evento" />

      <div className="pt-4">
        <CreateOrEditEvent />
      </div>
    </div>
  );
}
