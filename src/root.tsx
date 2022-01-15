import { Button, Center, Container, Global, MantineProvider, Text, Title } from "@mantine/core"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useNavigate,
} from "remix"
import type { MetaFunction } from "remix"

import { buildPageMeta } from "./utils/seo"

import { theme } from "~/config/theme"

export const meta: MetaFunction = ({ location: { pathname } }) => {
  const buildUrl = (path: string) => "https://www.dynapic.co".concat(path)

  return buildPageMeta({
    url: buildUrl(pathname),
    description:
      "Dynapic is a tool for generating images with dynamic content. You can use it to generate headers or profile pictures for your Social Media profiles, Open Graph images for each one of your blog posts, or any other picture with dybamic data to embed wherever you want.",
    image: buildUrl("/images/og.jpg"),
  })
}

const App: React.FC = () => {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

const Document: React.FC = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link crossOrigin="anonymous" rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
          <Global
            styles={(theme) => ({
              body: {
                backgroundColor: theme.colors[theme.primaryColor][0],
              },
            })}
          />
          {children}
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}

export const CatchBoundary: React.FC = () => {
  const caught = useCatch()

  let title: string
  let message: string

  if (caught.status === 401) {
    title = "Unauthorized"
    message = "Oops! Looks like you tried to visit a page that you do not have access to."
  } else if (caught.status === 4041) {
    title = "Not Found"
    message = "Oops! Looks like you tried to visit a page that does not exist."
  } else {
    throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document>
      <ErrorMessage title={title} message={message} />
    </Document>
  )
}

export const ErrorBoundary: React.FC<{ error: Error }> = ({ error }) => {
  console.error(error)

  return (
    <Document>
      <ErrorMessage
        title="Error"
        message="Oops! An unexpected error occurred, we were already informed about this and we will work on it to make sure it doesn't happen again!"
      />
    </Document>
  )
}

const ErrorMessage: React.FC<{ title: string; message: string }> = ({ title, message }) => {
  const navigate = useNavigate()

  const containerVariants: Variants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.25 } },
  }

  const slideVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  }

  const appearVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  }

  return (
    <Container size="xs">
      <Center
        sx={{ flexDirection: "column", height: "100vh" }}
        component={motion.div}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* @ts-ignore */}
        <Title order={1} align="center" component={motion.h1} variants={slideVariants}>
          {title}
        </Title>
        <Text align="center" color="gray" size="lg" component={motion.p} variants={slideVariants}>
          {message}
        </Text>
        <Button
          size="md"
          leftIcon={<ArrowLeftIcon />}
          sx={(theme) => ({ margin: `${theme.spacing.xl}px auto 0 auto` })}
          onClick={() => navigate(-1)}
          component={motion.button}
          variants={appearVariants}
        >
          Back
        </Button>
      </Center>
    </Container>
  )
}

export default App
