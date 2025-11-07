import NextAuth from 'next-auth'

const handler = NextAuth({
  providers: [],
  pages: {
    signIn: '/',
    error: '/',
  },
})

export { handler as GET, handler as POST }