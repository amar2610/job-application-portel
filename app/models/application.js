'use strict';
module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define(
        'Application',
        {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            jobId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'jobs',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            resumeId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'resume',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
            tableName: 'Application',
        }
    );

    Application.associate = (models) => {
        Application.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'User',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Application.belongsTo(models.Resume, {
            foreignKey: 'resumeId',
            as: 'Resume',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Application.belongsTo(models.Jobs, {
            foreignKey: 'jobId',
            as: 'Jobs',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };

    return Application;
};
