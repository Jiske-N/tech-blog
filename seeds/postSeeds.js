const { BlogPost } = require("../models");

const postData = [
    {
        title: "Why MVC is so important",
        content:
            "MVC allows developers to maintain a true seperation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for the application logic.",
        user_id: 1,
    },
    {
        title: "Authentification vs. Authorization",
        content:
            "The is a difference between authentication and authorization. Authentification means confirming your own identity, whereas authorization means being allowed access to the system.",
        user_id: 1,
    },
    {
        title: "Object-Relational Mapping",
        content:
            "I have really loved learning about ORMs. It has really simplified the way I create queries in SQL!",
        user_id: 2,
    },
];

const seedPosts = async () => {
    console.log("seedPosts function started");
    await BlogPost.bulkCreate(postData);
};

module.exports = seedPosts;
