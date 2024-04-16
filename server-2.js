const db = require("../server/fakeData")
const {ApolloServer} = require("apollo-server")
const typeDefs = require("../server/typeDefs")
const { v4: uuidv4 } = require('uuid');

const resolvers = {
    Query:{
     UserList(parent,args){
        
        // return db.UserList.find((moviesId)=>moviesId.id === parent.id)
        return db.UserList
     },   
     MovieList(){
        return db.MovieList
     },

     user(parent,args){
        const convertDataType = parseInt(args.id)
        return db.UserList.find((user)=>user.id === convertDataType)
        // const user = _.find(UserList,{id})
     },
     movie(parent,args){
        return db.MovieList.find((movie)=>movie.name === args.name)
     }
    },

    Mutation:{
        createUser(parent,args){
  
            db.UserList.push(args.user);
            return args.user;
        },
        updateUsername(parent,args){

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
        favoriteMovies:()=>{
            db.MovieList.filter((movie)=>{
                return movie.yearOfPublication >=2000 && movie.yearOfPublication <= 2010
            })
        }
    }


}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


// const {url} = await startStandaloneServer(server,{
//     listen:{port:4000}
// })

// const url = "http://localhost:300/"

server.listen().then(({url})=>{
    console.log(`running ${url}`)
})