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
const defineStatusPresensiSessionModel = require("./domains/presensi/statusPresensiSession.model");
const defineStatusPresensiModel = require("./domains/presensi/statusPresensi.model");
const definePresensiSessionModel = require("./domains/presensi/presensiSession.model");
const definePresensiModel = require("./domains/presensi/presensi.model");

// Repositories
const AuthRepository = require("./domains/auth/auth.repository");
const UserRepository = require("./domains/users/user.repository");
const DivisionRepository = require("./domains/division/division.repository");
const RoleRepository = require("./domains/role/role.repository");
const UploadFileRepository = require("./domains/uploadFile/uploadFile.repository");
const GalleryRepository = require("./domains/gallery/gallery.repository");
const InformationRepository = require("./domains/information/information.repository");
const PresensiRepository = require("./domains/presensi/presensi.repository");

// Services
const AuthService = require("./domains/auth/auth.service");
const UserService = require("./domains/users/user.service");
const DivisionService = require("./domains/division/division.service");
const RoleService = require("./domains/role/role.service");
const UploadFileService = require("./domains/uploadFile/uploadFile.service");
const GalleryService = require("./domains/gallery/gallery.service");
const InformationService = require("./domains/information/information.service");
const PresensiService = require("./domains/presensi/presensi.service");

// Controllers
const AuthController = require("./domains/auth/auth.controller");
const UserController = require("./domains/users/user.controller");
const DivisionController = require("./domains/division/division.controller");
const RoleController = require("./domains/role/role.controller");
const UploadFileController = require("./domains/uploadFile/uploadFile.controller");
const GalleryController = require("./domains/gallery/gallery.controller");
const InformationController = require("./domains/information/information.controller");
const PresensiController = require("./domains/presensi/presensi.controller");

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
const StatusPresensiSession = defineStatusPresensiSessionModel(sequelize);
const StatusPresensi = defineStatusPresensiModel(sequelize);
const PresensiSession = definePresensiSessionModel(sequelize);
const Presensi = definePresensiModel(sequelize);

// Associate Models
const models = { User, Post, Auth, Division, Role, RoleUser, UploadFile, Gallery, GalleryMedia, Information, StatusPresensiSession, StatusPresensi, PresensiSession, Presensi };
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
const presensiRepo = new PresensiRepository(Presensi, PresensiSession, StatusPresensi);

const authService = new AuthService(userRepo, authRepo);
const userService = new UserService(userRepo, Post); // Pass Post model for transaction/creation
const divisionService = new DivisionService(divisionRepo);
const roleService = new RoleService(roleRepo);
const uploadFileService = new UploadFileService(uploadFileRepo);
const galleryService = new GalleryService(galleryRepo, GalleryMedia);
const informationService = new InformationService(informationRepo);
const presensiService = new PresensiService(presensiRepo, Post, RoleUser);

const authController = new AuthController(authService);
const userController = new UserController(userService);
const divisionController = new DivisionController(divisionService);
const roleController = new RoleController(roleService);
const uploadFileController = new UploadFileController(uploadFileService);
const galleryController = new GalleryController(galleryService);
const informationController = new InformationController(informationService);
const presensiController = new PresensiController(presensiService);

// Mount Routes
server.app.use("/api", require("./middleware/rateLimit.middleware")); // Global Rate Limiter (5 req/min)
server.app.use("/api", authController.getRouter());
server.app.use("/api", userController.getRouter());
server.app.use("/api", divisionController.getRouter());
server.app.use("/api", roleController.getRouter());
server.app.use("/api", uploadFileController.getRouter());
server.app.use("/api", galleryController.getRouter());
server.app.use("/api", informationController.getRouter());
server.app.use("/api", presensiController.getRouter());

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

