import { Button } from "../_components/Shared/Button";
import Image from "../_components/Shared/Image";
import { PageTitle } from "../_components/Shared/PageTitle";

export default function Admin() {
  const image = "/api/imagens/IMG_1348.jpeg";

  return (
    <div>
      <PageTitle title="Painel de Administração" />

      <nav className="flex flex-col gap-4 sm:flex-row">
        <Button href="/admin/eventos" name="Eventos" />
        <Button href="/admin/tags" name="Tags" style="green" />
      </nav>
    </div>
  );
}
