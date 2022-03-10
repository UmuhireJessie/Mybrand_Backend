import MessageSchema from "../model/messageschema.js";

// create and save a new message
const createMessage = (req, res) => {
    // validate request
    let defaultName
    if(req.body.name == ""){
        defaultName = "unnonymous"
    }else{
        defaultName = req.body.name
    }

    if (!req.body){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }

    // new message
    const message = new MessageSchema({
        name: defaultName,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        date: Date.now()
    });

    // save message in the database
    message
        .save(message)
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            }); 
        });

}

// retrieve and return all messages retrieve and return a single user
const findMessage = async(req, res) => {
    const message = await MessageSchema.find({})
    .then(message => {
        res.status(200).send(message)
    })
    .catch(err => {
        res.status(500).send({message:err.message ||"Error occurred while retrieving message information"})
    })
}

// Update a new identified Message by user id
const updateMessage = async (req, res) => {
    const Id = req.params.id;
    const UpdateStatus = await MessageSchema.findByIdAndUpdate(Id, {
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      date: Date.now()  
    });
    res.status(200).json({
      message: 'data has been update successfully',
      data: UpdateStatus,
    });
  };

// Delete a message with specified user id in the request
const deleteMessage = async (req, res) => {
    const id = req.params.id;

    const user = await MessageSchema.findByIdAndDelete(id)
        .then(data => {
            if (!data){
                res.status(404).send({message:`Cannot Delete with id ${id}. Maybe id is wrong!`})
            }else{
                res.send({message: "Message was deleted successfully!"})
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Message with id="+id
            });
        });      
}

// Get one message with specified user id in the request

const getOneMessage = async(req, res) => {
    const id = req.params.id;

    const message = await MessageSchema.findById(id)
        .then(data => {
            if (!data){
                res.status(404).send({message:`Cannot find with id ${id}. Maybe id is wrong!`})
            }else{
                res.send({message: "Message Found!", data})
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not find Message with id="+id
            });
        }); 
}

export {
    createMessage, updateMessage, deleteMessage, findMessage, getOneMessage
}