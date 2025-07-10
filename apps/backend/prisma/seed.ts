// /**
//  * apps/backend/prisma/seed.ts
//  * -------------------------------------------------------------
//  * Manual seed for BCA (2024-25) – pulls NOTHING from a PDF.
//  * Guaranteed 1-for-1 match with University tables 6-13.
//  */
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// /* ----------  master list  ---------- */

// const subjects: { code: string; name: string }[] = [
//   { code: 'BCA101T', name: 'Programming for Problem Solving using C' },
//   { code: 'BCA103T', name: 'Fundamental of Information Technology' },
//   { code: 'BCA105T', name: 'Web Technologies' },
//   { code: 'BCA107T', name: 'Mathematical Foundation for Computer Science' },
//   { code: 'BCA101P', name: 'Programming for Problem Solving using C Lab' },
//   { code: 'BCA103P', name: 'Fundamental of Information Technology Lab' },
//   { code: 'BCA105P', name: 'Web Technologies Lab' },
//   { code: 'BCA141T', name: 'Writing Skills' },
//   { code: 'BCA191T', name: 'Understanding India' },
//   { code: 'BCA181T', name: 'Bridge Course in Mathematics' },
//   { code: 'BCA102T', name: 'Database Management System' },
//   { code: 'BCA104T', name: 'Object Oriented Programming using Java' },
//   { code: 'BCA106T', name: 'Data Structures and Algorithms' },
//   { code: 'BCA108T', name: 'Software Engineering' },
//   { code: 'BCA102P', name: 'Database Management System Lab' },
//   { code: 'BCA104P', name: 'Object Oriented Programming using Java Lab' },
//   { code: 'BCA106P', name: 'Data Structures and Algorithms Lab' },
//   { code: 'BCA108P', name: 'Software Engineering Lab' },
//   { code: 'BCA142T', name: 'Soft Skills' },
//   { code: 'BCA192T', name: 'Environment Studies' },
//   { code: 'BCA201T', name: 'Python Programming' },
//   { code: 'BCA203T', name: 'Dynamic Web Designing' },
//   { code: 'BCA205T', name: 'Computer Organization and Architecture' },
//   { code: 'BCA207T', name: 'Discrete Mathematics' },
//   { code: 'BCA201P', name: 'Python Programming Lab' },
//   { code: 'BCA203P', name: 'Dynamic Web Designing Lab' },
//   { code: 'BCA205P', name: 'Computer Organization and Architecture Lab' },
//   { code: 'BCA261',  name: 'Vocational Course (I)' },
//   { code: 'BCA221T', name: 'Principles of Management & Organizational Behavior' },
//   { code: 'BCA223T', name: 'Open Elective (GE-1)' },
//   { code: 'BCA291T', name: 'Human Values and Ethics' },
//   { code: 'BCA202T', name: 'Operating Systems' },
//   { code: 'BCA204T', name: 'Software Testing' },
//   { code: 'BCA202P', name: 'Operating Systems Lab' },
//   { code: 'BCA204P', name: 'Software Testing Lab' },
//   { code: 'BCA232',  name: 'Introduction to Logic & Critical Thinking' },
//   { code: 'BCA234',  name: 'Health & Wellness, Yoga Education and Sports & Fitness' },
//   { code: 'BCA212T', name: 'Introduction to Data Science' },
//   { code: 'BCA212P', name: 'Data Science Lab' },
//   { code: 'BCA216T', name: 'Introduction to Security, Acts & Cyber Laws and Cyber Security' },
//   { code: 'BCA216P', name: 'Cyber Security Lab' },
//   { code: 'BCA218T', name: 'Web Development using Python' },
//   { code: 'BCA218P', name: 'Web Development using Python Lab' },
//   { code: 'BCA220T', name: 'Information Security' },
//   { code: 'BCA220P', name: 'Information Security Lab' },
//   { code: 'BCA222T', name: 'Digital Marketing' },
//   { code: 'BCA224T', name: 'Principles of Accounting' },
//   { code: 'BCA226T', name: 'Open Elective (GE-2)' },
//   { code: 'BCA301T', name: 'Computer Networks' },
//   { code: 'BCA303T', name: 'Artificial Intelligence' },
//   { code: 'BCA301P', name: 'Computer Networks Lab' },
//   { code: 'BCA303P', name: 'Artificial Intelligence Lab' },
//   { code: 'BCA305T', name: 'Natural Language Processing' },
//   { code: 'BCA305P', name: 'Natural Language Processing Lab' },
//   { code: 'BCA307T', name: 'Network Security' },
//   { code: 'BCA307P', name: 'Network Security Lab' },
//   { code: 'BCA309T', name: 'Full Stack Development using Java' },
//   { code: 'BCA309P', name: 'Full Stack Development using Java Lab' },
//   { code: 'BCA311',  name: 'Summer Training (Industrial)' },
//   { code: 'BCA313T', name: 'Introduction to Management & Entrepreneurship Development' },
//   { code: 'BCA315T', name: 'MOOC Course' },
//   { code: 'BCA302T', name: 'Distributed Systems and Cloud Computing' },
//   { code: 'BCA304T', name: 'Machine Learning' },
//   { code: 'BCA306T', name: 'Software Project Management' },
//   { code: 'BCA302P', name: 'Distributed Systems and Cloud Computing Lab' },
//   { code: 'BCA306P', name: 'Software Project Management Lab' },
//   { code: 'BCA312T', name: 'Data Visualization & Analytics' },
//   { code: 'BCA312P', name: 'Data Visualization & Analytics Lab' },
//   { code: 'BCA314T', name: 'Deep Learning with Python' },
//   { code: 'BCA314P', name: 'Deep Learning with Python Lab' },
//   { code: 'BCA316T', name: 'Web Security' },
//   { code: 'BCA316P', name: 'Web Security Lab' },
//   { code: 'BCA318T', name: 'Mobile Application Development' },
//   { code: 'BCA318P', name: 'Mobile Application Development Lab' },
//   { code: 'BCA320',  name: 'Minor Project' },
//   { code: 'BCA304P', name: 'Machine Learning Lab' },
//   { code: 'BCA374',  name: 'NSS / NCC / Cultural / Technical Activities' },
//   { code: 'BCA401T', name: 'E-Commerce' },
//   { code: 'BCA401P', name: 'E-Commerce Lab' },
//   { code: 'BCA403T', name: 'Internet of Things (IoT)' },
//   { code: 'BCA403P', name: 'Internet of Things Lab' },
//   { code: 'BCA405',  name: 'Major Project 1' },
//   { code: 'BCA461',  name: 'Vocational Course (II)' },
//   { code: 'BCA402',  name: 'Major Project 2' },
//   { code: 'BCA404',  name: 'Industry Internship Report' }
// ];

// /* ----------  seed runner -------------- */

// async function main() {
//   // wipe old rows and reset identity
//   await prisma.$executeRawUnsafe('TRUNCATE TABLE "Subject" RESTART IDENTITY CASCADE');

//   // insert all subjects in one go
//   await prisma.subject.createMany({ data: subjects });

//   console.log(`✅ Seeded ${subjects.length} subjects for BCA`);
// }

// main()
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   })
//   .finally(() => prisma.$disconnect());
