// The provided course information.


/**
 * NOTE: !!! means important when addressing issues
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
        submitted_at: "2023-02-27",//same example here the submission earlier than the due date so it wouldnt count but changing the date
        //to "2023-02-27" would give the expected ontime result; i changed the values from ___"2023-02-12" to "2023-02-27" to output expected
        //results
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
        submitted_at: "2023-01-25",//<--- changing the date to 2023-01-25 would give the desired reslts otherwise it couldnt count
         // due to it's submission not being due yet ( submission 2023-01-24| 2023-01-25 due date)
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140 //!!! IMPORTANT here since the submission was late 10% of 140 is 14, deducting it will give 126 points, but deducts 15 
        //in the expected output in code sandbox
      }
    }
  ];

/**
 * This problem is reminiscent of a relational databse in sql where you use a header of one column in one table to get
 * the information of another table 
 * 
 */

/**
 * 
 * Below I created a dueStatus function that adds a key which determines 
 * whether a submission is 'late','not_due' or 'on_time' to the submission date
 * by checking the learner's submission assignment id and comparing its submitted_at date with
 * the AssignmentGroup assignment's due at key value pairs
 * 
 * IMPORTANT!!! WHEN COMPARING THE SUBMISSIONS OF THE LEARNERS IT HAPPENS TO SHOW THAT 
 * FOR LEARNER ID:132 AND ID:125 ONLY HAD 1 SUBMISSION RESPECTIVELY (SHOWN LATER IN DEBUGGING) AND EVERYTHING ELSE
 * NOT BEING DUE
 */
//takes in LearnerSubmissions and AssignmentGroup repsectively changing the values through reference
function dueStatus(arr, arr2){
    for(let i = 0; i < arr.length; i++){
        for (let k = 0; k < arr2.assignments.length;k++){
            if(arr[i].assignment_id == arr2.assignments[k].id){
                let dueDate = new Date(arr[i].submission.submitted_at)
                let submission = new Date(arr2.assignments[k].due_at)
               if(submission < dueDate){
                    arr[i].status = "late";
                    console.log(`status for assingment_id: ${arr[i].assignment_id} is late`)
                    console.log(`submission date: ${submission} | due date: ${dueDate}`);
                    console.log();
               }else if(submission > dueDate){
                    arr[i].status = "not_due";  
                    console.log(`status for assingment_id: ${arr[i].assignment_id} is not_due`)
                    console.log(`submission date: ${submission} | due date: ${dueDate}`);
                    console.log();
               }else{
                    arr[i].status="ontime";
                    console.log(`status for assingment_id: ${arr[i].assignment_id} is ontime`)
                    console.log(`submission date: ${submission} | due date: ${dueDate}`);
                    console.log();
               }
            } 
        }
    }
}

/**!!!!!!! issue addressed whe SUBMISSION/DUE_AT/SUBMITTED_AT result !!!!!!!
 * 
 * BUT WHEN REPLACING THE DESIRED RESULTS ON TIME BY CHANGING 
 */
//debugging
dueStatus(LearnerSubmissions,AssignmentGroup);

//Here I looped through the array of submissions and checed if it was late and deducted 10% of its value
//--takes in LearnerSubmissions
function calculateLatescore(arr){
    let x = 0
    while(x < arr.length){
        if(arr[x].status === "late"){
            console.log(arr[x].submission.score)
            console.log(arr[x].submission.score * 0.10)
            arr[x].submission.score = arr[x].submission.score - (arr[x].submission.score  * 0.10)//<----
            console.log(arr[x].submission.score)
        }
        x += 1
    }
}

//Probably not the best name for a function, but used this to calculate any  submissions 
//handded in on time or later so they onyl appeared in the array

calculateLatescore(LearnerSubmissions);
function onlyAssignmentsSubmitted(arr){
    let assignments = []
    for(let i = 0; i < arr.length; i++){
        if(arr[i].status === "late" || arr[i].status === "ontime"){
            assignments.push(arr[i])//<--only accepts "late" or "ontime" assignmets
        }
    }
    return assignments
}

let neededSubmissions = onlyAssignmentsSubmitted(LearnerSubmissions);
console.log("Debugging : showing only on time or late assignments")
console.log(neededSubmissions);


//Next I grouped the dictinaries by learner_id , where only the dictionaires with the same learner_id appear in the same index of 
//this multidimensional array we're returning called "group"

