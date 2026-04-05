import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function setUserRole(email: string, role: "finance" | "ops") {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role },
    })
    console.log(`✅ Updated ${email} to role: ${role}`)
    return user
  } catch (error) {
    console.error(`❌ Failed to update ${email}:`, error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

// Get email and role from command line
const email = process.argv[2]
const role = process.argv[3] as "finance" | "ops"

if (!email || !role) {
  console.log("Usage: bun run scripts/set-user-role.ts <email> <finance|ops>")
  process.exit(1)
}

if (role !== "finance" && role !== "ops") {
  console.log("Role must be either 'finance' or 'ops'")
  process.exit(1)
}

setUserRole(email, role)