import User from '../Models/userModels.js'
import bcrypt from 'bcryptjs'
import { ErrorHandler } from '../Utils/error.js'
import jwt from 'jsonwebtoken';
import { z } from 'zod'

const signUpSchema = z.object({
username: z.string().min(8).max(30),
email: z.string().email(),
password: z.string().min(8),
});

export const SignUp = async (req, res) => {
    try {
        const validatedData = signUpSchema.parse(req.body);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        if (!validatedData.username || !validatedData.email || !validatedData.password) {
        return res.status(400).json({ success: false, message: 'Please fill in all the required fields.' });
        }

        const newAuth = new User({
        username: validatedData.username,
        email: validatedData.email,
        password: hash,
        });

        const savedAuth = await newAuth.save();
        return res.status(200).json({ success: true, message: 'Successfully created user', data: savedAuth });
    } catch (error) {
        if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
        } else {
        // Handle other errors
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Failed to create user' });
        }
    }
    };

export const SignIn = async (req, res, next) => {
    const {email, password} = req.body 
    try {
        const foundUser = await User.findOne({email})         //Berisi data pengguna yang ditemukan berdasarkan alamat email yang direquest
        if (!foundUser) {
            return next(ErrorHandler(500, "User not found"))
        }

        //Compare
        const validPwd = await bcrypt.compareSync(password, foundUser.password)
        if(!validPwd) {
            return next(ErrorHandler(401, 'inccorect email/password'))
        }

        const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET, {expiresIn: '15d'})     ////Token untuk disertakan klien dalam setiap permintaan ke server yang memerlukan otentikasi.
        const {password: pass, ...rest} = foundUser._doc
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: token.expiresIn
        })
        return res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

//GOOGLE
export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(user) {
            //buat token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '15d'})   //tandatangani id, jwt_secret dengan waktu expires token
            const {password: pass, ...rest} = user._doc       //pisahkan agar yg tampil di res tidak termaksud pwd
            res.cookie('access_token', token, {               //token dan datanya taro cookie
                httpOnly: true,
                expires: token.expiresIn
            }).status(200).json(rest)
        } else {            
            //jika tidak, user buat baru dengan passwordnya.
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);     //36 yaitu mewakili angka 1-0 dan huruf A-Z, 8 yaitu hanya mengambil 8 angka terakhir dari random. double agar secure
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(generatedPassword, salt)
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo})
            
            await newUser.save()

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {expiresIn: '15d'})
            const {password: pass, ...rest} = newUser._doc;
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiresIn
            }).status(200).json(rest)
        }
    } catch (error) {
        const errorObject = ErrorHandler(500, "Failed entering google");
        return res.status(errorObject.status).redirect('/signin');
    }
}

export const SignOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token')
        return res.status(200).json({success: true, message: 'user has been logout'})
    } catch (error) {
        next(error)
    }
}