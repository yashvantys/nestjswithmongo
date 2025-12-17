## What this project is

- A small NestJS service exposing both REST and GraphQL APIs for a "Restaurant" domain.
- Data is persisted with Mongoose (MongoDB) and the project expects a local Mongo at mongodb://localhost/restaurant by default (see `src/app.module.ts`).

## Key architecture & files (read these first)
- Entry & validation: `src/main.ts` — global `ValidationPipe` with a custom `exceptionFactory` that flattens validation errors. Preserve the shape of returned validation payloads when altering validation logic.
- App wiring: `src/app.module.ts` — registers `RestaurantModule`, `MongooseModule.forRoot(...)`, and `GraphQLModule.forRoot(..., autoSchemaFile: 'src/schema.gql')`.
- Domain: `src/restaurant/` contains controller, resolver, service, DTOs and schema:
  - REST controller: `src/restaurant/restaurant.controller.ts` (routes under `/restaurant`)
  - GraphQL resolver: `src/restaurant/restaurant.resolver.ts` (types & mutations/queries)
  - Business logic: `src/restaurant/restaurant.service.ts` (uses `@InjectModel('Restaurant')`)
  - Schema: `src/restaurant/schema/restaurant.schema.ts` (Mongoose + Nest schema classes)
  - DTOs: `src/restaurant/dtos/rest/*.ts` and `src/restaurant/dtos/graphql/*.ts` — keep REST and GraphQL DTOs separate; GraphQL input types are used by resolvers.

## Developer workflows (commands)
- Install: `npm install`
- Run: `npm run start` (prod), `npm run start:dev` (watch/dev)
- Build: `npm run build` (uses `nest build`)
- Lint/format: `npm run lint`, `npm run format`
- Tests: `npm run test` (unit), `npm run test:e2e` (e2e, see `test/jest-e2e.json`)

When adding features that require GraphQL schema changes, the schema file `src/schema.gql` is generated from the GraphQL decorators; don't hand-edit it — change the TypeScript GraphQL types instead.

## Project-specific patterns & gotchas
- ValidationPipe: Global validation behavior is customized in `src/main.ts`. The project converts validation errors to an array of objects with `targetClass`, `property`, `constraints`. When you edit validation handling, keep compatibility with consumers that may parse that shape.
- Mongoose schemas: Subdocuments (Contact, Address, Location) are decorated with `@Schema({ _id: false })`. Model registration uses the model name string `'Restaurant'` (see `@InjectModel('Restaurant')`). If you change the model name or schema file, update all injectors.
- Error handling: `RestaurantService` throws Nest exceptions (`NotFoundException`, `InternalServerErrorException`) in some flows but also sometimes rethrows plain `Error`. Prefer preserving error type semantics for consumer-facing responses.
- DTO separation: REST DTOs live under `dtos/rest` and GraphQL inputs/types under `dtos/graphql`. When adding a field, mirror it in both places only if both transports should support it.
- Auto schema file: `GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(), 'src/schema.gql') })` — toggling to a remote schema or different generation path requires editing `AppModule`.

## Integration points to check before changes
- MongoDB connection string in `src/app.module.ts` (local by default). CI or dev machines may expect env overrides.
- `src/schema.gql` is generated at runtime — GraphQL playground is enabled in dev by default.
- Tests use Jest config in `package.json` and `test/jest-e2e.json` — review those when editing runtime/test behavior.

## Example tasks — how to implement them (concise)
- Add a new REST endpoint: add route in `restaurant.controller.ts`, add service method in `restaurant.service.ts`, update DTO in `dtos/rest/`, add tests under `test/`.
- Add a GraphQL field/mutation: update GraphQL input/type in `dtos/graphql/`, update resolver in `restaurant.resolver.ts`, update service for implementation, run to regenerate `src/schema.gql`.
- Change validation behavior: modify `ValidationPipe` options or `exceptionFactory` in `src/main.ts`. Keep the flattened error object shape unless you update callers/tests.

## Helpful examples & references inside this repo
- REST create: `POST /restaurant` -> `RestaurantController.createRestaurant` -> `RestaurantService.createRestaurant`.
- GraphQL create: `createRestaurant(input: CreateRestaurantInput)` -> `RestaurantResolver.createRestaurant` -> `RestaurantService.createRestaurant`.
- Model injection: `@InjectModel('Restaurant')` in `RestaurantService` — confirm the model name matches `SchemaFactory.createForClass(Restaurant)`.

## When in doubt — files to inspect
- `src/main.ts`, `src/app.module.ts`, `src/restaurant/restaurant.service.ts`, `src/restaurant/restaurant.controller.ts`, `src/restaurant/restaurant.resolver.ts`, `src/restaurant/schema/restaurant.schema.ts`, `src/restaurant/dtos/**`.

If any section is unclear or you'd like more examples (e.g., sample tests or a step-by-step change for a specific feature), tell me which area and I'll iterate.
