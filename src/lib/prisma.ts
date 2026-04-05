import { PrismaClient } from '@prisma/client'

// Prisma 7 requires an empty options object
const prismaClientSingleton = () => {
  return new PrismaClient({})
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma