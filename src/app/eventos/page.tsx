import { InfiniteEvents } from "../_components/Events/InifiniteEvents";
import { PageTitle } from "../_components/Shared/PageTitle";

export default function Events() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageTitle title="Eventos" summary="Lista de eventos" />

      <InfiniteEvents />
    </div>
  );
}
