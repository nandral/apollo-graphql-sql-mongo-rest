const { Author, View, FortuneCookie } = require("./connectors");

const resolvers = {
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    allAuthors(_, args) {
      return Author.findAll();
    },
    getFortuneCookie() {
      return FortuneCookie.getOne();
    }
  },

  Author: {
    posts(author) {
      return author.getPosts();
    }
  },

  Post: {
    async author(post) {
      return await post.getAuthor();
    },
    async views(post) {
      const view = await View.findOne({ postId: post.id });
      return view.views;
    }
  },

  Mutation: {
    async createAuthor(_, args) {
      const { id, firstName, lastName } = await Author.create(args);
      return { id, firstName, lastName };
    }
  }
};

module.exports = resolvers;
