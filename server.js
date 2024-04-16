const db = require("../server/fakeData")
const typeDefs = require("../server/typeDefs")
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const express = require("express")
const app = express()
const {ApolloServer} = require("apollo-server-express");
const { subscribe } = require("graphql");
app.use(cors())

const { PubSub } = require('graphql-subscriptions');


const NEW_USER = "NEW_USER"

// const apolloServer = {
//     typeDefs,
//     resolvers,
// }

const resolvers = {
    // Subscription:{
    //     newUser:{
    //         subscribe:(_, __,{pubsub}) => pubsub.asyncIterator(NEW_USER)
    //     } 
    // }
    
    
    Query:{
     UserList(parent,args){
        console.log(parent)
        // return db.UserList.find((moviesId)=>moviesId.id === parent.id)
        return db.UserList
     },   
     MovieList(){
        return db.MovieList
     },

     user(parent,args,context,info){
        const convertDataType = parseInt(args.id)
        return db.UserList.find((user)=>user.id === convertDataType)
        // const user = _.find(UserList,{id})
     },
     movie(parent,args){
        return db.MovieList.find((movie)=>movie.name === args.name)
     }
    },
    Subscription:{
        createUser:{
            subscribe:(_,{channelId})=>{
                return PubSub.asyncIterator(`messageAdded_${channelId}`);
            }
        }
    }
    // Subscription:{
    //     createUser:{
    //         subscribe:(_,{channelId})=>{
    //             return PubSub.asyncIterator("")
    //         }
    //     }
    // }
    ,
    Mutation:{
        createUser(parent,args,{channelId}){
            const pushedVal = db.UserList.push(args.user);
            pubsub.publish(`messageAdded_${channelId}`, { createUser: pushedVal });
            console.log(args.user)
            return args.user;
        },
        updateUsername(parent,agrs){

            const {id,newUsername} = args.updateUsername
            const convertDataType = parseInt(id)
 
            let showUpdatedUserName;
            db.UserList.forEach((val)=>{
                if(val.id === convertDataType){
                    val.username = newUsername
                    showUpdatedUserName = val 
                }
            })
            return showUpdatedUserName
        },
        deleteUser(parent,args){
            const convertDataType = parseInt(args.id)
            return db.UserList = db.UserList.filter((val)=>{
                return val.id !== convertDataType
            })
        }
    },
    
    UserList:{
        favoriteMovies:(parent,args,context,info)=>{
            console.log(info)
            console.log(context)
           return db.MovieList.filter((movie)=>{
                return movie.yearOfPublication >=2000 && movie.yearOfPublication <= 2010
            })
        }
    }


}
const pubsub = new PubSub()

//fragments

// const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:{pubsub}
    // context:()=>{
    //     return{name:"Pursharth"}
    // }
    // context:{
    //     PubSub,
    // }
    // context:({req,res})=>({req,res,pubsub})
})

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({app});
}

startApolloServer()

app.listen({port:3001},()=>{
    console.log(`3001 is running`)
})