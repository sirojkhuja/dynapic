import { Box, Container, Text, Title, UnstyledButton } from "@mantine/core"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"

import { Logo } from "./logo"

import { routes } from "~/config/routes"

export const SimpleLayout: React.FC<{
  illustration: React.ReactNode
  title: string
  subtitle?: string
  footer?: React.ReactNode
}> = ({ illustration, title, subtitle, children, footer }) => {
  const containerVariants: Variants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.25 } },
  }

  const logoVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  }

  const illustrationVariants: Variants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
  }

  const contentVariants: Variants = {
    initial: { opacity: 0, y: "10%" },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <Container
      // @ts-ignore
      component={motion.div}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      size="xl"
      sx={(theme) => ({
        display: "grid",
        gap: theme.spacing.xl * 2,
        gridTemplate: '"logo" 100px "content" 1fr "illustration" auto "spacer" 10px',
        minHeight: "100%",
        [theme.fn.largerThan("md")]: {
          gridTemplate:
            '"logo logo" 100px "illustration content" 1fr "spacer spacer" 100px / 1fr 1fr',
        },
      })}
    >
      <Box
        component={motion.div}
        variants={logoVariants}
        sx={{
          alignItems: "center",
          display: "flex",
          gridArea: "logo",
        }}
      >
        <UnstyledButton
          // @ts-ignore
          component="a"
          href={routes.home()}
          aria-label="Go to Home Page"
          sx={{ fontSize: 0 }}
        >
          <Logo />
        </UnstyledButton>
      </Box>
      <Box
        component={motion.div}
        variants={illustrationVariants}
        sx={{
          "gridArea": "illustration",
          "alignItems": "center",
          "display": "flex",
          "justifyContent": "center",
          "position": "relative",
          "& > svg": {
            width: "100%",
          },
        }}
      >
        {illustration}
      </Box>
      <Box sx={{ alignItems: "center", display: "flex", gridArea: "content" }}>
        <Container
          // @ts-ignore
          component={motion.div}
          variants={containerVariants}
          size={400}
          padding={0}
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: theme.spacing.xl * 2,
            width: "100%",
          })}
        >
          <Box
            component={motion.div}
            variants={contentVariants}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Title order={1}>{title}</Title>
            {subtitle ? <Text color="grey">{subtitle}</Text> : null}
          </Box>
          {children ? (
            <Box component={motion.div} variants={contentVariants}>
              {children}
            </Box>
          ) : null}
          {footer ? (
            <Box component={motion.div} variants={contentVariants}>
              {footer}
            </Box>
          ) : null}
        </Container>
      </Box>
    </Container>
  )
}
