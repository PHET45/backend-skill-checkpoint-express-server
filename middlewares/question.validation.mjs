export const validateCreateQuestionData = (req, res, next) => {
    const questionCategoryList = ["Software", "Food", "Travel", "Science", "Etc", "Geography"]
    const hasQuestionCategoryList = questionCategoryList.includes(req.body.category)
    
    if(!hasQuestionCategoryList){
        return res.status(400).json({
            massage: "กรุณาส่งข้อมูล Category ของ Question ตามกำหนดเช่น 'Software' , 'Food', 'Travel', 'Science', 'Etc' ,  'Geography' "
        })
    }

  

    next()
};

export const validateCreateAnswersData = (req, res, next) => {
    if(req.body.content.length > 500){
        return res.status(400).json({
            massage: "กรุณาส่งตอบคำถามตามที่กำหนดไม่เกิน 500 ตัวอักษร"
        })
       }
    
        next()
}

