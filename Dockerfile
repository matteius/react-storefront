FROM docker.io/node:16
WORKDIR /app
RUN npm install -g pnpm@6.32.11
COPY . .
RUN pnpm i

ARG NEXT_PUBLIC_API_URI
ARG NEXT_PUBLIC_DEFAULT_CHANNEL
ARG NEXT_PUBLIC_VERCEL_URL

ENV NEXT_PUBLIC_API_URI ${NEXT_PUBLIC_API_URI:-https://api.mattscoinage.com/graphql/}
ENV NEXT_PUBLIC_DEFAULT_CHANNEL ${NEXT_PUBLIC_DEFAULT_CHANNEL:-default-channel}
ENV SENTRY_AUTH_TOKEN: ${SENTRY_AUTH_TOKEN}
# export failed with this:
# Error: i18n support is not compatible with next export. See here for more info on deploying: https://nextjs.org/docs/deployment
# RUN pnpm run export

# This is to prevent this error:
#   http://mynewreactstorefront.example.com/_next/image?url=http%3A%2F%2Fmysaleorapi.example.com%2Fmedia%2Fproducts%2Fsaleordemoproduct_cl_boot07_1.png&w=828&q=75
#   400 Bad Request
#   data:text/plain,"url" parameter is not allowed
# which seems to come from this Next.js source file:
#  https://github.com/vercel/next.js/blob/canary/packages/next/server/image-optimizer.ts
#if (!domains.includes(hrefParsed.hostname)) {
#  res.statusCode = 400
#  res.end('"url" parameter is not allowed')
#  return { finished: true }
#}
# RUN sed -i 's/"img.youtube.com"/"img.youtube.com", "mysaleorapi.example.com"/g' next.config.js

# Then as an alternative to the failed "pnpm run export" attempt, we will directly
# run the Node application in production mode, exposing its default port 3000.
# see https://nextjs.org/docs/api-reference/cli#production
# see https://github.com/saleor/react-storefront/issues/84#issuecomment-966874104
expose 3010
RUN pnpm run build
CMD PORT=3010 pnpm run start
