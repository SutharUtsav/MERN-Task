const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const disconnect = async () =>{
    await prisma.$disconnect();
}

module.exports = {prisma, disconnect}