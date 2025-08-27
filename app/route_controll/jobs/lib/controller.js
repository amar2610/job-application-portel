require('dotenv').config();

const db = require('../../../models');

exports.getAllJobs = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const Job = await db.Jobs.findAll({
            where: {
                deletedAt: null,
            },
            transaction,
        });

        if (!Job) {
            await transaction.rollback();
            return res.status(404).json({ status: false, message: 'Job not found' });
        }

        return res.status(200).json({ data: Job });
    } catch (err) {
        console.log(err);

        await transaction.rollback();
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
