const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {

        const jobs = await Job.get();
        const profile = await Profile.get();


        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
        //Let muda o valor sempre que solicitado a ação 
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'


            //somando quantidade de status
            statusCount[status] += 1;
            
            
            //explicação do if ternario 
            //Se for progress ele concatena com Number(job['daily-hours']) se não ele permanece como jobTotalHours
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

            // Exemplo do if normal nesse caso:
            /*
            if(status == 'progress'){
                jobTotalHours += Number(job["daily-hours"]);
            }
            */


            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            };


        });

        const freeHours = profile["hours-per-day"] - jobTotalHours;


        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }
}
