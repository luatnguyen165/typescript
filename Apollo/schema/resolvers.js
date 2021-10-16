const { prisma } = require("../prisma");
const resolvers = {
    Query: {
        getAllUsers: async(parent, args) => {
        return await prisma.user.findMany()
      },
      User: async(parent, args) => {
          return await prisma.user.findUnique({
              where:{
                  id:Number(args.id),
              }
          })
      }
     
  
  },
  Mutation:{
    createUser: async(parent, args) => {
        return await prisma.user.create({
            data:{
                username:args.username,
                password:args.password,
                email:args.email,
            }
        })
    },
    update : async(parent, args) => {
        return await prisma.user.update({
            where:{
                id:Number(args.id),
            },
            data:{
                username:args.username,
                password:args.password,
                email:args.email,
            }
        })
    },
    remove : async(parent, args) => {
        return await prisma.user.delete({
            where:{
                id:Number(args.id),
            }
        })
    }
  }
  
}

  module.exports = resolvers;