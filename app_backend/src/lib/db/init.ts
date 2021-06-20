import { DB } from './main'

class InitDB extends DB {
    constructor() {
        super()
    }

    public async initHandler () {
        console.log('initHandler run')
        this.db.serialize(async () => {
            this.db.run(`CREATE TABLE IF NOT EXISTS account (
                id SERIAL PRIMARY KEY NOT NULL,
                firstname VARCHAR (255) NOT NULL,
                lastname VARCHAR (255) NOT NULL,
                password TEXT NOT NULL,
                email VARCHAR (255) UNIQUE NOT NULL,
                created_at TIMESTAMP NOT NULL
            );`)

            this.db.run(`CREATE TABLE IF NOT EXISTS company (
                id SERIAL PRIMARY KEY NOT NULL,
                account_id INT NOT NULL,
                name VARCHAR (255) NOT NULL,
                street VARCHAR (255) NOT NULL,
                bulding_number VARCHAR (255),
                locality VARCHAR (255),
                postal_code VARCHAR (255) NOT NULL,
                city VARCHAR (255) NOT NULL,
                country VARCHAR (255) NOT NULL,
                nip CHAR (10) NOT NULL,
                bank_account VARCHAR (255) NOT NULL,
                bank_name VARCHAR (255),
                created_at TIMESTAMP NOT NULL,
                FOREIGN KEY (account_id)
                    REFERENCES account (id)
            );`)

            this.db.run(`CREATE TABLE IF NOT EXISTS settings (
                id SERIAL PRIMARY KEY NOT NULL,
                account_id INT NOT NULL,
                bussines_activity_code VARCHAR (255),
                invoice_number_schema VARCHAR (255),
                payment_period VARCHAR (255),
                currency VARCHAR (255),
                FOREIGN KEY (account_id)
                    REFERENCES account (id)
            );`)

            this.db.run(`CREATE TABLE IF NOT EXISTS customer (
                id SERIAL PRIMARY KEY NOT NULL,
                account_id INT NOT NULL,
                name VARCHAR (255) NOT NULL,
                street VARCHAR (255) NOT NULL,
                bulding_number VARCHAR (255),
                locality VARCHAR (255),
                postal_code VARCHAR (255) NOT NULL,
                city VARCHAR (255) NOT NULL,
                country VARCHAR (255) NOT NULL,
                nip CHAR (10) NOT NULL,
                bank_account VARCHAR (255) NOT NULL,
                bank_name VARCHAR (255),
                created_at TIMESTAMP NOT NULL,
                FOREIGN KEY (account_id)
                    REFERENCES account (id)
            );`)

            this.db.run(`CREATE TABLE IF NOT EXISTS invoice (
                id SERIAL PRIMARY KEY NOT NULL,
                account_id INT NOT NULL,
                customer_id INT NOT NULL,
                invoice_number VARCHAR (255) NOT NULL,
                price_net DOUBLE PRECISION NOT NULL,
                price DOUBLE PRECISION NOT NULL,
                vat DOUBLE PRECISION NOT NULL,
                currency VARCHAR (255) NOT NULL,
                payment_date DATE NOT NULL,
                payment_period VARCHAR (255),
                service_period VARCHAR (255),
                author VARCHAR (255),
                created_at TIMESTAMP NOT NULL,
                FOREIGN KEY (account_id)
                    REFERENCES account (id),
                FOREIGN KEY (customer_id)
                    REFERENCES customer (id)
            );`)

            this.db.run(`CREATE TABLE IF NOT EXISTS invoice_positions (
                id SERIAL PRIMARY KEY NOT NULL,
                invoice_id INT NOT NULL,
                position_name VARCHAR (255) NOT NULL,
                bussines_activity_code VARCHAR (255),
                measurement varchar (5) NOT NULL,
                amount INT NOT NULL,
                price_net DOUBLE PRECISION NOT NULL,
                price DOUBLE PRECISION NOT NULL,
                vat DOUBLE PRECISION NOT NULL,
                vat_rate TINYINT NOT NULL,
                total_value_net DOUBLE PRECISION NOT NULL,
                total_value DOUBLE PRECISION NOT NULL,
                currency VARCHAR (255) NOT NULL,
                FOREIGN KEY (invoice_id)
                    REFERENCES invoice (id)
            );`)
            console.log('merchant_table initialized')
        })
    }
}

export default new InitDB()
