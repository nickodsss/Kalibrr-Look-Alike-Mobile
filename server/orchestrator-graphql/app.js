
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");


const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
} = require("./schema/user");

const {
    typeDefs: jobTypeDefs,
    resolvers: jobResolvers
} = require("./schema/job")

// DI GRAPHQL COMMAND ITU PAKE HASHTAG, KALO DI JS BARU PAKE //
// Kalau di typedefs ada properti yang ga di declare, dan tb2 ada di resolvers. dia akan ga muncul. Lalu kebalikannya, kalau di typedefs ad properti yg d declare sedangkan di resolvers ga ada . maka dia akan muncul dengan value null
// TypeDefs = tipe data dari data data yang kita punya / schema (kalau di sequelize namanya model).Definisiinnya harus sesuatu yang didefinisikan sebagai graphql ( pakai #graphql )
/*
 Contoh: const typeDefs = `#graphql
    #Ini sama aja model dengan nama "Book"
 type Book {
    title: String, (sebenernya ga perlu pake koma, tapi kalau pake jg gpp)
    author: String
 }

 #Kemudian harus definisiin 2 tipe tambahan
 type Query { -> untuk ambil data
    #Definisikan sebuah query dengan nama "books"
    #Akan mengembalikan "banyak book"
    books: [Book] -> karena akan mengembalikan banyak book dan di typedefs itu cuman mendefinisikan belum ada logic!

    #Disini ceritanya harus bisa menerima argumen
    Berarti anggap si bookById menjadi suatu fungsi
    Pakai tanda seru artinya wajib ada ( tanda seru di belakang artinya not null/wajib)
    bookById(id:ID!): Book
 }  

 type Mutation { -> untuk manipulasi data /mutasi data

 }
 `
 */
// Resolvers = 
/*
Contoh: 
    const resolvers = { 
        #Ini object yang isinya sebenernya cuman ada 2 properti
        Query: {
            books: async () => {
                #Instead pake data directly maka disini masukin harus pake fetch /axios,
                Bikin logic utk return array of books yang udah dijanjiin di typedefs
            },

            bookById: async (_, { id }) => { -> parameter kedua di deconstruct karena menerima args yang dimana args adalah object 
                console.log('Id yang didapat dari aplikasi', id)
            // Bikin logic untuk balikin si "Book"

            const foundBook = data.find(el => +id === +el.id)
            
            // Harus return "sesuai kontrak yang ada"
            return foundBook
            }
        }
        return data
    }
*/
/** 
 Setelah itu tinggal masukin si resolvers sama typedefs nya ke dalam newApolloServer({
    typeDefs: [typeDefs],
    resolvers: [resolvers]
 })

**/

const server = new ApolloServer({
    typeDefs: [userTypeDefs, jobTypeDefs],
    resolvers: [userResolvers, jobResolvers],
    introspection: true,
});

// Fungsi Anonymous yang langsung dijalankan: 
// Immediately Invoked Function Expression (IIFE)
/*
Didokumentasi ga pake IIFE, karena pakai sistem modules
*/
(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT || 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
})();


