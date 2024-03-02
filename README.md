# Team 8 - Notes-Share App

### Iteration 0: Hello World Set Up

## Instruction

To run the app:

**CLIENT**

1. at the root of the project, cd into client folder by `cd client`
2. run `npm install` to install related dependencies
3. then run `npm run dev`, the client is running on [http://localhost:5173](http://localhost:5173).

**SERVER**

1. at the root of the project, cd into server folder by `cd server`
2. run `npm install` to install related dependencies
3. create an file named `.env` inside server, and put the followng content in the file

   ```
   PORT=8000
   CLIENT_URL = http://localhost:3000
   SERVER_URL = http://localhost:8000

   # set up docker files
   NODE_ENV=development

   # Connect to Supabase via connection pooling with Supavisor.
   DATABASE_URL="postgres://postgres.notes-share-app:OOSEteam-8!!!@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

   # Direct connection to the database. Used for migrations.
   DIRECT_URL="postgres://postgres.wlutceuwzssoambbvczt:OOSEteam-8!!!@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

   ```

4. run `npm run dev`, the server is running on [http://localhost:8000](http://localhost:8000).

**DATABASE**

1. at the root of the project, cd into server folder by `cd server`
2. install prisma `npm install prisma --save-dev`
3. start prisma studio by `npx prisma studio`
4. the data model is up on [http://localhost:5555](http://localhost:5555)
