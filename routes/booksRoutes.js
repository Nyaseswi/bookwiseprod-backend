const router = require("express").Router();
const bookModel = require('../models/booksModel');

// POST REQUEST http://localhost:1000/api/v1/add
router.post('/add', async(req, res) => {
    try{
        const data = req.body;
        const newBook = new bookModel(data);
        await newBook.save().then(() =>{
            res.status(200).json({message: "Book added succesfully"});
        });
    } catch (error){
        console.log(error);
    }
});

// GET REQUEST http://localhost:1000/api/v1/getBooks
router.get('/getBooks', async(req,res) =>{
    let books;
    try{
        books = await bookModel.find();
        res.status(200).json({ books });
    }catch(error){
        console.log(error);
    }
});

// GET REQUEST WITH ID http://localhost:1000/api/v1/getBooks/65ad33c3c4d068e0516cb951
router.get('/getBooks/:id', async (req,res) => {
    let book;
    const id = req.params.id;
    try{
        book = await bookModel.findById(id);
        res.status(200).json({ book });
    }catch(error){
        console.log(error);
    }
});

//put method to update book by id http://localhost:1000/api/v1/updateBook/65ae3316bbf40f3d6fe937bb
router.put('/updateBook/:id', async (req, res) => {
    const id = req.params.id;
    const {name,description,author,avaiable,image,price} =  req.body;
    let book;
    try{
        book = await bookModel.findByIdAndUpdate(id,{
            name,
            description,
            author,
            avaiable,
            image,
            price
        });
        await book
        .save()
        .then(()=> res.send(200).json({message:"Updated"}))
    } catch (error){
        console.log(error)
    }
});

// delete book by id http://localhost:1000/api/v1/deleteBook/65ae3302bbf40f3d6fe937b9
router.delete('/deleteBook/:id', async (req,res) => {
    const id = req.params.id;
    try{
        await bookModel
        .findByIdAndDelete(id)
        .then(()=> res.status(201).json({message:"Deleted"}));
    } catch ( error ) {
        console.log(error);
    }
})






module.exports = router;