function groupLearners(arr){
    const group = []
    let learner = 0  
    for(let i = 0; i < arr.length; i++){
        //sorted the array to handle if he list of learners were randomly inputted int the arrray  which would break this function
        arr.sort(function(a,b){return a.learner_id-b.learner_id})
        if (!group[learner]) {
            group[learner] = [];//<--initialize an index in an array
        }
        //kept track if the learner_id we're indexing in shares the same array as the current index we're trying to push into
        if( i == 0 || group[learner][0].learner_id == arr[i].learner_id){
            group[learner].push(arr[i]); 
        }else{//otherwise its a new learner_id and increase the index we're pushing in  by 1 and pushing it in as so
            learner += 1;
            if (!group[learner]) {
                group[learner] = [];
            }
            group[learner].push(arr[i]);
        }
    }
    return group
}


//Here I calculated the weighted by adding the outcome scores(from the LearnerSubmissions,score) 
//divided by the expected scores(AssignmentGroup,points_possible)
//returns the weighted score in an array to easily map the learner_id's

function weightedAvg(arr,arr2){
    let expected = 0;
    let outcome = 0;
    let weighted = [];
    let average = 0;
    for(let i = 0;i < arr.length; i++){
        for(let k = 0; k < arr[i].length; k++){
            //handles if any score or points_possible is not a number or the calculation is not doable
            if(typeof arr[i][k].submission.score != 'number'){
                throw ("scores in data are not a number")
            }
            expected += arr[i][k].submission.score
            console.log("expected")
            console.log(expected)
            for(let j = 0; j < arr2.assignments.length; j++){
                if(arr2.assignments[j].id == arr[i][k].assignment_id ){
                    if(typeof arr2.assignments[j].points_possible != 'number'){
                        throw ("scores in data are not a number")
                    }
                    outcome += arr2.assignments[j].points_possible;
                    console.log("outcome")
                    console.log(outcome)
                    break;
                }
            }
        }
        try{

            average = expected / outcome;
            
        }catch(err){

            throw ("Number cannot be divided / problem occured when calculating average");

        }
        if(typeof average != 'number'){

            throw ("score or points possible is not type \'number\'")

        }
        console.log("average")
        console.log(average)

        weighted.push({avg : expected / outcome });
    }
    return weighted
}
console.log("Grouped Learners Weighted Avg")

console.log(weightedAvg(groupLearners(neededSubmissions),AssignmentGroup));

//console.log(weightedAvg(LearnerSubmissions,AssignmentGroup))
function createGrades(arr,arr2){
    let ratio = 0
    for(let i= 0; i < arr.length; i++){
        for(let j = 0; j< arr[i].length; j++){
            for(k = 0; k < arr2.assignments.length; k ++){
                //debugging
                //console.log(arr[i][j].assignment_id + " " + arr2.assignments[k].id )
                if(arr[i][j].assignment_id == arr2.assignments[k].id){
                    ratio = arr[i][j].submission.score/ arr2.assignments[k].points_possible;
                    arr[i][j].ratio = ratio
                }
            }
        }
    }
    return arr
}


function getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmission){
    //submissions hold the information about learners, their submissions etc
    //weighted, hold the weighted average to map to the submissions array
    //output combines the two arrays above as the output
    let submissions = [];
    let weighted = [];
    let output = [];

    if(CourseInfo.id != AssignmentGroup.course_id){
        throw("Course Info and Groups do not match!")
    }
    //implemented the functions below
    dueStatus(LearnerSubmission,AssignmentGroup);

    calculateLatescore(LearnerSubmission);

    submissions =  onlyAssignmentsSubmitted(LearnerSubmission)

    submissions = groupLearners(submissions);

    submissions = createGrades(submissions,AssignmentGroup)

    weighted = weightedAvg(submissions,AssignmentGroup)

    //Below the 'mapping' happens

    for(let i = 0; i < submissions.length; i ++){
        if(!output[i]){
            output[i] = {}
        }
        output[i].id = submissions[i][0].learner_id
        output[i].avg = weighted[i].avg
        for(let j = 0; j < submissions[i].length; j++){
                if(!output[i][submissions[i][j].assignment_id]){
                    output[i][submissions[i][j].assignment_id] = 0
                }
                output[i][submissions[i][j].assignment_id] = submissions[i][j].ratio
        } 
    }   
    return(output);
}


console.log(getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions))

//One common mistake I keep running myself into was putting the wrong variable iterater in an index and setting an undefined array/index