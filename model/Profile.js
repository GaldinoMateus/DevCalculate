const DataBase = require('../db/config')



let data = {
    name: "Mateus",
    avatar: "https://avatars.githubusercontent.com/u/17316392?s=460&u=6912a91a70bc89745a2079fdcdad3bc3ce370f13&v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 200

};


module.exports = { //Importando o data para ser utilizado no Controllers entre outros
    async get() {
        const db = await DataBase()
        
        const data = await db.get(`SELECT * FROM profile`)
        
        
        await db.close()

        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        };
    },

    async update(newData) {
        const db = await DataBase()

        //TEMPLATE STRING 

        db.run(`UPDATE profile SET 
        name = "${newData.name}", 
        avatar = "${newData.avatar}",
        "monthly_budget" = ${ newData["monthly-budget"]},
        "days_per_week" = ${ newData["days-per-week"]},
        "hours_per_day" = ${ newData["hours-per-day"]},
        "vacation_per_year" = ${ newData["vacation-per-year"]},
        "value_hour" = ${ newData["value-hour"]}   
        `)


    }
}