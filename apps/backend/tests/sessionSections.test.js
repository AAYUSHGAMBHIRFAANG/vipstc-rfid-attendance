import request      from 'supertest';
import { prisma }   from '../src/services/prisma.js';
import { createApp } from '../src/app.js';
import bcrypt       from 'bcrypt';
import crypto       from 'crypto';

let server, teacherJwt;

beforeAll(async () => {
  const app = createApp();
  server = app.listen();

  // create a test teacher + section + subjectInstance
  const user = await prisma.user.create({
    data: {
      email: `sect${Date.now()}@test.com`,
      passwordHash: await bcrypt.hash('pass', 10),
      role: 'TEACHER'
    }
  });
  const faculty = await prisma.faculty.create({
    data: {
      userId: user.id,
      empId: 'EMP' + Date.now(),
      name: 'Sec Tester',
      phone: '000',
      rfidUid: crypto.randomBytes(6).toString('hex').toUpperCase()
    }
  });
  // Dept→Course→Semester→Section
  const section = await prisma.section.create({
    data: {
      name: 'TestSec',
      semester: {
        create: {
          number: 1,
          type: 'odd',
          course: {
            create: {
              name: 'TestCourse',
              durationYears: 3,
              degreeType: 'UG',
              department: { create: { name: 'TestDept', code: 'TD' } }
            }
          }
        }
      }
    }
  });
  const subj = await prisma.subject.create({ data: { code: 'T101', name: 'TSub' } });
  await prisma.subjectInstance.create({
    data: {
      subjectId: subj.id,
      sectionId: section.id,
      facultyId: faculty.id
    }
  });
  // login teacher
  const res = await request(server)
    .post('/api/auth/login')
    .send({ email: user.email, password: 'pass' });
  teacherJwt = res.body.access;
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close();
});

test('GET /api/session/mine/sections returns array', async () => {
  const res = await request(server)
    .get('/api/session/mine/sections')
    .set('Authorization', `Bearer ${teacherJwt}`);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body[0]).toMatchObject({
    sectionId: expect.any(Number),
    sectionName: expect.any(String),
    courseId: expect.any(Number),
    courseName: expect.any(String),
    semesterNumber: expect.any(Number),
    semesterType: expect.any(String)
  });
});
