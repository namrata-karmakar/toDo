class DOBValidation {
    static getMinimumDOB(){
        try{
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();
            const minimumDOB = new Date(currentYear - 18, currentMonth, currentDay).toDateString()
            console.log(minimumDOB)
            return minimumDOB //2003-03-19 
        }catch(e){
            throw e;
        }
    }
  
}

module.exports = {DOBValidation}