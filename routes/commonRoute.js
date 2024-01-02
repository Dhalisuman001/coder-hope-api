import searchRoute from "express";
import searchController from "../controller/common/searchController.js";

// import AuthHandel from "../middleware/auth/AuthHandler.js";

const SearchRoute = searchRoute.Router();

// SearchRoute.route("/create").post(
//   AuthHandel,
//   checkSchema(createBlogScheme),
//   createBlogController
// );

SearchRoute.route("/search").get(searchController);

export default SearchRoute;
