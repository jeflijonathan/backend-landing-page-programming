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