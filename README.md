# ExpressJs Restful API Template

This API template is built using **Domain-Driven Design (DDD)** with OOP architecture, a structure often used in real production projects.  
It helps keep the codebase clean, organized, and easier to maintain as the project grows.

### Highlights
- **Production-ready structure** – follows best practices used in real-world systems.
- **Domain separation** – each feature is organized by its own domain.
- **Scalable & maintainable** – easy to extend and adapt over time.

This template is a good starting point if you want to build APIs with a solid and reliable structure.

---

### Tech stack
- Bun
- NodeJs 22
- ExpressJs
- Mysql
- Sequelize (can be change to knex for better performance)

---

### Migration

For table migration, run this command to generate the sql up scripts:
```
bun run migrate:schema:create <migration_name> --sql-file
```
and run `bun run migrate:schema:up` for migrate the scripts to database.

---

For further improvement, can using auto-profiller, import aliases, etc.

# Postgres (ubuntu) or you can use docker
---
postgresql
---
sudo apt update
sudo apt install postgresql postgresql-contrib
---
sudo -i -u postgres psql
---

create user
---
CREATE USER landing_page_user WITH PASSWORD 'password';
---

grant all privileges on database landing_page_db to landing_page_user;
---


login to postgres
---
sudo -i -u postgres psql
---

create database
---
CREATE DATABASE landing_page_db;
---

drop database
---
DROP DATABASE landing_page_db;
---

# Redis (ubuntu) or you can use docker
---
Redis Server
---

Install Redis
---
sudo apt update
sudo apt install redis-server
---

start redis
---
sudo service redis-server start
---

stop redis
---
sudo service redis-server stop
---
