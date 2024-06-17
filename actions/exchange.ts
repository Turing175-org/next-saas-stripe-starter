"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { CreateExchangeApiSchema } from "@/lib/validations/exchange"
import { auth } from "@/auth";
import { prisma } from "@/lib/db";


export async function createExchangeAPI(userId: string, input: CreateExchangeApiSchema) {
  // noStore()
  try {
    const session = await auth()
    
    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    // creat 
    await prisma.exchangeAccount.create({
      data: {
        userId: userId,
        exchangeName: input.exchange,
        apiKey: input.api,
        secretKey: input.secret,
        passphrase: input.passphrase,
        description: input.description,
      },
    })
    
    // await db.transaction(async (tx) => {
    //   const newTask = await tx
    //     .insert(tasks)
    //     .values({
    //       code: `TASK-${customAlphabet("0123456789", 4)()}`,
    //       title: input.title,
    //       status: input.status,
    //       label: input.label,
    //       priority: input.priority,
    //     })
    //     .returning({
    //       id: tasks.id,
    //     })
    //     .then(takeFirstOrThrow)

    //   // Delete a task to keep the total number of tasks constant
    //   await tx.delete(tasks).where(
    //     eq(
    //       tasks.id,
    //       (
    //         await tx
    //           .select({
    //             id: tasks.id,
    //           })
    //           .from(tasks)
    //           .limit(1)
    //           .where(not(eq(tasks.id, newTask.id)))
    //           .orderBy(asc(tasks.createdAt))
    //           .then(takeFirstOrThrow)
    //       ).id
    //     )
    //   )
    // })

    revalidatePath("/")

    return {
      status: "success",
    }
  } catch (err) {
    console.log(err)
    return {
      data: null,
      error: (err),
    }
  }
}

