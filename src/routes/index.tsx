import type { LoaderFunction } from "remix"
import { redirect } from "remix"

import { routes } from "~/config/routes"

export const loader: LoaderFunction = () => {
  return redirect(routes.auth.signIn())
}
