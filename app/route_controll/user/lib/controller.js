require('dotenv').config();

const bcrypt = require('bcryptjs');
const db = require('../../../models');
const jwt = require('jsonwebtoken');
exports.userRegistration = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { name, email, password } = req.body;
        const check = await db.User.findOne({
            where: {
                email: email,
            },
        });

        if (check) {
            return res.status(409).json({ message: 'email already exist' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let userPayload = {
            name,
            email,
            password: hashedPassword,
        };
        await db.User.create(userPayload, { transaction });
        await transaction.commit();

        return res.status(200).json({
            message: 'User created successfully.',
        });
    } catch (err) {
        console.log(err);

        await transaction.rollback();
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.userLogin = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({
            where: {
                deletedAt: null,
                email: email,
            },
            transaction,
        });

        if (!user) {
            await transaction.rollback();
            return res.status(404).json({ status: false, message: 'Invalid Email!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            await transaction.rollback();
            return res.status(401).json({ status: false, message: 'Invalid password!' });
        }

        const tokenPayload = {
            id: user.id,
            email: user.email,
        };
        const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET_API, { expiresIn: process.env.TOKEN_EXPIRE_MIN });
        const userData = {
            name: user.name,
            email: user.email,
        };
        const response = {
            accessToken: token,
            userData,
        };
        await transaction.commit();

        return res.status(200).json({ status: true, message: 'Login Success', data: response });
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.uploadResume = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        let resumePayload = {
            userId: req.user.id,
            resumePath: req.file.filename,
        };

        await db.Resume.create(resumePayload, { transaction });
        await transaction.commit();

        res.status(200).json({
            message: 'Resume uploaded successfully!',
            file: req.file.filename,
            path: req.file.path,
        });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: 'Upload failed', error: err.message });
    }
};

exports.getResume = async (req, res) => {
    try {
        const userId = req.user.id;

        const resume = await db.Resume.findAll({
            where: { userId },
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        let resumes = [];
        resume.map((data) => {
            if (data.resumePath) {
                resumes.push({ resumeId: data.id, url: `${req.protocol}://${req.get('host')}/uploads/resumes/${data.resumePath}` });
            }
        });
        // Return the public file URL
        return res.status(200).json({
            message: 'Resume found',
            resumes: resumes,
            // url: urls,
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({ message: 'Something went wrong' });
    }
};
