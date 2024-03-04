export type User = {
    id:ID!
     firstName:String!
     lastName:String
     email:String!
     profileImageUrl:string
}
export type Tweet = {
    content:string,
    imageURL :string,
    author: User
}
export type CreateTweetData ={
    content :string,
    imageURL: string
}