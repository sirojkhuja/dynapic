import type { HtmlMetaDescriptor } from "remix"

export const buildPageTitle = (title?: string) => [title, "Dynapic"].filter(Boolean).join(" - ")

export const buildPageMeta = ({
  url,
  title,
  description,
  image,
  ...other
}: HtmlMetaDescriptor = {}): HtmlMetaDescriptor => {
  title = title && buildPageTitle(title as string)

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
