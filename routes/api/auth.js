const express = require("express");
const ctrl = require("../../controllers/auth");

const {
  validateBody,
  authenticate,
  upload,
  resize,
} = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/signup",
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/users/current", authenticate, ctrl.getCurrent);
router.get("/users/logout", authenticate, ctrl.logout);
router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  resize,
  ctrl.updateAvatar
);

module.exports = router;
