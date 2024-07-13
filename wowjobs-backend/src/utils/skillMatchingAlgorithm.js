// // utils/skillMatchingAlgorithm.js
//
// /**
//  * Calculate the matching score between job skills and candidate skills.
//  * @param {Array<string>} jobSkills - The skills required for the job.
//  * @param {Array<string>} candidateSkills - The skills that the candidate has.
//  * @returns {number} The matching score.
//  */
// function calculateSkillMatchingScore(jobSkills, candidateSkills) {
//     let score = 0;
//
//     // Convert all skills to lowercase for case-insensitive comparison
//     const lowerCaseJobSkills = jobSkills.map(skill => skill.toLowerCase());
//     const lowerCaseCandidateSkills = candidateSkills.map(skill => skill.toLowerCase());
//
//     // Increment the score for each skill the candidate has that the job requires
//     for (const skill of lowerCaseCandidateSkills) {
//         if (lowerCaseJobSkills.includes(skill)) {
//             score++;
//         }
//     }
//
//     // Return the score as a percentage of the total number of job skills
//     return (score / jobSkills.length) * 100;
// }
//
// module.exports = calculateSkillMatchingScore;
