import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsFromStudent(student.id);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentService.listAllStudents();
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => Student)
  me(@CurrentUser() user: AuthUser) {
    return this.studentService.getStudentByAuthUserId(user.sub);
  }
}
