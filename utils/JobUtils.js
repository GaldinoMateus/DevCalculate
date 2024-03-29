module.exports =  {
    remainingDays(job) {
        //AJUSTES NO JOB
        //CALCULOS
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDate = createdDate.setDate(dueDay)


        const timeDiffInMs = dueDate - Date.now()
        //trasformar milisegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs) //Math.flor = Arredonda pra baixo

        //Restam X dias
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}