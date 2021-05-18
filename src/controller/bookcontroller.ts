import { Express, Request, Response, NextFunction } from "express";
import Book from "../schema/book.schema";

async function hello(req: Request, res: Response, next: NextFunction) {
  res.status(400).send("Unable to save into Database");
  console.log("unable to send data");
}

//To insert book in DB
async function addBook(req: Request, res: Response) {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    edition: req.body.edition,
  });

  await Book.findOne(
    {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      edition: req.body.edition,
    },
    (err: any, book: any) => {
      if (book)
        res.status(400).send({ err: "Book already exist", Book_Info: book });
    }
  );

  const bookinfo = await book.save();
  console.info(bookinfo);
  res.status(200).send({ Log: "Book successfully added", bookinfo });
}

async function add(req: Request, res: Response) {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    edition: req.body.edition,
  });

  try {
    Book.findOne(
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        edition: req.body.edition,
      },
      (err: any, book: any) => {
        if (book)
          return false;
      }
    );
    const bookinfo = await book.save();
    console.info(bookinfo);
    res.status(200).send({ Log: "Book successfully added", bookinfo });
  } 
  catch (err) {
    if(book) res.status(400).send({ Err: "Book already exist", Book_Info: book });
  }
}

//To get book from DB
async function getBook(req: Request, res: Response) {
  let title = req.body.title;
  await Book.findOne({ title: title }, (err: any, book: any) => {
    if (book) {
      res.status(201).send({ Log: "Book Found", Book_Info: book });
    } else {
      res.status(400).send("No Book Found");
    }
  });
}

//To get All Books
async function getAllBooks(req: Request, res: Response) {
  await Book.find((err: any, book: any) => {
    if (book) {
      res.status(201).send({ All_Books: book });
    } else {
      res.status(400).send("No Book Found");
    }
  });
}

// To delete the book
async function removeBook(req: Request, res: Response) {
  console.log(req.body.id);
  try {
    await Book.deleteOne({ _id: req.body._id }, () => {
      if (true) res.status(200).send("Book Has Been Removed");
    });
  } catch (err) {
    res.status(201).send({ err, msg: "No Book Available With This ID" });
  }
}
//To update the book
async function updateBook(req: Request, res: Response) {
  let title = req.body.title;
  let description = req.body.description;
  let category = req.body.category;
  let edition = req.body.edition;

  await Book.findOne({ _id: req.body.id }, (err: any, book: any) => {
    book.title = title;
    book.description = description;
    book.category = category;
    book.edition = edition;

    book.save((err: any, book: any) => {
      if (err) res.status(400).send("Book is Not Updated");
      else
        res
          .status(400)
          .send({ Log: "Book updated successfully", Book_Info: book });
    });
  });
}

export default {
  hello,
  addBook,
  add,
  getBook,
  removeBook,
  updateBook,
  getAllBooks,
};
