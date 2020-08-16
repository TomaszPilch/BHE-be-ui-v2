FROM tomaszdevx/uni-base-image:v1.0.1 AS stage0

WORKDIR /workspace

COPY ./ ./

RUN yarn install && yarn build && rm -rf node_modules && yarn install --production=true && yarn cache clean && apk del native-deps

FROM node:14-alpine

WORKDIR /workspace

COPY --from=stage0 ./workspace .

EXPOSE 3000
CMD ["yarn", "start"]
