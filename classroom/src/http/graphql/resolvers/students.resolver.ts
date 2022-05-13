import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
// import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsFromStudent(student.id);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  // @UseGuards(AuthorizationGuard)
  // @Query(() => Student)
  // me(@CurrentUser() user: AuthUser) {
  //   return this.studentService.getStudentByAuthUserId(user.sub);
  // }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.studentsService.getStudentByAuthUserId(reference.authUserId);
  }
}
