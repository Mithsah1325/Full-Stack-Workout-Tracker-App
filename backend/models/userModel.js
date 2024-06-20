import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// static signup method
userSchema.statics.signup = async function(username, password) {
    try {
        // validation
        if (!username || !password) {
            throw new Error('All fields must be filled');
        }
        if (!validator.isAlphanumeric(username)) {
            throw new Error('Username not valid');
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error('Password not strong enough');
        }
    
        const exists = await this.findOne({ username });
    
        if (exists) {
            throw new Error('Username already in use');
        }
    
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const user = await this.create({ username, password: hash });
    
        return user;
    } catch (error) {
        throw error;
    }
};

// static login method
userSchema.statics.login = async function(username, password) {
    try {
        if (!username || !password) {
            throw new Error('All fields must be filled');
        }
    
        const user = await this.findOne({ username });
        if (!user) {
            throw new Error('Incorrect username');
        }
    
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error('Incorrect password');
        }
    
        return user;
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

export default User;
