import styles from "./styles.module.scss";
import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { getItemBySlug } from "@/utils/actions/get-data";
import { PostProps } from "@/utils/post.type";
import { Phone } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import { title } from "process";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { objects }: PostProps = await getItemBySlug(slug).catch(() => {
      return {
        title: "Devmotors sua oficina especializada",
        description: "Oficina de carros e motos"
      };
    });

    return {
      title: `Devmotors - ${objects[0].title}`,
      description: `${objects[0].metadata.description.text}`,
      keywords: [
        "oficina de carros",
        "oficina de motos",
        "reparos automotivos",
        "manutenção de veículos",
        "serviços automotivos",
        "mecânica de carros"
      ],
      openGraph: {
        title: `Devmotors - ${objects[0].title}`,
        images: [objects[0].metadata.banner.url as string]
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true
        }
      }
    };
  } catch (error) {
    return {
      title: "Devmotors sua oficina especializada",
      description: "Oficina de carros e motos"
    };
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { objects }: PostProps = await getItemBySlug(slug);
  console.log(objects);
  return (
    <div>
      <>
        <Hero
          heading={objects[0].title}
          buttonTitle={objects[0].metadata.button.title}
          buttonUrl={objects[0].metadata.button.url}
          bannerUrl={objects[0].metadata.banner.url}
          icon={<Phone size={24} color="#fff" />}
        />
        <Container>
          <section className={styles.about}>
            <article className={styles.innerAbout}>
              <h1 className={styles.title}>
                {objects[0].metadata.description.title}
              </h1>
              <p>{objects[0].metadata.description.text}</p>
              {objects[0].metadata.description.button_active && (
                <a
                  href={objects[0].metadata.description.button_url as string}
                  target="_blank"
                  className={styles.link}
                >
                  {objects[0].metadata.description.button_title}
                </a>
              )}
            </article>
            <div className={styles.bannerAbout}>
              <Image
                className={styles.imageAbout}
                alt={objects[0].title}
                quality={100}
                fill={true}
                src={objects[0].metadata.description.banner.url as string}
                sizes="(max-width: 480px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </section>
        </Container>
      </>
    </div>
  );
}
