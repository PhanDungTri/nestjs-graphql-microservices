# NestJS - GraphQL - Kafka - Microservices sample

```mermaid
flowchart TD
	clients((Clients))
	gateway(Gateway)
	truck[Truck Service]
	container[Container Service]
	job[Job Service]
	clients ---> gateway ---> truck & container & job
```

## About

This project has three microservices: Truck, Container, and Job. Each service has a database of its own. These services are used by clients through an API Gateway. Apache Kafka is the way that the services talk to each other.

- Truck Service: does things related to trucks, like registering a new truck or looking up information about a truck by its license plate number.
- Container Service: is the same as Truck Service, but they only do tasks that have to do with containers.
- Job Service: takes care of the gate-out process, which is when the truck comes into the yard and picks up one or two containers to move out of the yard. This service will talk to two other services in order to check information about the container and truck.

As this project is using **Apollo Federation**, it follows the **Separation of Concerns** principle, which means that each service has its own GraphQL schema. If a schema of one service needs one or more connections to schemas of other services, those connections must be defined in that schema, not in the other services. The schema of a service should only have the types and fields that are needed. Then, the subgraphs will be put together in the gateway to make a supergraph.

## Run the project

Install required packages.

```bash
yarn
```

This project needs a Kafka server and three instances of Postgres database. You can setup by yourself, or using the `docker-compose.yml` file to build and start those containers. You can open the file and config at your discretion.

```bash
docker-compose up -d
```

Populate the `.env` file with proper values. Example:

```env
GATEWAY_PORT=3000

TRUCK_DATABASE_URL=postgresql://gate:gate@localhost:5432/truck?schema=public
TRUCK_PORT=3001
TRUCK_SERVICE_URL=http://localhost:${TRUCK_PORT}/graphql

CONTAINER_DATABASE_URL=postgresql://gate:gate@localhost:5433/container?schema=public
CONTAINER_PORT=3002
CONTAINER_SERVICE_URL=http://localhost:${CONTAINER_PORT}/graphql

JOB_DATABASE_URL=postgresql://gate:gate@localhost:5434/job?schema=public
JOB_PORT=3003
JOB_SERVICE_URL=http://localhost:${JOB_PORT}/graphql

KAFKA_BROKER_URL=localhost:9092
```

This project using Prisma to work with the databases. Run the migration to setup databases and generate the client for each database.

```bash
npx prisma migrate dev --schema ./prisma/truck/schema.prisma
```

```bash
npx prisma migrate dev --schema ./prisma/container/schema.prisma
```

```bash
npx prisma migrate dev --schema ./prisma/job/schema.prisma
```

Start services and the gateway. The gateway must be the last.

```bash
nest start truck
```

```bash
nest start container
```

```bash
nest start job
```

```bash
# Only run when all the above services are sucessfully started
nest start gateway
```
