const Database = require('../db/config')



let data = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 1,
        created_at: Date.now() //atribuindo uma nova data de hoje       
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now() //atribuindo uma nova data de hoje
    }
];

module.exports = {
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`);

        await db.close()


        return jobs.map(job => ({

            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at

        }))
    },
    async update(updatedJob,jobId) {
        const db = await Database()
        
        await db.run(`UPDATE jobs SET 
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]}
        WHERE id = ${jobId}
        `)
        await db.close()
    },
    async delete(id) {
        const db = await Database()
        
        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()

    },
    async create(newJob) {
        const db = await Database()


        await db.run(`INSERT INTO jobs(

            name,
            daily_hours,
            total_hours,
            created_at

        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}

        ) `);

        await db.close()
        
    }

}