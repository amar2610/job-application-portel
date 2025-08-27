'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'jobs',
            [
                {
                    id: 'f1c8b2a1-9ef1-4c9e-8101-4db614cc1c91',
                    title: 'Backend Developer',
                    companyName: 'openAi',
                    email: 'contact@openai.com',
                    createdAt: '2025-08-20T10:00:00Z',
                    updatedAt: '2025-08-20T10:00:00Z',
                    deletedAt: null,
                },
                {
                    id: 'a3e7e5a2-5cc3-42b0-a7f5-2df0cb2b9b7f',
                    title: 'Full Stack Developer',
                    companyName: 'google',
                    email: 'support@google.com',
                    createdAt: '2025-08-20T10:01:00Z',
                    updatedAt: '2025-08-20T10:01:00Z',
                    deletedAt: null,
                },
                {
                    id: 'c9f3c4e7-bf3e-4b71-a9c3-ec839e637c8b',
                    title: 'NodeJs Developer',
                    companyName: 'Microsoft',
                    email: 'info@microsoft.com',
                    createdAt: '2025-08-20T10:02:00Z',
                    updatedAt: '2025-08-20T10:02:00Z',
                    deletedAt: null,
                },
                {
                    id: 'b6e1f943-6a89-4cb7-a032-0f539be6f94f',
                    title: 'ReactJs Developer',
                    companyName: 'Amazon',
                    email: 'aws-support@amazon.com',
                    createdAt: '2025-08-20T10:03:00Z',
                    updatedAt: '2025-08-20T10:03:00Z',
                    deletedAt: null,
                },
                {
                    id: 'ad314590-d16a-4b32-91e3-7f81c23a871a',
                    title: 'Android Developer',
                    companyName: 'Meta',
                    email: 'meta@support.com',
                    createdAt: '2025-08-20T10:04:00Z',
                    updatedAt: '2025-08-20T10:04:00Z',
                    deletedAt: null,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('jobs', null, {});
    },
};
