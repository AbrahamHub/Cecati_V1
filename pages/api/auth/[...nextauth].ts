import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Aquí deberías implementar tu propia lógica de autenticación
        // Por ejemplo, verificar las credenciales contra una base de datos
        if (credentials.username === "admin" && credentials.password === "password") {
          return { id: 1, name: "Admin", email: "admin@example.com" }
        } else {
          return null
        }
      }
    })
  ],
  // Añade cualquier configuración adicional que necesites
}

export default NextAuth(authOptions)