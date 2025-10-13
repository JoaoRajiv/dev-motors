import { HomeProps } from "@/utils/home.type";
import styles from "./styles.module.scss";
import Image from "next/image";

export function Services({ object }: HomeProps) {
  return (
    <>
      <section className={styles.containerAbout} id="servicos">
        <article className={styles.innerAbout}>
          <h1 className={styles.title}>Sobre</h1>
          <p className={styles.description}>
            {object.metadata.about.description}
          </p>
        </article>
        <div className={styles.bannerAbout}>
          <Image
            className={styles.imageAbout}
            alt="Imagem ilustrativa sobre a empresa"
            fill={true}
            sizes={"(max-width: 480px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            src={object.metadata.about.banner.url}
          />
        </div>
      </section>
      <h2 className={styles.servicesTitle}>Conheça nossos serviços</h2>
      <section className={styles.services}>
        {object.metadata.services.map(service => (
          <article key={service.description}>
            <div className={styles.innerService}>
              <Image
                className={styles.imageService}
                alt="Imagem ilustrativa sobre a empresa"
                fill={true}
                sizes={
                  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                }
                src={service.image.url}
              />
            </div>
            <p>{service.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
