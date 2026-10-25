/* Test environment: a separate database and generous rate limits. */
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgres://talal:talal_dev_pw@127.0.0.1:5433/talal_at_test';
process.env.JWT_SECRET = 'test-secret-test-secret-test-secret-123456';
process.env.ADMIN_EMAIL = 'owner@talal.test';
process.env.ADMIN_PASSWORD = 'Correct-Horse-Battery-9';
process.env.FORM_THROTTLE_LIMIT = '1000';
process.env.THROTTLE_LIMIT = '10000';
process.env.SWAGGER_ENABLED = 'false';
process.env.PAYMENT_LINK = 'https://pay.example.com/deposit';
