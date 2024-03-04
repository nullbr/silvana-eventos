import { siteMetadata } from "~/server/siteMetadata";
import RecentEvents from "./_components/Events/RecentEvents";
import Image from "./_components/Shared/Image";

export default async function Home() {
  return (
    <>
      <section>
        <div className="flex w-full flex-col justify-center py-12 text-center md:flex-row md:py-20">
          <div>
            {/* hero section */}
            <div className="animate-fade-in flex h-full flex-col justify-center gap-10 px-10 text-center text-gray-400">
              <Image
                placeholder="blur"
                blurDataURL="/images/hero.jpeg"
                src="/images/hero.jpeg"
                height={400}
                width={400}
                alt="silvana eventos"
                className="mx-auto h-auto w-auto max-w-[80%] md:max-w-full"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Eventos Recentes
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <RecentEvents />
      </div>
    </>
  );
}
