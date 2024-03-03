import { siteMetadata } from "~/server/siteMetadata";
import Image from "../_components/Shared/Image";
import SocialIcon from "../_components/SocialIcons";

export default function About() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Sobre
        </h1>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center space-x-2 pt-8">
          <Image
            placeholder="blur"
            src="/images/about.png"
            alt="avatar"
            width={192}
            height={192}
            className="h-48 w-48 rounded-full"
          />
          <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
            Silvana Moraes
          </h3>
          <div className="text-gray-500 dark:text-gray-400">
            Fotografia profissional
          </div>
          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
            <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
            <SocialIcon
              kind="instagram"
              href={siteMetadata.instagram}
              size={6}
            />
          </div>
        </div>
        <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
          <p>
            Bem-vindo à Silvana Eventos, onde transformamos seus momentos
            especiais em lembranças eternas. Somos uma equipe de fotógrafos
            profissionais dedicados a capturar a essência única de cada evento.
          </p>
          <p>
            Na Silvana Eventos, acreditamos que cada momento merece ser
            celebrado e eternizado. Seja um casamento, aniversário, batizado ou
            qualquer ocasião especial, nossa equipe utiliza técnicas avançadas e
            equipamentos de alta qualidade para criar imagens que contam
            histórias e transmitem emoções autênticas.
          </p>
          <p>
            Comprometidos com a satisfação do cliente, trabalhamos de perto para
            entender suas expectativas e garantir que cada foto seja uma
            representação fiel do seu evento. Nosso objetivo é superar suas
            expectativas e entregar um álbum de fotos que seja verdadeiramente
            memorável.
          </p>
          <p>
            Explore nosso portfólio e descubra como a Silvana Eventos pode
            transformar seus momentos comuns em lembranças extraordinárias.
            Estamos prontos para ser parte do seu próximo evento e capturar
            memórias que durarão uma vida inteira. Escolha a excelência, escolha
            Silvana Eventos.
          </p>
        </div>
      </div>
    </div>
  );
}
