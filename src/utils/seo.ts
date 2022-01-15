import type { HtmlMetaDescriptor } from "remix"

export const buildPageMeta = ({
  url,
  title,
  description,
  image,
  ...other
}: HtmlMetaDescriptor = {}): HtmlMetaDescriptor => {
  title = [title, "Dynapic"].filter(Boolean).join(" - ")

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    "og:type": "website",
    ...(url ? { "og:url": url } : {}),
    ...(title ? { "og:title": title } : {}),
    ...(description ? { "og:description": description } : {}),
    ...(image ? { "og:image": image } : {}),
    "twitter:card": "summary_large_image",
    ...(url ? { "twitter:url": url } : {}),
    ...(title ? { "twitter:title": title } : {}),
    ...(description ? { "twitter:description": description } : {}),
    ...(image ? { "twitter:image": image } : {}),
    ...other,
  }
}
