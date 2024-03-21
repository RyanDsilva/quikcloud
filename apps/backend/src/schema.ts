import { makeExecutableSchema } from "@graphql-tools/schema";
import { YogaInitialContext } from "graphql-yoga";

export const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
      cookie(name: String): String
    }
    type Mutation {
      setCookie(name: String, value: String): String
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world",
      async cookie(root, args, ctx: YogaInitialContext) {
        const cookie = await ctx.request.cookieStore?.get(args.name);
        return cookie?.value;
      },
    },
    Mutation: {
      async setCookie(root, args, ctx: YogaInitialContext) {
        const token = "";
        ctx.request.cookieStore?.set({
          name: "Authorization",
          sameSite: "strict",
          secure: true,
          domain: "http://localhost:4000",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          value: token,
          httpOnly: true,
        });
        return token;
      },
    },
  },
});