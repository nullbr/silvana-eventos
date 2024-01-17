import Image from "../_components/Shared/Image";
import CustomLink from "../_components/Shared/Link";

export default function Admin() {
  const image = "/api/imagens/IMG_1348.jpeg";

  return (
    <div>
      <CustomLink href="/admin/eventos">eventos</CustomLink>
      <CustomLink href="/admin/tags">tags</CustomLink>
      <Image src={image} alt="event" width="200" height="200" />
    </div>
  );
}
