module.exports = {
    Query: {
        getUser: async (__, { username, password }, { User }) => {
            const user = await User.findOne({ username })

            if(!user) {
                throw new Error('User is not exist') 
            }
            else if(password != user.password ) {
                throw new Error('Wrong password') 
            }
            
            return user;
        },
        getContacts: async (__, args, { Contact }) => {
            const contacts = await Contact.find({}).sort({ createdDate: 'desc' }).populate({
                path: 'createdBy',
                model: 'User'
            })

            return contacts;
        }
    }, 
    Mutation: {
        addContact: async (__, { name, phone, mail, creatorId }, { Contact }) => {
            const contact = await new Contact({
                name,   
                phone,
                mail, 
                createdBy: creatorId
            }).save()

            return contact;
        },

        signupUser: async (__, { username, password }, { User }) => {
            let user = await User.findOne({ username })

            if(user) {
                throw new Error('User already exist') 
            }
            else {
                user = await new User({
                    username,
                    password
                }).save()
            }

            return user;
        },

        editContact: async (__, { name, phone, mail, _id }, { Contact }) => {
            let contact = await Contact.findOneAndUpdate(
                { _id },
                { $set: { name, phone, mail }},
                { new: true}
            )

            return contact;
        },

        deliteContact: async (__, { _id }, { Contact }) => {
            const contact = Contact.findOneAndRemove({ _id })
            return contact;
        }
    }
}