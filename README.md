# Smart Meter App

This will be an app that lets you view your energy smart meter data (current and historic) on an app.
It will upsell the [Hildebrande smart meter](https://shop.glowmarkt.com/products/display-and-cad-combined-for-smart-meter-customers) to give you more up-to-date info (5 secondly rather than half hourly).
It will talk to the [the glowmarkt api](https://docs.glowmarkt.com/GlowmarktAPIDataRetrievalDocumentationIndividualUserForBright.pdf) directly so we don't handle any user data.

## Project Structure
Everything's in TypeScript, this is a yarn berry monorepo, stuff is located in [packages](./packages).

* [glowmarkt-api](./packages/glowmarkt-api) is a typed client library for [the glowmarkt api](https://docs.glowmarkt.com/GlowmarktAPIDataRetrievalDocumentationIndividualUserForBright.pdf) that gives access to the smart meter data. This is intended to be published to npm at some point.
* [smartmeter-graphql-schema](./packages/smartmeter-graphql-schema) is a graphql schema which uses the above api client library 
* [smartmeter-app](./packages/smartmeter-app) is an expo app, it uses apollo client because it has a nice developer experience. However, instead of talking to a graphql server it pulls in the above graphql schema and executes queries and mutations against it, so talks directly to the glowmarkt api.
* [smartmeter-graphql-server](./packages/smartmeter-graphql-server) is a graphql server which uses the above graphql schema, this is just for local dev to make it easier to debug the graphql schema, and not intended for production (we don't want to touch any user data)

## Todo
- [x] Set up the base project
- [ ] Wireframe the app
- [ ] Ensure all required data is accessible via the client library and schema
- [ ] Login / View Profile / Logout flow
- [ ] View live data flow
- [ ] View historical data
- [ ] Signup flow
- [ ] Associate IHD with app flow
- [ ] Hildebrande smart meter upsell flow

## Stretch goal/Maybes
- [ ] Native widgets for android/iOS (would require ejection from expo 😭)

