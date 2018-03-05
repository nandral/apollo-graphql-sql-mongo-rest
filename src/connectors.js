const Sequelize = require("sequelize");
const casual = require("casual");
const _ = require("lodash");
const Mongoose = require("mongoose");
const fetch = require("node-fetch");

const MLAB_URL = "mongodb://gql:gql@ds211588.mlab.com:11588/gql";

const db = new Sequelize("blog", null, null, {
  dialect: "sqlite",
  storage: "./blog.sqlite"
});

const AuthorModel = db.define("author", {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING }
});

const PostModel = db.define("post", {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING }
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect(MLAB_URL, {
  useMongoClient: true
});

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number
});

const Author = db.models.author;
const Post = db.models.post;
const View = Mongoose.model("views", ViewSchema);

casual.seed(123);

db.sync({ force: true }).then(() => {
  _.times(1, async () => {
    const author = await AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name
    });

    const post = await author.createPost({
      title: `A post by ${author.firstName}`,
      text: casual.sentences(3)
    });

    await View.update(
      { postId: post.id },
      { views: casual.integer(0, 100) },
      { upsert: true }
    );

    return author;
  });
});

const FortuneCookie = {
  async getOne() {
    let res = await fetch("http://fortunecookieapi.herokuapp.com/v1/cookie");
    res = await res.json();
    // console.log("======== ***********  ======");
    // console.log(res[0].fortune.message);
    // console.log("======== ***********  ======");
    return res[0].fortune.message;
  }
};

module.exports = { Author, Post, View, FortuneCookie };
