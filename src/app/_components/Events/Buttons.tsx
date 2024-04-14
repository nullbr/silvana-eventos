import { api } from "~/trpc/react";
import { Button } from "../Shared/Button";
import type { FullEvent } from "./Form";
import { useRouter } from "next/navigation";

export function Buttons({
  event,
  isLoading,
}: {
  event: FullEvent | undefined;
  isLoading: boolean;
}) {
  const router = useRouter();
  const { mutate: removeEvent, isLoading: isRemoving } =
    api.event.remove.useMutation({
      onSuccess: () => {
        console.log("Evento removido com sucesso!");
        router.push("/admin/eventos");
      },
      onError: (err) => {
        alert(err.message);
      },
    });

  function handleRemove() {
    if (isLoading ?? isRemoving ?? !event) return;

    removeEvent(event.id);
  }

  return (
    <div className="flex gap-2">
      <Button
        name="Salvar"
        style="green"
        loading={isLoading}
        type="submit"
        disabled={isLoading ?? isRemoving}
      />
      <Button
        name="Remover"
        style="red"
        onAction={handleRemove}
        disabled={isLoading ?? isRemoving}
      />
      {event && (
        <Button
          name="Imagens"
          href={`/admin/eventos/${event?.id}/imagens`}
          disabled={isLoading ?? isRemoving}
        />
      )}
      <Button name="Voltar" href="/admin/eventos" style="light" />
    </div>
  );
}
