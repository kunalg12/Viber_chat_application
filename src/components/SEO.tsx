import Head from "next/head";

/**
 * SEO Header
 * @param title SEO Title
 * @component
 */
export default function Seo({ title = "Vibber" }: { title?: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Vibber" />
    </Head>
  );
}
