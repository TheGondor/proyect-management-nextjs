import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'proyect-management-api',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })

        const user = await res.json();
        if (!res.ok) {
            throw new Error( JSON.stringify({ errors: user.message, status: false }))
        }
        // If no error and we have user data, return it
        if (res.ok && user.status == true) {
            console.log(user)
            return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          user: user.user,
          refreshToken: '',
        };
      }

      return token;
    },

    async session({ session, token }) {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.accessTokenExpires = token.accessTokenExpires
        session.user.user = token.user

      return session;
    },
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/logo.png', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
});