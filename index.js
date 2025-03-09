// The provided course information.


/**
 * for some reason this assignment seems to allude to sql
 * treating every object as a table and 
 * 
 * 
 */
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
        },
        {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
        },
        {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
        submitted_at: "2023-01-25",
        score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
        submitted_at: "2023-02-12",
        score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
        submitted_at: "2023-01-25",
        score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
        submitted_at: "2023-01-24",
        score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
        submitted_at: "2023-03-07",
        score: 140
        }
    }
];

/**
 * This problem is reminiscent of a relational databse in sql where you use a header of one column in one table to get
 * the information of another table that shares that same header
 * 
 */

function dueStatus(arr, arr2){
    for(let i = 0; i < arr.length; i++){
        for (let k = 0; k < arr2.assignments.length;k++){
            if(arr[i].assignment_id == arr2.assignments[k].id){
                let dueDate = new Date(arr[i].submission.submitted_at)
                let submission = new Date(arr2.assignments[k].due_at)
                console.log(dueDate)
                console.log(submission)
                console.log(dueDate > submission);
               if(submission < dueDate){
                    arr[i].status = "late";
               }else if(submission > dueDate){
                    arr[i].status = "not_due";
               }else{
                    arr[i].status="ontime";
               }
            } 
        }
    }
    //return arr
}
dueStatus(LearnerSubmissions,AssignmentGroup);
/** 
function isThisAssignmentDue(arr1, arr2){
    for(let i = 0; i < arr.length)

}*/
function calculateLatescore(arr){
    let x = 0
    while(x < arr.length){
        if(arr[x].status === "late"){
            arr[x].submission.score = arr[x].submission.score - (arr[x].submission.score  * 0.10)
            console.log(arr[x].submission.score)
        }
        x += 1
    }

}

calculateLatescore(LearnerSubmissions);
function onlyAssignmentsSubmittd(arr){
    let assignments = []
    for(let i = 0; i < arr.length; i++){
        if(arr[i].status === "late" || arr[i].status === "ontime"){
            assignments.push(arr[i])
        }
    }
    return assignments
}

let neededSubmissions = onlyAssignmentsSubmittd(LearnerSubmissions);

function extractAssignment(arr){
    let ids = []
    for(let i = 0; i < arr.length; i++){
        ids.push(arr[i].id)
    }
}

function groupLearners(arr){
    const group = []
    let learner = 0  
    for(let i = 0; i < arr.length; i++){
        if (!group[learner]) {
            group[learner] = [];
        }
        if( i == 0 || group[learner][0].learner_id == arr[i].learner_id){
            group[learner].push(arr[i]);
        }else{
            learner += 1;
            if (!group[learner]) {
                group[learner] = [];
            }
            group[learner].push(arr[i]);
        }
    }
    return group
}
/** 
function ExpectedTotalGrade(Asg){
    while()

}*/
function weightedAvg(arr,arr2){
    let expected = 0;
    let outcome = 0;
    for(let i = 0;i < arr.length; i++){
        expected += arr[i].submissions.i
    }
}
function createGrades(arr,arr2){
    let ratio = 0
    for(let i= 0; i < arr.length; i++){
        for(let j = 0; j< arr[i].length; j++){

            for(k = 0; k < arr2.assignments.length; k ++){

                //debugging
            //    console.log(arr[i][j].assignment_id + " " + arr2.assignments[k].id )
                if(arr[i][j].assignment_id == arr2.assignments[k].id){
                    ratio = arr[i][j].submission.score/ arr2.assignments[k].points_possible;
                    arr[i][j].ratio = ratio
                }
            }
        }
    }
    return arr
}

createGrades(groupLearners(LearnerSubmissions),AssignmentGroup)
console.log(createGrades(groupLearners(LearnerSubmissions),AssignmentGroup));
//console.log(LearnerSubmissions[0].ratio)
function getLearnerData(CI,Asg,Ls){

    //First I use the course info to access
    let learnerGroup = groupLearners(LearnerSubmissions);
    

}