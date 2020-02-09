/* eslint-disable prettier/prettier */
require('dotenv').config();

const graphql           = require('graphql');
const pgp               = require('pg-promise');
// const { 
//     User, 
//     Application, 
//     Contact 
// }                       = require('../models')
// const config            = require('../config')[process.env.NODE_ENV || 'development'];
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
}                       = graphql;
const db                = { conn: pgp() };


// contact
const ContactType = new GraphQLObjectType({
    name: 'Contact',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLInt }
    })
});
// applications
const ApplicationsType = new GraphQLObjectType({
    name: 'Application',
    fields: () => ({
        id: { type: GraphQLString },
        companyName: { type: GraphQLString },
        title: { type: GraphQLString },
        dateApplied: { type: GraphQLString },
        link: { type: GraphQLString },
        description: { type: GraphQLString },
        notes: { type: GraphQLString },
        status: { type: GraphQLString },
        notification: { type: GraphQLString },
        ContactId: { type: GraphQLString },
        UserId: { type: GraphQLString },
        contact: {
            type: ContactType,
            resolve(parent) {
                const query = `SELECT * FROM "public"."Contacts" WHERE id=${parent.ContactId}`;
                return db.conn.one(query); //! .one() not a function
            }
        }
    })
});
// user
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLInt },
        applications: {
            type: new GraphQLList(ApplicationsType),
            resolve(parent) {
                const applicationQuery = `SELECT * FROM "public"."Applications" WHERE "UserId"=${parent.id}`;
                return db.conn.many(applicationQuery);
            }
        }
    })
});



//! exported
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { UserName: { type: GraphQLString } },
            resolve(parent, args) {
                const query = `SELECT * FROM "public"."Users" WHERE "firstName"='${args.UserName}'`;
                return db.conn.one(query);
            }
        },
        allUsers: {
            type: new GraphQLList(UserType),
            resolve() {
                const query = `SELECT * FROM "public"."Users"`;
                return db.conn.many(query);
            }
        },
        conatact: {
            type: ContactType,
            args: { ContactId: { type: GraphQLID } },
            resolve(parent, args) {
                const query = `SELECT * FROM "public"."Contacts" WHERE id=${args.ContactId}`;
                return db.conn.one(query);
            }
        },
        allContacts: {
            type: new GraphQLList(ContactType),
            resolve() {
                const query = `SELECT * FROM "public"."Contacts"`;
                return db.conn.many(query);
            }
        },
        application: {
            type: ApplicationsType,
            args: { ApplicationsId: { type: GraphQLID } },
            resolve(parent, args) {
                const query = `SELECT * FROM "public"."Applications" WHERE id=${args.ApplicationsId}`;
                return db.conn.one(query);
            }
        },
        allApplications: {
            type: new GraphQLList(ApplicationsType),
            resolve() {
                const query = `SELECT * FROM "public"."Applications"`;
                return db.conn.many(query);
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const query = `INSERT INTO "public"."Users" ("firstName", "lastName", "password", "email", "phone", "createdAt", "updatedAt") VALUES ('${args.firstName}', '${args.lastName}', '${args.password}', '${args.email}', '${args.phone}', '2018-10-23 01:09:38 +0000', '2018-10-23 01:09:38 +0000')`;
                return db.conn.one(query);
            }
        },
        addApplication: {
            type: ApplicationsType,
            args: {
                companyName: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                dateApplied: { type: new GraphQLNonNull(GraphQLString) },
                link: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                notes: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                notification: { type: new GraphQLNonNull(GraphQLInt) },
                UserId: { type: new GraphQLNonNull(GraphQLString) },
                ContactId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parents, args) {
                const query = `INSERT INTO "public"."Applications" ("companyName", "title", "dateApplied", "link", "description", "notes", "status", "notification", "UserId", "ContactId") VALUES ('${args.companyName}', '${args.title}', '${args.dateApplied}', '${args.link}', '${args.description}', '${args.notes}', '${args.status}', '${args.notification}', '${args.UserId}', '${args.ContactId}')`;
                return db.conn.one(query);
            }
        },
        addContact: {
            type: ContactType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                // eslint-disable-next-line no-unused-vars
                const query = `INSERT INTO "public"."Contacts" ("firstName", "lastName", "email", "phone", "createdAt", "updatedAt") VALUES (${args.firstName}, ${args.lastName}, ${args.email}, ${args.phone}, '2013-07-13 14:35:00 +0000', '2013-07-13 14:35:00 +0000')`;
                // eslint-disable-next-line no-undef
                return newContact.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
