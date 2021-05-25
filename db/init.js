const Database = require('./config')

//async / await
//await: Espera algo terminar para ir para a proxima
//async: O await so funciona se estiver dentro de um async

const initDb = {
    async init() {

        const db = await Database()

        await db.exec(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )`);

        await db.exec(`CREATE TABLE jobs ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME

    )`)

        await db.run(`INSERT INTO profile (
        name, 
        avatar, 
        monthly_budget, 
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_hour
        ) VALUES (
            "Mateus",
            "https://avatars.githubusercontent.com/u/17316392",
            3000,
            5,
            5,
            4,
            70    
    );`)
        await db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at 
        ) VALUES (
            "Trabalho Teste 2",
            4,
            44,
            1617514376018
    );`)

        await db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at 
        ) VALUES (
            "Trabalho Teste 1",
            3,
            50,
            1617514376018
    );`)

        await db.close()
    }
}

initDb.init()