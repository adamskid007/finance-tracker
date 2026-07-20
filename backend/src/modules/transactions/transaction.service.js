import prisma from "../../config/prisma.js";

export const createTransaction = async (transactionData) => {
    const {title, amount, type, category, date} = transactionData;

    const transaction = await prisma.transaction.create({
        data: {
            title, 
            amount: Number(amount),
            type,
            category,
            date: date ? new Date(date) : new Date(),
        },
    });
    return transaction;
};

export const getTransactions = async (query) => {
  const {
    search,
    type,
    category,
    startDate,
    endDate,
    page = 1,
    limit = 10,
    sort = "date",
    order = "desc",
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const where = {};

  if (type) {
    where.type = type;
  }

  if(search) {
    where.title = {
        contains: search,
        mode: "insensitive",
    };
  }

  if (category) {
    where.category = category;
  }

  if (startDate || endDate) {
    where.date = {};

    if (startDate) {
      where.date.gte = new Date(startDate);
    }

    if (endDate) {
      where.date.lte = new Date(endDate);
    }
  }

  const allowedSortFields = [
    "date",
    "amount",
    "title",
    "category",
    "type",
    
  ];

  const sortField = allowedSortFields.includes(sort)
  ? sort
  : "date";

  const sortOrder =
  order === "asc" ? "asc" : "desc";

  const orderBy = {
  [sortField]: sortOrder,
};
  
  const [totalTransactions, transactions] = await Promise.all([
    prisma.transaction.count({ where }),
    prisma.transaction.findMany({
        where,
        orderBy,
        skip,
        take: limitNumber,
    }),
    ]);

  return {
    transactions,
    pagination: {
      total: totalTransactions,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalTransactions / limitNumber),
    },
  };
};

export const getTransactionById = async (id) => {
    const transaction = await prisma.transaction.findUnique({
        where: {id,},
    });
    return transaction;
};

export const deleteTransaction = async (id) => {
    const transaction = await prisma.transaction.findUnique({where: {id},});

    if(!transaction){
        return null;
    }
    await prisma.transaction.delete({where: {id},});

    return transaction;

};

export const updateTransaction = async (id, data) => {
    const transaction = await prisma.transaction.findUnique({ where: {id},});

    if(!transaction){
        return null
    }
    const updatedTransaction = await prisma.transaction.update({
        where: {id},
        data:{
            ...data,
            ...(data.amount && {amount: Number(data.amount) }),

            ...(data.date && {date:new Date(data.date)}),
        },
    });
    return updatedTransaction;
};

export const getSummary = async () => {
    const totalIncome = await prisma.transaction.aggregate({
        where: {
            type: "INCOME",
        },
        _sum: {
            amount: true,
        },
        _count: true,
    });
    
    const totalExpense = await prisma.transaction.aggregate({
        where: {
            type: "EXPENSE",
        },
        _sum: {
            amount: true,
        }, 
        _count: true,
    });

    const transactionCount = await prisma.transaction.count();

    return {
        totalIncome: totalIncome._sum.amount ?? 0,
        totalExpense: totalExpense._sum.amount ?? 0,

        incomeCount: totalIncome._count,
        expenseCount: totalExpense._count,

        transactionCount,

        balance:
        (totalIncome._sum.amount ?? 0) - (totalExpense._sum.amount ?? 0),
    };
};
