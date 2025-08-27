require('dotenv').config();

const bcrypt = require('bcryptjs');
const db = require('../../../models');
const jwt = require('jsonwebtoken');

exports.apply = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { jobId, resumeId } = req.body;
        const job = await db.Jobs.findOne({
            where: {
                deletedAt: null,
                id: jobId,
            },
            transaction,
        });
        const resume = await db.Resume.findOne({
            where: {
                deletedAt: null,
                id: resumeId,
            },
        });

        if (!job) {
            await transaction.rollback();
            return res.status(404).json({ message: 'job Not Found!' });
        }
        if (!resume) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Resume Not Found!' });
        }

        const applyData = {
            userId: req.user.id,
            jobId: jobId,
            resumeId: resumeId,
        };
        let apply = await db.Application.create(applyData, { transaction });
        if (!apply) {
            return res.status(400).json({ message: 'Not Able To Apply ' });
        }
        const response = {
            ApplicationNumber: apply.id,
        };
        await transaction.commit();

        return res.status(200).json({ message: 'Apply Successfully', data: response });
    } catch (err) {
        console.log(err);

        await transaction.rollback();
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.applications = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const [applications] = await db.sequelize.query(
            `
            SELECT a.id AS applicationId, u.name AS applicantName, c.title AS jobName, r.resumePath
            FROM Application AS a
            INNER JOIN user AS u ON u.id = a.userId
            INNER JOIN resume AS r ON a.resumeId = r.id
            INNER JOIN jobs AS c ON c.id = a.jobId
            WHERE a.userId = '${req.user.id}'
            `
        );

        const response = applications.map((data) => ({
            applicationId: data.applicationId,
            applicantName: data.applicantName,
            jobName: data.jobName,
            resumePath: `${req.protocol}://${req.get('host')}/uploads/resumes/${data.resumePath}`,
        }));

        res.status(200).json({
            message: 'succes!',
            data: response,
        });
    } catch (err) {
        console.log(err);

        await transaction.rollback();
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
