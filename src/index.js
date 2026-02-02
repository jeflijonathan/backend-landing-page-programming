const express = require("express");
const path = require("path");
const PostgresDatabase = require("./config/databases/postgres");
require("./config/cache/redis");
const Router = require("./config/router/router");

// Models
const defineUserModel = require("./domains/users/user.model");
const definePostModel = require("./domains/users/post.model");
const defineAuthModel = require("./domains/auth/auth.model");
const defineDivisionModel = require("./domains/division/division.model");
const defineRoleModel = require("./domains/role/role.model");
const defineRoleUserModel = require("./domains/role/roleUser.model");
const defineUploadFileModel = require("./domains/uploadFile/uploadFile.model");
const defineGalleryModel = require("./domains/gallery/gallery.model");
const defineGalleryMediaModel = require("./domains/gallery/galleryMedia.model");
const defineInformationModel = require("./domains/information/information.model");

// Repositories
const AuthRepository = require("./domains/auth/auth.repository");
const UserRepository = require("./domains/users/user.repository");
const DivisionRepository = require("./domains/division/division.repository");
const RoleRepository = require("./domains/role/role.repository");
const UploadFileRepository = require("./domains/uploadFile/uploadFile.repository");
const GalleryRepository = require("./domains/gallery/gallery.repository");
const InformationRepository = require("./domains/information/information.repository");

// Services
const AuthService = require("./domains/auth/auth.service");
const UserService = require("./domains/users/user.service");
const DivisionService = require("./domains/division/division.service");
const RoleService = require("./domains/role/role.service");
const UploadFileService = require("./domains/uploadFile/uploadFile.service");
const GalleryService = require("./domains/gallery/gallery.service");
const InformationService = require("./domains/information/information.service");

// Controllers
const AuthController = require("./domains/auth/auth.controller");
const UserController = require("./domains/users/user.controller");
const DivisionController = require("./domains/division/division.controller");
const RoleController = require("./domains/role/role.controller");
const UploadFileController = require("./domains/uploadFile/uploadFile.controller");
const GalleryController = require("./domains/gallery/gallery.controller");
const InformationController = require("./domains/information/information.controller");

const db = new PostgresDatabase();
const sequelize = db.getDbInstance();

// Initialize Models
const User = defineUserModel(sequelize);
const Post = definePostModel(sequelize);
const Auth = defineAuthModel(sequelize);
const Division = defineDivisionModel(sequelize);
const Role = defineRoleModel(sequelize);
const RoleUser = defineRoleUserModel(sequelize);
const UploadFile = defineUploadFileModel(sequelize);
const Gallery = defineGalleryModel(sequelize);
const GalleryMedia = defineGalleryMediaModel(sequelize);
const Information = defineInformationModel(sequelize);

// Associate Models
const models = { User, Post, Auth, Division, Role, RoleUser, UploadFile, Gallery, GalleryMedia, Information };
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

const server = new Router();

// Serve static uploads - DISABLED for security (files now served via protected API)
// server.app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Initialize Logic
const authRepo = new AuthRepository(Auth);
const userRepo = new UserRepository(User);
const divisionRepo = new DivisionRepository(Division);
const roleRepo = new RoleRepository(Role);
const uploadFileRepo = new UploadFileRepository(UploadFile);
const galleryRepo = new GalleryRepository(Gallery);
const informationRepo = new InformationRepository(Information);

const authService = new AuthService(userRepo, authRepo);
const userService = new UserService(userRepo, Post); // Pass Post model for transaction/creation
const divisionService = new DivisionService(divisionRepo);
const roleService = new RoleService(roleRepo);
const uploadFileService = new UploadFileService(uploadFileRepo);
const galleryService = new GalleryService(galleryRepo, GalleryMedia);
const informationService = new InformationService(informationRepo);

const authController = new AuthController(authService);
const userController = new UserController(userService);
const divisionController = new DivisionController(divisionService);
const roleController = new RoleController(roleService);
const uploadFileController = new UploadFileController(uploadFileService);
const galleryController = new GalleryController(galleryService);
const informationController = new InformationController(informationService);

// Mount Routes
server.app.use("/api", require("./middleware/rateLimit.middleware")); // Global Rate Limiter (5 req/min)
server.app.use("/api", authController.getRouter());
server.app.use("/api", userController.getRouter());
server.app.use("/api", divisionController.getRouter());
server.app.use("/api", roleController.getRouter());
server.app.use("/api", uploadFileController.getRouter());
server.app.use("/api", galleryController.getRouter());
server.app.use("/api", informationController.getRouter());

// Setup error handlers (must be after all routes)
server.setupErrorHandler();

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced");

    server.listen();
  } catch (err) {
    console.error("❌ Sync error:", err);
  }
})();

