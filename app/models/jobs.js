'use strict';
module.exports = (sequelize, Sequelize) => {
    const Jobs = sequelize.define(
        'Jobs',
        {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            companyName: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                onCreate: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
        },
        {
            tableName: 'jobs',
        }
    );
    Jobs.associate = (models) => {
        Jobs.hasMany(models.Application, {
            foreignKey: 'jobId',
            as: 'jobs',
        });
    };
    return Jobs;
};
