'use strict';
module.exports = (sequelize, Sequelize) => {
    const Resume = sequelize.define(
        'Resume',
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
            resumePath: {
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
            tableName: 'resume',
        }
    );
     
    Resume.associate = (models) => {
        Resume.hasMany(models.Application, {
            foreignKey: 'resumeId',
            as: 'application',
        });
        Resume.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'User',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return Resume;
};
