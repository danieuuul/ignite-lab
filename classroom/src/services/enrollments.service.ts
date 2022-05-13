import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface GetEnrollmentFromStudentAndCourseParams {
  courseId: string;
  studentId: string;
}

interface CreateEnrollmentInterfaceParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  createEnrollment({ courseId, studentId }: CreateEnrollmentInterfaceParams) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listEnrollmentsFromStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getEnrollmentFromStudentAndCourse({
    courseId,
    studentId,
  }: GetEnrollmentFromStudentAndCourseParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        studentId,
        courseId,
        canceledAt: null,
      },
    });
  }
}
